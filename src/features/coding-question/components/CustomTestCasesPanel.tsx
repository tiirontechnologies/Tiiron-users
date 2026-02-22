import React, { useEffect, useMemo, useState, memo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { CustomTestCase } from "../types";
import { CustomTextField } from "@components/ui";

const TAB_HEIGHT = 40;

const styles = {
  root: (height: number) => ({
    height,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#18181b !important",
    borderBottom: "1px solid #27272a",
  }),

  tabs: {
    minHeight: TAB_HEIGHT,
    borderBottom: "1px solid #27272a",
    backgroundColor: "#0f0f12 !important",
  },

  subTabs: {
    minHeight: TAB_HEIGHT,
    backgroundColor: "#0f0f12 !important",
    borderBottom: "1px solid #27272a",
  },

  editor: {
    border: "1px solid #27272a",
    backgroundColor: "#0f0f12",
    flex: 1,
    overflow: "auto",
  },

  editorHeader: {
    px: 1,
    py: 0.5,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #27272a",
  },

  resizeHandle: {
    height: 6,
    cursor: "row-resize",
    backgroundColor: "#27272a",
  },
};

const generateId = () => crypto.randomUUID();

/* =====================================================
   TYPES
===================================================== */

export interface TestCaseResult {
  input?: any;
  expectedOutput?: string;
  actualOutput?: string;
  passed?: boolean;
  error?: string;
  description?: string;
}

interface Props {
  testCases: CustomTestCase[];
  onTestCasesChange: (t: CustomTestCase[]) => void;
  height: number;
  onResizeStart: (e: React.MouseEvent) => void;
  runResults?: TestCaseResult[] | null;
  isRunning?: boolean;
}

/* =====================================================
   TEST CASE EDITOR (Memoized)
===================================================== */

interface EditorProps {
  testCase: CustomTestCase | null;
  onChange: (
    id: string,
    value: string,
    key: string
  ) => void;
  onDelete: (id: string) => void;
}

const TestCaseEditor = memo(
  ({ testCase, onChange, onDelete }: EditorProps) => {
    if (!testCase) {
      return (
        <Typography sx={{ color: "#71717a", p: 2 }}>
          Select a testcase
        </Typography>
      );
    }

    const inputObject = testCase.input?.input ?? {};

    return (
      <Box sx={styles.editor}>
        <Box sx={styles.editorHeader}>
          <Typography variant="caption">Testcase</Typography>
          <IconButton
            size="small"
            onClick={() => onDelete(testCase.id)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.entries(inputObject).map(([key, val]) => {
            const displayValue =
              typeof val === "object"
                ? JSON.stringify(val)
                : String(val ?? "");

            return (
              <CustomTextField
                key={key}
                label={key}
                value={displayValue}
                inputSx={{
                  color: "white !important",
                  backgroundColor: "#0f0f12 !important"
                }}
                onChange={(e) =>
                  onChange(
                    testCase.id,
                    e.target.value,
                    key
                  )
                }
              />
            );
          })}
        </Box>
      </Box>
    );
  }
);

/* =====================================================
   SINGLE RESULT CARD
===================================================== */

const ResultCard = ({ result, index }: { result: TestCaseResult; index: number }) => {
  const passed = result.passed === true;
  const hasError = !!result.error;

  const borderColor = hasError
    ? "#ef4444"
    : passed
      ? "#22c55e"
      : "#ef4444";

  const bgColor = hasError
    ? "rgba(239, 68, 68, 0.06)"
    : passed
      ? "rgba(34, 197, 94, 0.06)"
      : "rgba(239, 68, 68, 0.06)";

  return (
    <Box
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${borderColor}`,
          backgroundColor: hasError
            ? "rgba(239, 68, 68, 0.1)"
            : passed
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(239, 68, 68, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {hasError ? (
            <CancelIcon sx={{ color: "#ef4444", fontSize: 20 }} />
          ) : passed ? (
            <CheckCircleIcon sx={{ color: "#22c55e", fontSize: 20 }} />
          ) : (
            <CancelIcon sx={{ color: "#ef4444", fontSize: 20 }} />
          )}
          <Typography
            variant="subtitle2"
            sx={{ color: "#e4e4e7", fontWeight: 600 }}
          >
            Test Case {index + 1}
          </Typography>
        </Box>

        <Chip
          label={hasError ? "Error" : passed ? "Accepted" : "Wrong Answer"}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "0.7rem",
            color: "#fff",
            backgroundColor: hasError
              ? "#ef4444"
              : passed
                ? "#22c55e"
                : "#ef4444",
          }}
        />
      </Box>

      {/* Body */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* Input */}
        {result.input && (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#a1a1aa", fontWeight: 600, mb: 0.5, display: "block" }}
            >
              Input
            </Typography>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "6px",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#e4e4e7",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {typeof result.input === "object"
                ? JSON.stringify(result.input, null, 2)
                : String(result.input)}
            </Box>
          </Box>
        )}

        {/* Expected Output */}
        {result.expectedOutput !== undefined && (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#a1a1aa", fontWeight: 600, mb: 0.5, display: "block" }}
            >
              Expected Output
            </Typography>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "6px",
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#e4e4e7",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {String(result.expectedOutput)}
            </Box>
          </Box>
        )}

        {/* Actual Output */}
        {result.actualOutput !== undefined && (
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: passed ? "#4ade80" : "#f87171",
                fontWeight: 600,
                mb: 0.5,
                display: "block",
              }}
            >
              Your Output
            </Typography>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "6px",
                backgroundColor: "#18181b",
                border: `1px solid ${passed ? "#22c55e44" : "#ef444444"}`,
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: passed ? "#4ade80" : "#f87171",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {String(result.actualOutput)}
            </Box>
          </Box>
        )}

        {/* Error */}
        {hasError && (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#f87171", fontWeight: 600, mb: 0.5, display: "block" }}
            >
              Error
            </Typography>
            <Box
              sx={{
                p: 1.5,
                borderRadius: "6px",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                border: "1px solid #ef444444",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#f87171",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {result.error}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/* =====================================================
   RESULT VIEW
===================================================== */

const ResultView = ({
  results,
  isRunning,
}: {
  results?: TestCaseResult[] | null;
  isRunning?: boolean;
}) => {
  if (isRunning) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 3,
        }}
      >
        <CircularProgress size={28} sx={{ color: "#a78bfa" }} />
        <Typography sx={{ color: "#a1a1aa", fontSize: "0.85rem" }}>
          Running test cases...
        </Typography>
      </Box>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography sx={{ color: "#71717a" }}>
          Click Run to see results
        </Typography>
      </Box>
    );
  }

  const totalPassed = results.filter(r => r.passed).length;
  const allPassed = totalPassed === results.length;

  return (
    <Box sx={{ flex: 1, overflow: "auto" }}>
      {/* Summary Bar */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #27272a",
          backgroundColor: allPassed
            ? "rgba(34, 197, 94, 0.08)"
            : "rgba(239, 68, 68, 0.08)",
        }}
      >
        {allPassed ? (
          <CheckCircleIcon sx={{ color: "#22c55e", fontSize: 22 }} />
        ) : (
          <CancelIcon sx={{ color: "#ef4444", fontSize: 22 }} />
        )}
        <Typography
          sx={{
            color: allPassed ? "#4ade80" : "#f87171",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          {allPassed
            ? "All test cases passed!"
            : `${totalPassed} / ${results.length} test cases passed`}
        </Typography>
      </Box>

      {/* Individual Results */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {results.map((result, i) => (
          <ResultCard key={i} result={result} index={i} />
        ))}
      </Box>
    </Box>
  );
};

/* =====================================================
   MAIN PANEL
===================================================== */

export const CustomTestCasesPanel: React.FC<Props> = ({
  testCases,
  onTestCasesChange,
  height,
  onResizeStart,
  runResults,
  isRunning,
}) => {
  const [tab, setTab] = useState<"testcase" | "result">("testcase");
  const [activeId, setActiveId] = useState<string | null>(
    testCases[0]?.id ?? null
  );

  /* ---------- Sync Active TestCase ---------- */

  useEffect(() => {
    if (!testCases.length) {
      setActiveId(null);
      return;
    }

    if (!activeId || !testCases.some(t => t.id === activeId)) {
      setActiveId(testCases[0].id);
    }
  }, [testCases, activeId]);

  /* ---------- Auto-switch to Result tab when results arrive ---------- */

  useEffect(() => {
    if (isRunning) {
      setTab("result");
    }
  }, [isRunning]);

  useEffect(() => {
    if (runResults && runResults.length > 0) {
      setTab("result");
    }
  }, [runResults]);

  const activeTestCase = useMemo(
    () => testCases.find(t => t.id === activeId) ?? null,
    [testCases, activeId]
  );

  /* ---------- Actions ---------- */

  const addTestCase = () => {
    const id = generateId();

    const template =
      testCases.length > 0
        ? testCases[0].input?.input ?? {}
        : {};

    const newInput = Object.keys(template).reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, string>
    );

    const newTestCase: CustomTestCase = {
      id,
      input: { input: newInput },
    };

    onTestCasesChange([...testCases, newTestCase]);
    setActiveId(id);
  };

  const removeTestCase = (id: string) => {
    if (!window.confirm("Delete this testcase?")) return;

    const updated = testCases.filter(t => t.id !== id);
    onTestCasesChange(updated);
  };

  const updateTestCase = (
    id: string,
    value: string,
    key: string
  ) => {
    const updated = testCases.map(tc => {
      if (tc.id !== id) return tc;

      return {
        ...tc,
        input: {
          ...(tc.input ?? {}),
          input: {
            ...(tc.input?.input ?? {}),
            [key]: value,
          },
        },
      };
    });

    onTestCasesChange(updated);
  };

  /* ===================================================== */

  return (
    <Box sx={styles.root(height)}>
      {/* Resize Handle */}
      <Box
        sx={styles.resizeHandle}
        onMouseDown={onResizeStart}
      />

      {/* Top Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={styles.tabs}
      >
        <Tab value="testcase" label="Testcase" />
        <Tab
          value="result"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              Result
              {isRunning && (
                <CircularProgress size={14} sx={{ color: "#a78bfa" }} />
              )}
            </Box>
          }
        />
      </Tabs>

      {tab === "testcase" && (
        <>
          {/* TestCase Tabs */}
          <Tabs
            value={activeId ?? false}
            onChange={(_, v) => setActiveId(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={styles.subTabs}
          >
            {testCases.map((tc, i) => (
              <Tab
                key={tc.id}
                value={tc.id}
                label={`TC ${i + 1}`}
              />
            ))}

            <Tab
              icon={<AddIcon />}
              onClick={(e) => {
                e.stopPropagation();
                addTestCase();
              }}
            />
          </Tabs>

          <TestCaseEditor
            testCase={activeTestCase}
            onChange={updateTestCase}
            onDelete={removeTestCase}
          />
        </>
      )}

      {tab === "result" && (
        <ResultView results={runResults} isRunning={isRunning} />
      )}
    </Box>
  );
};
