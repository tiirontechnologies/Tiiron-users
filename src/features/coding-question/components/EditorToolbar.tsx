import React from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { COLORS } from "../../../config/env";
import { PAGE } from "../constants";
import type { LanguageInfo } from "../utils/languageUtils";

interface EditorToolbarProps {
  availableLanguages: LanguageInfo[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isLoadingLanguages?: boolean;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  availableLanguages,
  selectedLanguage,
  onLanguageChange,
  onRun,
  onSubmit,
  isLoadingLanguages,
}) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #27272a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#18181b",
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#fff", fontSize: "0.875rem" }}
        >
          Code Editor
        </Typography>
        {availableLanguages.length > 0 ? (
          <FormControl
            size="small"
            sx={{
              minWidth: 140,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#27272a",
                borderRadius: PAGE.radius,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#3f3f46" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#52525b" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: COLORS.primary,
                  borderWidth: "1px",
                },
              },
              "& .MuiInputBase-input": { color: "#fff", fontSize: "0.8125rem" },
              "& .MuiInputLabel-root": { color: "#71717a" },
              "& .MuiInputLabel-root.Mui-focused": { color: COLORS.primary },
              "& .MuiSvgIcon-root": { color: "#71717a" },
            }}
          >
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage || ""}
              label="Language"
              onChange={(e) => onLanguageChange(e.target.value)}
              renderValue={(value) => {
                const lang = availableLanguages.find((l) => l.value === value);
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
        ) : isLoadingLanguages ? (
          <Typography variant="body2" sx={{ color: "#71717a" }}>
            Loading languages...
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "#71717a" }}>
            No languages available
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onRun}
          sx={{
            textTransform: "none",
            borderRadius: PAGE.radius,
            borderColor: "#3f3f46",
            color: "#a1a1aa",
            fontWeight: 500,
            "&:hover": {
              borderColor: COLORS.primary,
              color: COLORS.primary,
              backgroundColor: "rgba(79, 57, 246, 0.08)",
            },
          }}
        >
          Run
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            textTransform: "none",
            borderRadius: PAGE.radius,
            backgroundColor: COLORS.primary,
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: COLORS.primaryDark,
              boxShadow: "none",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
