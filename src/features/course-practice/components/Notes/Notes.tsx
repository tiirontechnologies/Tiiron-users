import React from "react";
import {
  Box,
  Typography,
  Button,
  Skeleton,
  Divider,
  Paper,
  Chip,
  Stack
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useGetUnitNotesQuery } from "../../api/courseProgressApi";
  import { DescriptionOutlined } from "@mui/icons-material";

interface Note {
  id: number;
  title: string;
  driveUrl: string;
  unitId: number;
}

interface NotesSectionProps {
  unitId?: number;
}

const NotesSection: React.FC<NotesSectionProps> = ({ unitId }) => {
  const { data: response, isLoading, error } = useGetUnitNotesQuery(
    unitId!,
    {
      skip: !unitId,
    }
  );

  // const notes: Note[] = response?.data || [];
  const notes: Note[] = (response as any)?.data || [];

  // Loading UI
  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={80}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  // Error UI (fixed)
  if (error) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        {/* <PictureAsPdfIcon sx={{ fontSize: 60, color: "#e5e7eb", mb: 2 }} /> */}
        <DescriptionOutlined sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Failed to load notes
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Please try again later or refresh the page.
        </Typography>
      </Box>
    );
  }

  // Empty state

if (!notes.length) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #eef0f3",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pb: 2, width: "100%", textAlign: "left" }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: "#1f2937", textAlign: "left" }}>
          Study Notes
        </Typography>
        <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5, textAlign: "left" }}>
          Access downloadable PDF materials for this unit
        </Typography>
      </Box>

      {/* Minimal empty-state box */}
      <Box
        sx={{
          mx: 3,
          mb: 3,
          borderRadius: 3,
          py: 5,
          px: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fafafa",
          border: "1px dashed #e5e7eb",
        }}
      >
        {/* Icon badge - subtle, no heavy shadow/gradient */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.15)",
            mb: 2,
          }}
        >
          <DescriptionOutlined sx={{ fontSize: 24, color: "#7c3aed" }} />
        </Box>

        <Chip
          icon={<PictureAsPdfIcon sx={{ fontSize: "13px !important" }} />}
          label="Coming Soon"
          size="small"
          sx={{
            mb: 1.5,
            fontWeight: 600,
            fontSize: "0.7rem",
            bgcolor: "rgba(124,58,237,0.08)",
            color: "#7c3aed",
            border: "none",
          }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: "#374151", mb: 0.5 }}
        >
          Study Materials Coming Soon
        </Typography>

        <Typography
          variant="body2"
          sx={{ maxWidth: 360, lineHeight: 1.6, color: "#9ca3af" }}
        >
          Your instructor is preparing helpful notes and PDFs to support your
          learning. They'll appear here as soon as they're ready.
        </Typography>
      </Box>
    </Paper>
  );
}

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3, width: "100%", textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#111827",
            textAlign: "left",
          }}
        >
          Study Notes
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
          Access downloadable PDF materials for this unit
        </Typography>
      </Box>

      {/* Notes List */}
      <Box>
        {notes.map((note, index) => (
          <React.Fragment key={note.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#fff",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  borderColor: "#4F39F6",
                },
              }}
            >
              {/* Left Side */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* PDF Icon Box */}
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: 2,
                    bgcolor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PictureAsPdfIcon
                    sx={{ fontSize: 30, color: "#DC2626" }}
                  />
                  {/* <DescriptionOutlined sx={{ fontSize: 28, color: "primary.main", mb: 2 }} /> */}
                </Box>

                {/* Title */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    {note.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280" }}
                  >
                    PDF Document
                  </Typography>
                </Box>
              </Box>

              {/* Button */}
              <Button
                href={note.driveUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                endIcon={<OpenInNewIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: "#4F39F6",
                  color: "#4F39F6",
                  px: 2.5,
                  "&:hover": {
                    bgcolor: "#4F39F6",
                    color: "#fff",
                    borderColor: "#4F39F6",
                  },
                }}
              >
                Open
              </Button>
            </Box>

            {index < notes.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default NotesSection;
