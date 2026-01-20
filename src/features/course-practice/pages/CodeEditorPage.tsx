import React, { useState, useRef, useEffect, useMemo } from "react";
import { Box, Typography, Button, Paper, Divider, Chip, TextField, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { COLORS, SHADOWS } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { useGetQuestionByIdQuery, useGetContentByTopicIdQuery, useGetCodeLanguagesQuery } from "../api/courseProgressApi";
import { ApiQuestion } from "../types";
import CodeTestSubmission from "../../../components/CodeTestSubmission";

// Language ID to Monaco editor language value mapping
// This maps language IDs to Monaco editor language identifiers
const languageIdToMonacoMap: { [key: number]: string } = {
  50: "c",
  51: "csharp",
  54: "cpp",
  58: "java",
  60: "go",
  63: "javascript",
  68: "php",
  70: "python",
  71: "python",
  72: "ruby",
  73: "rust",
  74: "swift",
  76: "typescript",
  78: "kotlin",
  91: "java",
  105: "typescript",
};

// Helper function to normalize language value from API response
// Converts language name/value to Monaco editor compatible format
const normalizeLanguageValue = (name: string, value?: string): string => {
  // If value is provided, use it (lowercased)
  if (value) {
    return value.toLowerCase();
  }
  
  // Otherwise, normalize the name
  const normalized = name.toLowerCase().replace(/\s+/g, "");
  
  // Handle special cases
  const mapping: { [key: string]: string } = {
    "c++": "cpp",
    "c#": "csharp",
    "csharp": "csharp",
    "typescript": "typescript",
    "javascript": "javascript",
    "java": "java",
    "python": "python",
    "php": "php",
    "ruby": "ruby",
  };
  
  return mapping[normalized] || normalized;
};

// Helper function to get available languages from API response
// Uses alllowedLanguage array, codeTemplate array, and fetched languages list
const getAvailableLanguages = (
  codeTemplateArray?: Array<{ code: string; languageId: number }>,
  allowedLanguageIds?: number[],
  allLanguagesFromApi?: Array<{ id: number; name: string; value?: string; label?: string }>
): Array<{ value: string; label: string; id: number }> => {
  // Build a map of language ID to language info from API
  const languageMap = new Map<number, { value: string; label: string; id: number }>();
  
  if (allLanguagesFromApi && allLanguagesFromApi.length > 0) {
    for (const lang of allLanguagesFromApi) {
      const value = normalizeLanguageValue(lang.name, lang.value);
      const label = lang.label || lang.name;
      languageMap.set(lang.id, { value, label, id: lang.id });
    }
  }
  
  // If we have allowedLanguageIds, use that as the source of truth
  if (allowedLanguageIds && allowedLanguageIds.length > 0) {
    const languages: Array<{ value: string; label: string; id: number }> = [];
    const seenValues = new Set<string>();
    
    for (const langId of allowedLanguageIds) {
      // First try to get from API language map
      let langInfo = languageMap.get(langId);
      
      // If not found in API map, fallback to Monaco map
      if (!langInfo) {
        const langValue = languageIdToMonacoMap[langId];
        if (langValue && !seenValues.has(langValue)) {
          seenValues.add(langValue);
          langInfo = {
            value: langValue,
            label: langValue.charAt(0).toUpperCase() + langValue.slice(1),
            id: langId,
          };
        }
      } else if (!seenValues.has(langInfo.value)) {
        seenValues.add(langInfo.value);
      } else {
        continue; // Skip duplicates
      }
      
      if (langInfo) {
        languages.push(langInfo);
      }
    }
    
    if (languages.length > 0) {
      return languages;
    }
  }
  
  // Fallback: extract languages from codeTemplate array
  if (codeTemplateArray && codeTemplateArray.length > 0) {
    const languages: Array<{ value: string; label: string; id: number }> = [];
    const seenValues = new Set<string>();
    
    for (const template of codeTemplateArray) {
      // First try to get from API language map
      let langInfo = languageMap.get(template.languageId);
      
      // If not found in API map, fallback to Monaco map
      if (!langInfo) {
        const langValue = languageIdToMonacoMap[template.languageId];
        if (langValue && !seenValues.has(langValue)) {
          seenValues.add(langValue);
          langInfo = {
            value: langValue,
            label: langValue.charAt(0).toUpperCase() + langValue.slice(1),
            id: template.languageId,
          };
        }
      } else if (!seenValues.has(langInfo.value)) {
        seenValues.add(langInfo.value);
      } else {
        continue; // Skip duplicates
      }
      
      if (langInfo) {
        languages.push(langInfo);
      }
    }
    
    if (languages.length > 0) {
      return languages;
    }
  }
  
  // Return empty array if no languages found
  return [];
};

// Helper function to get code template by language from codeTemplate array
const getCodeFromTemplateArray = (
  language: string,
  codeTemplateArray?: Array<{ code: string; languageId: number }>,
  allLanguagesFromApi?: Array<{ id: number; name: string; value?: string; label?: string }>
): string | null => {
  if (!codeTemplateArray || codeTemplateArray.length === 0) {
    return null;
  }
  
  // Build a map of language ID to normalized value
  const languageValueMap = new Map<number, string>();
  
  if (allLanguagesFromApi && allLanguagesFromApi.length > 0) {
    for (const lang of allLanguagesFromApi) {
      const value = normalizeLanguageValue(lang.name, lang.value);
      languageValueMap.set(lang.id, value);
    }
  }
  
  // Find the template that matches the selected language
  const template = codeTemplateArray.find((t) => {
    // First try API language map
    const mappedValue = languageValueMap.get(t.languageId);
    if (mappedValue === language) {
      return true;
    }
    
    // Fallback to Monaco map
    const monacoValue = languageIdToMonacoMap[t.languageId];
    return monacoValue === language;
  });
  
  return template ? template.code : null;
};

const getDefaultCode = (
  language: string,
  codeTemplateArray?: Array<{ code: string; languageId: number }>,
  allLanguagesFromApi?: Array<{ id: number; name: string; value?: string; label?: string }>
): string => {
  // Priority: Always use code template from API if available for the selected language
  const templateCode = getCodeFromTemplateArray(language, codeTemplateArray, allLanguagesFromApi);
  if (templateCode) {
    return templateCode;
  }
  
  // Fallback to default templates only if no template exists in codeTemplate
  const templates: { [key: string]: string } = {
    python: `# Write your solution here
def solve():
    # Your code goes here
    return`,
    javascript: `// Write your solution here
function solve() {
    // Your code goes here
    return;
}`,
    java: `// Write your solution here
public class Solution {
    public void solve() {
        // Your code goes here
    }
}`,
    cpp: `// Write your solution here
#include <iostream>
using namespace std;

void solve() {
    // Your code goes here
}`,
    c: `// Write your solution here
#include <stdio.h>

void solve() {
    // Your code goes here
}`,
    csharp: `// Write your solution here
using System;

public class Solution {
    public void solve() {
        // Your code goes here
    }
}`,
    php: `<?php
// Write your solution here
function solve() {
    // Your code goes here
}`,
    ruby: `# Write your solution here
def solve
    # Your code goes here
end`,
    go: `package main

// Write your solution here
func solve() {
    // Your code goes here
}`,
    rust: `// Write your solution here
fn solve() {
    // Your code goes here
}`,
    swift: `// Write your solution here
func solve() {
    // Your code goes here
}`,
    kotlin: `// Write your solution here
fun solve() {
    // Your code goes here
}`,
    typescript: `// Write your solution here
function solve(): void {
    // Your code goes here
}`,
  };
  return templates[language] || templates.javascript;
};

const CodeEditorPage: React.FC = () => {
  const { questionId, courseId } = useParams<{ questionId: string; courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Fetch available languages from API
  const { data: languagesData, isLoading: isLoadingLanguages } = useGetCodeLanguagesQuery();
  const allLanguagesFromApi = languagesData?.data || [];
  
  // Get question from navigation state (passed when clicking Solve Challenge)
  const questionFromState = location.state?.question as ApiQuestion | undefined;
  
  // Fetch question data from API as fallback (only if not passed via state)
  const { data: questionData, isLoading: isLoadingQuestion, isError: isQuestionError } = useGetQuestionByIdQuery(
    { questionId: questionId!, courseId: courseId! },
    { skip: !questionId || !courseId || !!questionFromState }
  );

  // Handle different API response structures
  // API might return: { data: question } or question directly or { success: true, data: question }
  let questionFromApi: ApiQuestion | null = null;
  
  if (questionData) {
    // Try different response structures
    if (questionData.data) {
      questionFromApi = questionData.data;
    } else if (questionData.success && questionData.data) {
      questionFromApi = questionData.data;
    } else if (questionData.id || questionData.title) {
      // Question is returned directly
      questionFromApi = questionData as ApiQuestion;
    }
  }
  
  // Use question from state if available, otherwise use API data
  const question: ApiQuestion | null = questionFromState || questionFromApi;
  
  // Debug logging
  useEffect(() => {
    // Removed debug console.log statements
  }, [questionFromState, questionData, questionFromApi, isQuestionError]);
  
  // Get available languages from question code object - memoize to update when question changes
  // Handle both array format (actual API) and object format (legacy)
  const codeTemplateData = question?.code?.codeTemplate;
  const allowedLanguageIds = question?.code?.alllowedLanguage;
  
  // Extract codeTemplate array - handle both array and nested object formats
  const actualCodeTemplateArray = useMemo<Array<{ code: string; languageId: number }> | undefined>(() => {
    // Check if codeTemplate is an array (actual API format)
    if (Array.isArray(codeTemplateData)) {
      return codeTemplateData;
    }
    // Legacy format: has template property (will use allowedLanguageIds instead)
    return undefined;
  }, [codeTemplateData]);
  
  const availableLanguages = useMemo(() => {
    return getAvailableLanguages(actualCodeTemplateArray, allowedLanguageIds, allLanguagesFromApi);
  }, [actualCodeTemplateArray, allowedLanguageIds, allLanguagesFromApi]);
  
  // Debug available languages (after they're declared)
  useEffect(() => {
    // Removed debug console.log statements
  }, [availableLanguages, actualCodeTemplateArray, allowedLanguageIds]);
  
  // Get initial language - prefer URL language if valid, otherwise first available from codeTemplate
  const initialLanguage = useMemo(() => {
    const urlLanguage = searchParams.get("language");
    
    // If URL has a language and it's in available languages, use it
    if (urlLanguage && availableLanguages.some(l => l.value === urlLanguage)) {
      return urlLanguage;
    }
    
    // Otherwise, use first available language from codeTemplate
    if (availableLanguages.length > 0) {
      return availableLanguages[0].value;
    }
    
    // No fallback - return empty string if no languages available
    return "";
  }, [availableLanguages, searchParams]);
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);
  
  // Get code template from API - always use template from API if available for selected language
  const [code, setCode] = useState<string>(() => {
    if (initialLanguage) {
      const templateCode = getCodeFromTemplateArray(initialLanguage, actualCodeTemplateArray, allLanguagesFromApi);
      if (templateCode) {
        return templateCode;
      }
    }
    return getDefaultCode(initialLanguage, actualCodeTemplateArray, allLanguagesFromApi);
  });
  
  // Test submission state
  const [showTestResults, setShowTestResults] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  
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
  
  // Update code when language changes - always use codeTemplate from API for the selected language
  useEffect(() => {
    if (selectedLanguage) {
      const templateCode = getCodeFromTemplateArray(selectedLanguage, actualCodeTemplateArray, allLanguagesFromApi);
      if (templateCode) {
        // Use the template from API for the selected language
        setCode(templateCode);
      } else {
        // Fallback to default only if template not available
        setCode(getDefaultCode(selectedLanguage, actualCodeTemplateArray, allLanguagesFromApi));
      }
    }
  }, [selectedLanguage, actualCodeTemplateArray, allLanguagesFromApi]);
  
  // Update selected language when question loads and has allowed languages
  useEffect(() => {
    if (availableLanguages.length > 0) {
      const firstAllowed = availableLanguages[0].value;
      setSelectedLanguage((prev) => {
        // Only update if current language is not in allowed list
        const isCurrentAllowed = availableLanguages.some(l => l.value === prev);
        return isCurrentAllowed ? prev : firstAllowed;
      });
    }
  }, [availableLanguages]);
  
  // Debug selected language
  useEffect(() => {
    // Removed debug console.log statements
  }, [selectedLanguage]);

  const getDifficultyColor = (difficulty?: string) => {
    if (!difficulty) return COLORS.text.muted;
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

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  const handleRun = () => {
    // TODO: Implement code execution
  };

  const handleSubmit = () => {
    setShowTestResults(true);
  };

  // Get language ID from selected language
  const getLanguageId = (): number => {
    // First try to find in available languages (from API/current question)
    const lang = availableLanguages.find(l => l.value === selectedLanguage);
    if (lang) {
      return lang.id;
    }
    // Fallback: try to find in all languages from API
    if (allLanguagesFromApi && allLanguagesFromApi.length > 0) {
      const apiLang = allLanguagesFromApi.find(l => {
        const value = normalizeLanguageValue(l.name, l.value);
        return value === selectedLanguage;
      });
      if (apiLang) {
        return apiLang.id;
      }
    }
    // Final fallback: use Monaco map
    const entry = Object.entries(languageIdToMonacoMap).find(([_, value]) => value === selectedLanguage);
    return entry ? parseInt(entry[0]) : 63; // Default to JavaScript (63)
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
          {isLoadingQuestion ? "Loading..." : (question?.title || "Code Challenge")}
        </Typography>
        {question && (
          <Chip
            label="Easy"
            size="small"
            sx={{
              backgroundColor: getDifficultyColor("Easy"),
              color: "white",
              fontWeight: 600,
              height: "28px",
            }}
          />
        )}
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
            {isLoadingQuestion ? (
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.text.muted,
                  textAlign: "center",
                  py: 4,
                }}
              >
                Loading problem description...
              </Typography>
            ) : question ? (
              <>
                {/* Problem Description - Render HTML */}
                {question.description && question.description.trim() ? (
                  <Box
                    sx={{
                      color: COLORS.text.primary,
                      lineHeight: 1.8,
                      mb: 4,
                      wordBreak: "break-word",
                      "& p": {
                        mb: 2,
                        color: COLORS.text.primary,
                        "&:last-child": {
                          mb: 0,
                        },
                      },
                      "& strong": {
                        fontWeight: 600,
                        color: COLORS.text.primary,
                      },
                      "& b": {
                        fontWeight: 600,
                        color: COLORS.text.primary,
                      },
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        fontWeight: 600,
                        color: COLORS.text.primary,
                        mb: 2,
                        mt: 3,
                        "&:first-of-type": {
                          mt: 0,
                        },
                      },
                      "& ul, & ol": {
                        pl: 3,
                        mb: 2,
                        "& li": {
                          mb: 1,
                          color: COLORS.text.primary,
                        },
                      },
                      "& code": {
                        backgroundColor: COLORS.background.light,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontFamily: "monospace",
                        color: COLORS.text.primary,
                      },
                      "& pre": {
                        backgroundColor: COLORS.background.light,
                        padding: "12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontFamily: "monospace",
                        overflow: "auto",
                        mb: 2,
                        "& code": {
                          backgroundColor: "transparent",
                          padding: 0,
                        },
                      },
                      "& blockquote": {
                        borderLeft: `4px solid ${COLORS.primary}`,
                        pl: 2,
                        ml: 0,
                        fontStyle: "italic",
                        color: COLORS.text.secondary,
                        mb: 2,
                      },
                      "& a": {
                        color: COLORS.primary,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: question.description }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: COLORS.text.muted,
                      fontStyle: "italic",
                    }}
                  >
                    No description available for this challenge.
                  </Typography>
                )}
              </>
            ) : isQuestionError ? (
              <Box sx={{ py: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.text.muted,
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Unable to load question details. Please try again later.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    display: "block",
                    mx: "auto",
                    textTransform: "none",
                  }}
                >
                  Go Back
                </Button>
              </Box>
            ) : (
              <Box sx={{ py: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.text.muted,
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Question not found. The question may have been removed or the link is invalid.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    display: "block",
                    mx: "auto",
                    textTransform: "none",
                  }}
                >
                  Go Back
                </Button>
              </Box>
            )}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.text.primary,
                }}
              >
                Code Editor
              </Typography>
              {/* Language Selector - Only show if languages are available */}
              {availableLanguages.length > 0 ? (
                <FormControl
                  size="small"
                  sx={{
                    minWidth: 150,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: COLORS.background.white,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.border.medium,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.primary,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.primary,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  <InputLabel id="language-select-label">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={selectedLanguage || ""}
                    label="Language"
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    renderValue={(value) => {
                      const lang = availableLanguages.find(l => l.value === value);
                      return lang ? lang.label : "Select Language";
                    }}
                  >
                    {availableLanguages.map((lang) => (
                      <MenuItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : isLoadingQuestion ? (
                <Typography variant="body2" sx={{ color: COLORS.text.muted }}>
                  Loading languages...
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ color: COLORS.text.muted }}>
                  No languages available
                </Typography>
              )}
            </Box>
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

          {/* Test Results Panel */}
          {showTestResults && question && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Paper
                sx={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  overflow: "auto",
                  p: 3,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Test Results
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setShowTestResults(false);
                      setTestResults(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <CodeTestSubmission
                  questionId={question.id}
                  sourceCode={code}
                  languageId={getLanguageId()}
                  onSubmit={(result) => {
                    setTestResults(result);
                  }}
                />
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CodeEditorPage;

