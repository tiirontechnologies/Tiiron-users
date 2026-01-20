import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputAdornment,
  TextField,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import SearchIcon from "@icons/SearchIcon";
import { useSearchCoursesQuery } from "../../../features/course-browse/api/courseApi";
import { ICourse } from "../../../types/course.types";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce input by 200ms to trigger API call when character is entered
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch courses from search API
  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useSearchCoursesQuery(
    { q: debouncedQuery.trim(), page: 1, limit: 10 },
    { skip: !debouncedQuery.trim() }
  );

  // Extract courses from response - handle different possible response structures
  const courses: ICourse[] = React.useMemo(() => {
    if (!searchData) return [];
    
    // Try different response structures
    const data = searchData as any;
    
    // Structure 1: { data: { results: [...] } } - Actual API structure
    if (data?.data?.results && Array.isArray(data.data.results)) {
      return data.data.results;
    }
    
    // Structure 2: { data: { courses: [...] } }
    if (data?.data?.courses && Array.isArray(data.data.courses)) {
      return data.data.courses;
    }
    
    // Structure 3: { results: [...] }
    if (data?.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    // Structure 4: { courses: [...] }
    if (data?.courses && Array.isArray(data.courses)) {
      return data.courses;
    }
    
    // Structure 5: Direct array
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  }, [searchData]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);

    // Hide suggestions if input is cleared
    if (!value.trim()) {
      setShowSuggestions(false);
    }
  };

  // Handle course click
  const handleCourseClick = useCallback(
    (courseId: number) => {
      setShowSuggestions(false);
      setQuery("");
      navigate(`/course-glossary/${courseId}`);
    },
    [navigate]
  );

  // Handle search icon click or Enter key press
  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setShowSuggestions(false);
      navigate(`/browse-courses?q=${encodeURIComponent(query.trim())}`);
    }
  }, [query, navigate]);

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && courses[selectedIndex]) {
        // Navigate to selected course
        handleCourseClick(courses[selectedIndex].id);
      } else {
        // Navigate to browse courses with search query
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < courses.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show suggestions when user is typing (show immediately when typing starts)
  const shouldShowSuggestions =
    showSuggestions &&
    query.trim().length > 0;

  return (
    <Box
      ref={searchBoxRef}
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="What do you want to learn?"
        size="small"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query.trim()) {
            setShowSuggestions(true);
          }
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            background: "#fff",
            borderRadius: { xs: "12px", sm: "14px" },
            padding: { xs: "4px", sm: "6px" },
            height: { xs: "44px", sm: "48px" },
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              border: "1.5px solid rgba(230, 230, 230, 1)",
              borderRadius: { xs: "12px", sm: "14px" },
              overflow: "hidden",
            },
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              "& fieldset": {
                borderColor: "rgba(79, 57, 246, 0.5)",
              },
              "& .MuiInputAdornment-root svg": {
                color: "rgba(79, 57, 246, 0.8)",
              },
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 16px rgba(79, 57, 246, 0.15)",
              "& fieldset": {
                borderColor: "rgba(79, 57, 246, 1)",
                borderWidth: "1.5px",
              },
              "& .MuiInputAdornment-root svg": {
                color: "rgba(79, 57, 246, 1)",
              },
            },
            "& .MuiInputBase-input": {
              padding: { xs: "8px 14px 8px 12px", sm: "10px 16px 10px 14px" },
              fontSize: { xs: "14px", sm: "15px" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(158, 158, 158, 1)",
              opacity: 1,
              fontSize: { xs: "14px", sm: "15px" },
            },
            "& .MuiInputAdornment-root": {
              padding: { xs: "0 8px", sm: "0 10px" },
              "& svg": {
                color: "rgba(79, 57, 246, 0.7)",
                fontSize: { xs: "20px", sm: "22px" },
                transition: "color 0.2s ease-in-out",
              },
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {(isLoading || isFetching) && debouncedQuery.trim() ? (
                <CircularProgress size={20} sx={{ color: "rgba(79, 57, 246, 1)", mr: 1 }} />
              ) : null}
              <Box
                component="button"
                type="button"
                onClick={handleSearch}
                sx={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover svg": {
                    color: "rgba(79, 57, 246, 1)",
                  },
                }}
                aria-label="Search"
              >
                <SearchIcon />
              </Box>
            </InputAdornment>
          ),
        }}
      />

      {/* Suggestions Dropdown */}
      {shouldShowSuggestions && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: "400px",
            overflow: "auto",
            zIndex: 1300,
            borderRadius: "12px",
            border: "1px solid rgba(230, 230, 230, 1)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading || isFetching ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 3,
              }}
            >
              <CircularProgress size={24} sx={{ color: "rgba(79, 57, 246, 1)" }} />
              <Typography
                sx={{
                  ml: 2,
                  color: "rgba(158, 158, 158, 1)",
                  fontSize: "14px",
                }}
              >
                Loading...
              </Typography>
            </Box>
          ) : courses.length > 0 ? (
            <List sx={{ py: 0 }}>
              {courses.map((course, index) => (
                <ListItem
                  key={course.id}
                  disablePadding
                  sx={{
                    borderBottom:
                      index < courses.length - 1
                        ? "1px solid rgba(230, 230, 230, 0.5)"
                        : "none",
                  }}
                >
                  <ListItemButton
                    onClick={() => handleCourseClick(course.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      backgroundColor:
                        selectedIndex === index
                          ? "rgba(79, 57, 246, 0.08)"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(79, 57, 246, 0.08)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "rgba(33, 33, 33, 1)",
                        fontWeight: selectedIndex === index ? 500 : 400,
                      }}
                    >
                      {course.title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : debouncedQuery.trim() ? (
            <Box
              sx={{
                py: 3,
                px: 2,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(158, 158, 158, 1)",
                  fontSize: "14px",
                }}
              >
                No courses found
              </Typography>
            </Box>
          ) : null}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBox;
