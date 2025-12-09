import React from "react";
import { Box, Typography } from "@mui/material";
import { Question } from "../../types";
import { getYouTubeEmbedUrl } from "../../utils";
import { COLORS, SHADOWS } from "../../constants";

interface VideoTemplateProps {
  question: Question;
  practiceMode?: boolean;
  showAnswers?: boolean;
  userAnswer?: string | string[];
  onAnswerChange?: (answer: string | string[]) => void;
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({
  question,
  practiceMode = false,
  showAnswers = false,
  userAnswer,
  onAnswerChange,
}) => {
  const embedUrl = getYouTubeEmbedUrl(question.content.url || "");

  return (
    <Box sx={{ mt: 2 }}>
      {embedUrl ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "56.25%", // 16:9 aspect ratio
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: SHADOWS.md,
            border: `1px solid ${COLORS.border.light}`,
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ) : (
        <Typography sx={{ color: COLORS.text.muted, fontStyle: "italic" }}>
          Invalid YouTube URL
        </Typography>
      )}
    </Box>
  );
};

export default VideoTemplate;
