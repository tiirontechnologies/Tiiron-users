import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Paper, Divider, Chip, TextField, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { COLORS, SHADOWS } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/Minimize";

const CodeEditorPage: React.FC = () => {
  const { questionId, courseId } = useParams<{ questionId: string; courseId: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>(`// Write your solution here
function solve() {
    // Your code goes here
    return;
}`);
  
  // Custom test case panel state
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(true);
  const [testPanelPosition, setTestPanelPosition] = useState({ x: 0, y: window.innerHeight - 300 });
  const [testPanelSize, setTestPanelSize] = useState({ width: window.innerWidth, height: 300 });
  const [customInput, setCustomInput] = useState<string>("");
  const [customOutput, setCustomOutput] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const codeEditorContainerRef = useRef<HTMLDivElement>(null);

  // Hardcoded problem data for now
  const problemData = {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#27AE60";
      case "medium":
        return "#F39C12";
      case "hard":
        return "#E74C3C";
      default:
        return COLORS.text.muted;
    }
  };

  const handleRun = () => {
    console.log("Running code:", code);
    // TODO: Implement code execution
  };

  const handleSubmit = () => {
    console.log("Submitting code:", code);
    // TODO: Implement code submission
  };

  // Initialize panel position on mount - relative to code editor container
  useEffect(() => {
    const updatePanelPosition = () => {
      if (codeEditorContainerRef.current) {
        const containerRect = codeEditorContainerRef.current.getBoundingClientRect();
        setTestPanelPosition({ x: 0, y: containerRect.height - 300 });
        setTestPanelSize({ width: containerRect.width, height: 300 });
      }
    };
    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    return () => window.removeEventListener("resize", updatePanelPosition);
  }, []);

  // Handle dragging - only from header
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    // Don't drag if clicking on buttons or resize handle
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('[role="button"]') ||
      resizeHandleRef.current?.contains(target)
    ) {
      return;
    }
    
    if (!codeEditorContainerRef.current) return;
    
    const containerRect = codeEditorContainerRef.current.getBoundingClientRect();
    setIsDragging(true);
    // Calculate offset from mouse position to panel position (relative to container)
    setDragStart({
      x: e.clientX - containerRect.left - testPanelPosition.x,
      y: e.clientY - containerRect.top - testPanelPosition.y,
    });
  };

  // Handle resizing
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: testPanelSize.width,
      height: testPanelSize.height,
    });
  };

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!codeEditorContainerRef.current) return;
      
      const containerRect = codeEditorContainerRef.current.getBoundingClientRect();
      
      if (isDragging) {
        // Calculate position relative to code editor container
        const newX = e.clientX - containerRect.left - dragStart.x;
        const newY = e.clientY - containerRect.top - dragStart.y;
        
        // Constrain to code editor container bounds
        const maxX = containerRect.width - testPanelSize.width;
        const maxY = containerRect.height - testPanelSize.height;
        
        setTestPanelPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = resizeStart.y - e.clientY; // Inverted for bottom-right resize
        
        const newWidth = Math.max(400, Math.min(resizeStart.width + deltaX, containerRect.width - testPanelPosition.x));
        const newHeight = Math.max(200, Math.min(resizeStart.height + deltaY, containerRect.height - testPanelPosition.y));
        
        setTestPanelSize({
          width: newWidth,
          height: newHeight,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, testPanelPosition, testPanelSize]);

  const handleTestRun = () => {
    console.log("Running test with input:", customInput);
    // TODO: Execute code with custom input
    // For now, just show a placeholder output
    setCustomOutput("// Output will appear here after running the test");
  };

  const handleClearTest = () => {
    setCustomInput("");
    setCustomOutput("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: COLORS.background.light,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: COLORS.background.white,
          borderBottom: `1px solid ${COLORS.border.light}`,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: COLORS.text.primary,
            textTransform: "none",
            "&:hover": {
              backgroundColor: COLORS.background.light,
            },
          }}
        >
          Back
        </Button>
        <Divider orientation="vertical" flexItem />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: COLORS.text.primary,
            flex: 1,
          }}
        >
          {problemData.title}
        </Typography>
        <Chip
          label={problemData.difficulty}
          size="small"
          sx={{
            backgroundColor: getDifficultyColor(problemData.difficulty),
            color: "white",
            fontWeight: 600,
            height: "28px",
          }}
        />
      </Box>

      {/* Main Content - Split Layout */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Problem Statement */}
        <Box
          sx={{
            width: "50%",
            overflowY: "auto",
            backgroundColor: COLORS.background.white,
            borderRight: `1px solid ${COLORS.border.light}`,
          }}
        >
          <Box sx={{ p: 4 }}>
            {/* Problem Description */}
            <Typography
              variant="body1"
              sx={{
                color: COLORS.text.primary,
                lineHeight: 1.8,
                whiteSpace: "pre-line",
                mb: 4,
              }}
            >
              {problemData.description}
            </Typography>

            {/* Examples */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: COLORS.text.primary,
                mb: 2,
              }}
            >
              Examples:
            </Typography>
            {problemData.examples.map((example, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: COLORS.background.light,
                  border: `1px solid ${COLORS.border.light}`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    mb: 1,
                  }}
                >
                  Example {index + 1}:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: COLORS.text.secondary,
                    fontFamily: "monospace",
                    mb: 1,
                  }}
                >
                  <strong>Input:</strong> {example.input}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: COLORS.text.secondary,
                    fontFamily: "monospace",
                    mb: example.explanation ? 1 : 0,
                  }}
                >
                  <strong>Output:</strong> {example.output}
                </Typography>
                {example.explanation && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: COLORS.text.muted,
                      mt: 1,
                    }}
                  >
                    <strong>Explanation:</strong> {example.explanation}
                  </Typography>
                )}
              </Paper>
            ))}

            {/* Constraints */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: COLORS.text.primary,
                mb: 2,
                mt: 4,
              }}
            >
              Constraints:
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: 3,
                m: 0,
                "& li": {
                  color: COLORS.text.secondary,
                  mb: 1,
                  lineHeight: 1.6,
                },
              }}
            >
              {problemData.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Side - Code Editor */}
        <Box
          ref={codeEditorContainerRef}
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: COLORS.background.white,
            position: "relative",
          }}
        >
          {/* Editor Toolbar */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: `1px solid ${COLORS.border.light}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: COLORS.text.primary,
              }}
            >
              Code Editor
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleRun}
                sx={{
                  textTransform: "none",
                  borderColor: COLORS.border.medium,
                  color: COLORS.text.primary,
                  "&:hover": {
                    borderColor: COLORS.primary,
                    backgroundColor: COLORS.background.light,
                  },
                }}
              >
                Run
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  backgroundColor: COLORS.primary,
                  color: "white",
                  "&:hover": {
                    backgroundColor: COLORS.primaryDark,
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>

          {/* Monaco Editor */}
          <Box sx={{ flex: 1, position: "relative" }}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
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
            
            {/* Draggable Custom Test Case Panel - Inside Code Editor */}
            {isTestPanelOpen && (
        <Paper
          ref={panelRef}
          sx={{
            position: "absolute",
            left: `${testPanelPosition.x}px`,
            top: `${testPanelPosition.y}px`,
            width: `${testPanelSize.width}px`,
            height: `${testPanelSize.height}px`,
            backgroundColor: COLORS.background.white,
            border: `1px solid ${COLORS.border.light}`,
            boxShadow: SHADOWS.lg,
            display: "flex",
            flexDirection: "column",
            zIndex: 10,
            userSelect: "none",
          }}
        >
          {/* Panel Header */}
          <Box
            ref={headerRef}
            onMouseDown={handleHeaderMouseDown}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              borderBottom: `1px solid ${COLORS.border.light}`,
              backgroundColor: COLORS.background.light,
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DragIndicatorIcon
                sx={{
                  color: COLORS.text.muted,
                  fontSize: "20px",
                  cursor: "grab",
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.text.primary,
                }}
              >
                Custom Test Case
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => {
                  if (testPanelSize.height < 400) {
                    setTestPanelSize({ ...testPanelSize, height: 400 });
                  } else {
                    setTestPanelSize({ ...testPanelSize, height: 200 });
                  }
                }}
                sx={{
                  color: COLORS.text.secondary,
                  "&:hover": {
                    backgroundColor: COLORS.background.lighter,
                  },
                }}
              >
                {testPanelSize.height < 400 ? (
                  <OpenInFullIcon fontSize="small" />
                ) : (
                  <MinimizeIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setIsTestPanelOpen(false)}
                sx={{
                  color: COLORS.text.secondary,
                  "&:hover": {
                    backgroundColor: COLORS.background.lighter,
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Panel Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, flex: 1, minHeight: 0 }}>
              {/* Input Section */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                    mb: 1,
                  }}
                >
                  Input
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter your test input here..."
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      height: "100%",
                      fontFamily: "monospace",
                      fontSize: "13px",
                      alignItems: "flex-start",
                    },
                    "& .MuiInputBase-input": {
                      height: "100% !important",
                      overflow: "auto !important",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "100%",
                    },
                  }}
                />
              </Box>

              {/* Output Section */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                    mb: 1,
                  }}
                >
                  Output
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  value={customOutput}
                  onChange={(e) => setCustomOutput(e.target.value)}
                  placeholder="Output will appear here..."
                  disabled
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      height: "100%",
                      fontFamily: "monospace",
                      fontSize: "13px",
                      backgroundColor: COLORS.background.light,
                      alignItems: "flex-start",
                    },
                    "& .MuiInputBase-input": {
                      height: "100% !important",
                      overflow: "auto !important",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "100%",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleClearTest}
                size="small"
                sx={{
                  textTransform: "none",
                  borderColor: COLORS.border.medium,
                  color: COLORS.text.primary,
                  "&:hover": {
                    borderColor: COLORS.primary,
                    backgroundColor: COLORS.background.light,
                  },
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={handleTestRun}
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: COLORS.primary,
                  color: "white",
                  "&:hover": {
                    backgroundColor: COLORS.primaryDark,
                  },
                }}
              >
                Run Test
              </Button>
            </Box>
          </Box>

          {/* Resize Handle - Bottom Right Corner */}
          <Box
            ref={resizeHandleRef}
            onMouseDown={handleResizeMouseDown}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "24px",
              height: "24px",
              cursor: "nwse-resize",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              "&::after": {
                content: '""',
                width: 0,
                height: 0,
                borderLeft: "12px solid transparent",
                borderBottom: "12px solid",
                borderBottomColor: COLORS.text.muted,
                opacity: 0.6,
              },
              "&:hover::after": {
                borderBottomColor: COLORS.primary,
                opacity: 1,
              },
            }}
          />
        </Paper>
            )}

            {/* Toggle Button to Show Panel - Inside Code Editor */}
            {!isTestPanelOpen && (
              <Button
                variant="contained"
                onClick={() => {
                  if (codeEditorContainerRef.current) {
                    const containerRect = codeEditorContainerRef.current.getBoundingClientRect();
                    setIsTestPanelOpen(true);
                    setTestPanelPosition({ x: 0, y: containerRect.height - 300 });
                    setTestPanelSize({ width: containerRect.width, height: 300 });
                  }
                }}
                sx={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                  minWidth: "auto",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: COLORS.primary,
                  color: "white",
                  boxShadow: SHADOWS.lg,
                  zIndex: 10,
                  "&:hover": {
                    backgroundColor: COLORS.primaryDark,
                  },
                }}
              >
                <OpenInFullIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditorPage;

