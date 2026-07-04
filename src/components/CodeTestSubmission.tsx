import React, { useState } from "react";
import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useTestCodeSubmissionMutation } from "../features/course-practice/api/practiceApi";

interface CodeTestSubmissionProps {
  questionId: number;
  sourceCode: string;
  languageId: number;
  onSubmit?: (result: any) => void;
}

const darkAlertSx = {
  color: "#fecaca",
  backgroundColor: "rgba(239,68,68,0.10)",
  border: "1px solid rgba(239,68,68,0.28)",
  "& .MuiAlert-icon": { color: "#f87171" },
};

const outputBlockSx = {
  p: 1.5,
  backgroundColor: "#0f0f12",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  color: "#e4e4e7",
  fontFamily: "Consolas, 'Courier New', monospace",
  fontSize: "0.85rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const CodeBlock = ({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "success" | "error" | "info";
}) => {
  const toneStyles = {
    default: { color: "#e4e4e7", border: "1px solid rgba(255,255,255,0.08)", bg: "#0f0f12" },
    success: { color: "#86efac", border: "1px solid rgba(34,197,94,0.28)", bg: "rgba(34,197,94,0.08)" },
    error: { color: "#fca5a5", border: "1px solid rgba(239,68,68,0.28)", bg: "rgba(239,68,68,0.08)" },
    info: { color: "#c7d2fe", border: "1px solid rgba(99,102,241,0.28)", bg: "rgba(99,102,241,0.08)" },
  }[tone];

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ color: "#ffffff !important", fontWeight: 800, mb: 0.75 }}>
        {title}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          ...outputBlockSx,
          color: toneStyles.color,
          border: toneStyles.border,
          backgroundColor: toneStyles.bg,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

