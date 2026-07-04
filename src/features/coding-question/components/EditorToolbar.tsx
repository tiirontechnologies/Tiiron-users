import React from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CodeIcon from "@mui/icons-material/Code";
import { COLORS } from "../../../config/env";
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
        px: { xs: 1.25, sm: 1.75, md: 2 },
        py: { xs: 1, sm: 1.25 },
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1, sm: 1.5 },
        flexDirection: { xs: "column", sm: "row" },
        backgroundColor: "rgba(24, 24, 27, 0.98)",
        flexShrink: 0,
        color: "#fff",
        "& .MuiTypography-root": { color: "#fff" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, minWidth: 0 }}>
        <CodeIcon sx={{ color: "#8b7cff", fontSize: 20, flexShrink: 0 }} />
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "#ffffff !important",
            fontSize: "0.875rem",
            whiteSpace: "nowrap",
          }}
        >
          Editor
        </Typography>
        {availableLanguages.length > 0 ? (
          <FormControl
            size="small"
            sx={{
              minWidth: { xs: 0, sm: 150 },
              width: { xs: "100%", sm: 160 },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(39,39,42,0.88)",
                borderRadius: "10px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.10)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.18)" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: COLORS.primary,
                  borderWidth: "1px",
                },
              },
              "& .MuiInputBase-input": {
                color: "#fff !important",
                WebkitTextFillColor: "#fff !important",
                fontSize: "0.8125rem",
                fontWeight: 700,
              },
              "& .MuiInputLabel-root": { color: "#fff !important", opacity: 0.82, fontWeight: 700 },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fff !important" },
              "& .MuiSvgIcon-root": { color: "#fff" },
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
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#18181b",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.10)",
                    "& .MuiMenuItem-root": {
                      color: "#fff",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                      "&.Mui-selected": { backgroundColor: "rgba(79,57,246,0.30)" },
                    },
                  },
                },
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
          <Typography variant="body2" sx={{ color: "#ffffff !important", opacity: 0.82, fontWeight: 700 }}>
            Loading languages...
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "#ffffff !important", opacity: 0.82, fontWeight: 700 }}>
            No languages available
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1, justifyContent: { xs: "stretch", sm: "flex-end" } }}>
        <Tooltip title="Run test cases">
          <Button
            variant="outlined"
            onClick={onRun}
            startIcon={<PlayArrowIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              borderColor: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontWeight: 700,
              minHeight: 36,
              flex: { xs: 1, sm: "0 0 auto" },
              "&:hover": {
                borderColor: COLORS.primary,
                color: "#fff",
                backgroundColor: "rgba(79, 57, 246, 0.12)",
              },
            }}
          >
            Run
          </Button>
        </Tooltip>
        <Tooltip title="Submit solution">
          <Button
            variant="contained"
            onClick={onSubmit}
            startIcon={<CloudDoneIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              backgroundColor: COLORS.primary,
              color: "#fff",
              fontWeight: 700,
              minHeight: 36,
              flex: { xs: 1, sm: "0 0 auto" },
              boxShadow: "none",
              "&:hover": {
                backgroundColor: COLORS.primaryDark,
                boxShadow: "none",
              },
            }}
          >
            Submit
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
