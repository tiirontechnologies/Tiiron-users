import React, { useRef, useState, useEffect, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import Editor from "@monaco-editor/react";
import { EditorToolbar } from "./EditorToolbar";
import { CustomTestCasesPanel } from "./CustomTestCasesPanel";
import type { TestCaseResult } from "./CustomTestCasesPanel";
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
    input: tc.input, // Now a string (stdin)
    expectedOutput: tc.expectedOutput ?? ""
  }));
}

/**
 * Normalize the backend response into TestCaseResult[].
 * Adjust this if your API response shape differs.
 */
function normalizeRunResults(data: any): TestCaseResult[] | null {
  if (!data) return null;

  // If the response has a `results` array
  const results = data.results ?? data.data?.results ?? data.testResults ?? data.data ?? [];

  if (Array.isArray(results)) {
    return results.map((r: any) => ({
      input: r.input ?? r.testCase?.input ?? undefined,
      expectedOutput: r.expectedOutput ?? r.expected ?? r.testCase?.expectedOutput ?? undefined,
      actualOutput: r.actualOutput ?? r.output ?? r.actual ?? r.stdout ?? undefined,
      passed: r.passed ?? r.isCorrect ?? r.correct ?? r.status === "accepted",
      error: r.error ?? r.stderr ?? r.errorMessage ?? undefined,
      description: r.description ?? r.testCase?.description ?? undefined,
    }));
  }

  return null;
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

  const [codeRun, { data: runData, isLoading: isRunning }] = useCodeRunMutation();
  const { testCasePanelHeight, handleSplitResizeStart } = useSplitPanelResize();

  const [showTestResults, setShowTestResults] = useState(false);
  const [testResults, setTestResults] = useState<unknown>(null);
  const [customTestCases, setCustomTestCases] = useState<any[]>([]);
  const codeEditorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let apiTestCases = question?.code?.testCases ?? [];
    if (typeof apiTestCases === "string") {
      try {
        apiTestCases = JSON.parse(apiTestCases);
      } catch (e) {
        console.error("Failed to parse testCases:", e);
        apiTestCases = [];
      }
    }
    setCustomTestCases(mapApiTestCasesToCustom(apiTestCases as ApiCodeTestCase[]));
  }, [question?.id]);

  const normalizedResults = useMemo(
    () => normalizeRunResults(runData),
    [runData]
  );

  const handleRun = () => {
    if (!question?.id) return;
    codeRun({ questionId: question.id, code, testcases: customTestCases, languageId: getLanguageId() });
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
        borderRadius: "6px",
        border: "1px solid #27272a",
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
          runResults={normalizedResults}
          isRunning={isRunning}
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