const CodeTestSubmission: React.FC<CodeTestSubmissionProps> = ({
  questionId,
  sourceCode,
  languageId,
  onSubmit,
}) => {
  const [testCode, { isLoading, error }] = useTestCodeSubmissionMutation();
  const [testResult, setTestResult] = useState<any>(null);

  const handleSubmit = async () => {
    try {
      const result = await testCode({
        questionId,
        sourceCode,
        languageId,
      }).unwrap();

      setTestResult(result);
      onSubmit?.(result);
    } catch (err: any) {
      console.error("Test submission error:", err);
      setTestResult({
        success: false,
        message: err?.data?.message || err?.message || "Failed to submit code",
      });
    }
  };

  const renderTestResults = () => {
    if (!testResult) return null;

    if (!testResult.success) {
      return (
        <Alert severity="error" sx={{ mt: 2, ...darkAlertSx }}>
          {testResult.message || "Test submission failed"}
        </Alert>
      );
    }

    const data = testResult.data;
    if (!data) {
      return (
        <Alert
          severity="warning"
          sx={{
            mt: 2,
            color: "#fde68a",
            backgroundColor: "rgba(245,158,11,0.10)",
            border: "1px solid rgba(245,158,11,0.24)",
            "& .MuiAlert-icon": { color: "#fbbf24" },
          }}
        >
          No test results data available
        </Alert>
      );
    }

    const { passed = 0, failed = 0, total = 0, testCases = [] } = data;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0";
    const allPassed = failed === 0 && total > 0;

    return (
    <Box
      sx={{
        mt: 2.5,
        color: "#fff",
        "& .MuiTypography-root": {
          color: "inherit",
        },
      }}
    >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            mb: 2.5,
            backgroundColor: allPassed ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${allPassed ? "rgba(34,197,94,0.28)" : "rgba(239,68,68,0.24)"}`,
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, minmax(0, 1fr))" },
              gap: 1.25,
            }}
          >
            {[
              ["Total", total, "#fff"],
              ["Passed", passed, "#4ade80"],
              ["Failed", failed, "#f87171"],
              ["Pass Rate", `${passRate}%`, allPassed ? "#4ade80" : "#fbbf24"],
            ].map(([label, value, color]) => (
              <Box key={label} sx={{ p: 1.25, borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)" }}>
                <Typography variant="body2" sx={{ color: "#ffffff !important", opacity: 0.78, fontWeight: 800 }}>
                  {label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: `${color} !important`, lineHeight: 1.2 }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {testCases.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 900, color: "#ffffff !important", fontSize: "1rem" }}>
              Test Case Details
            </Typography>

            {testCases.map((testCase: any, index: number) => {
              const passedCase = !!testCase.passed;
              return (
                <Accordion
                  key={testCase.testCaseId || index}
                  disableGutters
                  sx={{
                    mb: 1,
                    overflow: "hidden",
                    backgroundColor: "#18181b",
                    color: "#e4e4e7",
                    borderRadius: "10px",
                    border: `1px solid ${passedCase ? "rgba(34,197,94,0.34)" : "rgba(239,68,68,0.34)"}`,
                    boxShadow: "none",
                    "&:before": { display: "none" },
                    "& .MuiTypography-root": { color: "#fff" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: passedCase ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.10)",
                      "&:hover": {
                        backgroundColor: passedCase ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.14)",
                      },
                      "& .MuiAccordionSummary-expandIconWrapper": { color: "#a1a1aa" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, width: "100%", minWidth: 0 }}>
                      {passedCase ? (
                        <CheckCircleIcon sx={{ color: "#22c55e", flexShrink: 0 }} />
                      ) : (
                        <CancelIcon sx={{ color: "#ef4444", flexShrink: 0 }} />
                      )}
                      <Typography sx={{ fontWeight: 900, flex: 1, color: "#ffffff !important", minWidth: 0 }}>
                        Test Case {index + 1}
                      </Typography>
                      <Chip
                        label={passedCase ? "PASSED" : "FAILED"}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          color: "#fff",
                          borderRadius: "7px",
                          backgroundColor: passedCase ? "#16a34a" : "#dc2626",
                        }}
                      />
                      {testCase.executionTime && (
                        <Typography variant="caption" sx={{ color: "#ffffff !important", opacity: 0.72, flexShrink: 0, fontWeight: 700 }}>
                          {testCase.executionTime}ms
                        </Typography>
                      )}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: "#151519", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {testCase.input !== undefined && (
                        <CodeBlock title="Stdin">
                          {typeof testCase.input === "object"
                            ? JSON.stringify(testCase.input, null, 2)
                            : String(testCase.input)}
                        </CodeBlock>
                      )}

                      {testCase.expectedOutput !== undefined && (
                        <CodeBlock title="Expected Output" tone="info">
                          {String(testCase.expectedOutput)}
                        </CodeBlock>
                      )}

                      {testCase.actualOutput !== undefined && (
                        <CodeBlock title="Actual Output" tone={passedCase ? "success" : "error"}>
                          {String(testCase.actualOutput)}
                        </CodeBlock>
                      )}

                      {testCase.error && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.75, color: "#fca5a5 !important" }}>
                            Error
                          </Typography>
                          <Alert severity="error" sx={{ fontFamily: "monospace", ...darkAlertSx }}>
                            {testCase.error}
                          </Alert>
                        </Box>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 2.5,
            backgroundColor: allPassed ? "rgba(34,197,94,0.10)" : "rgba(245,158,11,0.10)",
            border: `1px solid ${allPassed ? "rgba(34,197,94,0.28)" : "rgba(245,158,11,0.28)"}`,
            borderLeft: `4px solid ${allPassed ? "#22c55e" : "#f59e0b"}`,
            borderRadius: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {allPassed ? (
              <CheckCircleIcon sx={{ color: "#22c55e" }} />
            ) : (
              <CancelIcon sx={{ color: "#f59e0b" }} />
            )}
            <Typography sx={{ fontWeight: 900, color: "#ffffff !important" }}>
              {allPassed
                ? "All test cases passed!"
                : `${failed} out of ${total} test cases failed. Review the details above.`}
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        color: "#fff",
        "& .MuiTypography-root": {
          color: "inherit",
        },
      }}
    >
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading || !sourceCode.trim()}
        startIcon={!isLoading ? <PlayArrowIcon /> : undefined}
        sx={{
          mb: 2,
          textTransform: "none",
          minWidth: { xs: "100%", sm: 170 },
          minHeight: 40,
          borderRadius: "10px",
          fontWeight: 900,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: "#fff" }} />
            Testing...
          </>
        ) : (
          "Test All Cases"
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2, ...darkAlertSx }}>
          {("data" in error && (error.data as any)?.message) ||
            ("message" in error && (error as any).message) ||
            "An error occurred while submitting the code"}
        </Alert>
      )}

      {renderTestResults()}
    </Box>
  );
};

export default CodeTestSubmission;
