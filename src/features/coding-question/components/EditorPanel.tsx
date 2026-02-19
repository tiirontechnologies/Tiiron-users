import React, { useRef, useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import Editor from "@monaco-editor/react";
import { EditorToolbar } from "./EditorToolbar";
import { CustomTestCasesPanel } from "./CustomTestCasesPanel";
import { TestResultsModal } from "./TestResultsModal";
import { PAGE } from "../constants";
import { useQuestionData } from "../hooks/useQuestionData";
import { useCodeAndLanguage } from "../hooks/useCodeAndLanguage";
import { useSplitPanelResize } from "../hooks/useSplitPanelResize";
import { useCodeRunMutation } from "../../course-practice/api/practiceApi";
import type { ApiCodeTestCase } from "../types";

function mapApiTestCasesToCustom(apiTestCases: ApiCodeTestCase[]): any[] {
  return apiTestCases.map((tc, index) => ({
    id: `tc-${index}-${tc.description ?? "test"}`,
    input: tc.input,
    expectedOutput: tc.expectedOutput ?? ""
  }));
}

interface EditorPanelProps { }

export const EditorPanel: React.FC<EditorPanelProps> = () => {
  const { question, isLoadingQuestion } = useQuestionData();
  const {
    availableLanguages,
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    getLanguageId,
  } = useCodeAndLanguage({ question });

  const [codeRun, { data: runData }] = useCodeRunMutation();
  const { testCasePanelHeight, handleSplitResizeStart } = useSplitPanelResize();

  const [showTestResults, setShowTestResults] = useState(false);
  const [testResults, setTestResults] = useState<unknown>(null);
  const [customTestCases, setCustomTestCases] = useState<any[]>([]);
  const codeEditorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiTestCases = question?.code?.testCases ?? [];
    setCustomTestCases(mapApiTestCasesToCustom(apiTestCases));
  }, [question?.id]);

  // useEffect(() => {
  //   codeRun({ code, testcases: customTestCases });
  //   if (code && customTestCases.length > 0) {
  //   }
  // }, [customTestCases, code]);

  const handleRun = () => {
    if (!question?.id) return;
    codeRun({ questionId: question.id, code, testcases: customTestCases });
  };

  const handleSubmit = () => {
    setShowTestResults(true);
  };

  const handleCloseTestResults = () => {
    setShowTestResults(false);
    setTestResults(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: PAGE.radiusLg,
        overflow: "hidden",
        minHeight: 0,
        position: "relative",
      }}
    >
      <Box
        ref={codeEditorContainerRef}
        sx={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          position: "relative",
        }}
      >
        <EditorToolbar
          availableLanguages={availableLanguages}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isLoadingLanguages={isLoadingQuestion}
        />

        <Box sx={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
          <Editor
            height="100%"
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </Box>

        <CustomTestCasesPanel
          testCases={customTestCases}
          onTestCasesChange={setCustomTestCases}
          height={testCasePanelHeight}
          onResizeStart={handleSplitResizeStart}
        />
      </Box>

      {showTestResults && question && (
        <TestResultsModal
          question={question}
          code={code}
          languageId={getLanguageId()}
          onClose={handleCloseTestResults}
          onSubmit={setTestResults}
        />
      )}
    </Paper>
  );
};
