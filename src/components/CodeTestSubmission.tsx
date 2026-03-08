import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTestCodeSubmissionMutation } from '../features/course-practice/api/practiceApi';

interface CodeTestSubmissionProps {
  questionId: number;
  sourceCode: string;
  languageId: number;
  onSubmit?: (result: any) => void;
}

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
      if (onSubmit) {
        onSubmit(result);
      }
    } catch (err: any) {
      console.error('Test submission error:', err);
      setTestResult({
        success: false,
        message: err?.data?.message || err?.message || 'Failed to submit code',
      });
    }
  };

  const renderTestResults = () => {
    if (!testResult) return null;

    if (!testResult.success) {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          {testResult.message || 'Test submission failed'}
        </Alert>
      );
    }

    const data = testResult.data;
    if (!data) {
      return (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No test results data available
        </Alert>
      );
    }

    const { passed, failed, total, testCases } = data;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : '0';

    return (
      <Box sx={{ mt: 3 }}>
        {/* Summary */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: failed === 0 ? '#e8f5e9' : '#fff3e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Test Results Summary
            </Typography>
            <Chip
              label={`${passRate}% Passed`}
              color={failed === 0 ? 'success' : 'warning'}
              sx={{ fontWeight: 600 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Test Cases
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {total}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Passed
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: 'success.main' }}
              >
                {passed}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Failed
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: 'error.main' }}
              >
                {failed}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Test Cases Details */}
        {testCases && testCases.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Test Case Details
            </Typography>

            {testCases.map((testCase: any, index: number) => (
              <Accordion
                key={testCase.testCaseId || index}
                sx={{
                  mb: 1,
                  '&:before': {
                    display: 'none',
                  },
                  border: `1px solid ${testCase.passed ? '#4caf50' : '#f44336'
                    }`,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: testCase.passed
                      ? '#e8f5e9'
                      : '#ffebee',
                    '&:hover': {
                      backgroundColor: testCase.passed
                        ? '#c8e6c9'
                        : '#ffcdd2',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      width: '100%',
                    }}
                  >
                    {testCase.passed ? (
                      <CheckCircleIcon sx={{ color: 'success.main' }} />
                    ) : (
                      <CancelIcon sx={{ color: 'error.main' }} />
                    )}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, flex: 1 }}
                    >
                      Test Case {index + 1}
                    </Typography>
                    <Chip
                      label={testCase.passed ? 'PASSED' : 'FAILED'}
                      color={testCase.passed ? 'success' : 'error'}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    {testCase.executionTime && (
                      <Typography variant="caption" color="text.secondary">
                        {testCase.executionTime}ms
                      </Typography>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Input */}
                    {testCase.input !== undefined && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Input:
                        </Typography>
                        <Paper
                          sx={{
                            p: 2,
                            backgroundColor: '#f5f5f5',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {typeof testCase.input === 'object'
                            ? JSON.stringify(testCase.input, null, 2)
                            : String(testCase.input)}
                        </Paper>
                      </Box>
                    )}

                    {/* Expected Output */}
                    {testCase.expectedOutput !== undefined && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Expected Output:
                        </Typography>
                        <Paper
                          sx={{
                            p: 2,
                            backgroundColor: '#e3f2fd',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {String(testCase.expectedOutput)}
                        </Paper>
                      </Box>
                    )}

                    {/* Actual Output */}
                    {testCase.actualOutput !== undefined && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Actual Output:
                        </Typography>
                        <Paper
                          sx={{
                            p: 2,
                            backgroundColor: testCase.passed
                              ? '#e8f5e9'
                              : '#ffebee',
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {String(testCase.actualOutput)}
                        </Paper>
                      </Box>
                    )}

                    {/* Error Message */}
                    {testCase.error && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1, color: 'error.main' }}
                        >
                          Error:
                        </Typography>
                        <Alert severity="error" sx={{ fontFamily: 'monospace' }}>
                          {testCase.error}
                        </Alert>
                      </Box>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* Failed Test Cases Summary */}
        {failed > 0 && (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mt: 3,
              backgroundColor: '#fff3e0',
              borderLeft: '4px solid #ff9800',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Failed Test Cases Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {failed} out of {total} test cases failed. Please review the
              details above and fix your code.
            </Typography>
          </Paper>
        )}

        {/* All Passed Message */}
        {failed === 0 && total > 0 && (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mt: 3,
              backgroundColor: '#e8f5e9',
              borderLeft: '4px solid #4caf50',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ color: 'success.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                All test cases passed! 🎉
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading || !sourceCode.trim()}
        sx={{
          mb: 2,
          textTransform: 'none',
          minWidth: 150,
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Testing...
          </>
        ) : (
          'Test All Cases'
        )}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {('data' in error && (error.data as any)?.message) ||
            ('message' in error && (error as any).message) ||
            'An error occurred while submitting the code'}
        </Alert>
      )}

      {renderTestResults()}
    </Box>
  );
};

export default CodeTestSubmission;

