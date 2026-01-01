import React from "react";
import { Box, Typography, Button, IconButton, Chip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { ApiQuestion } from "../../types";
import { COLORS, SHADOWS } from "../../constants";

interface CodeChallengeCardProps {
  question: ApiQuestion;
  onSolve?: () => void;
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

const CodeChallengeCard: React.FC<CodeChallengeCardProps> = ({
  question,
  onSolve,
  onBookmark,
  isBookmarked = false,
}) => {
  // Calculate success rate from practices if available
  const calculateSuccessRate = (): number => {
    if (!question.practices || question.practices.length === 0) return 0;
    const correctCount = question.practices.filter((p) => p.isCorrect).length;
    return Math.round((correctCount / question.practices.length) * 100 * 100) / 100;
  };

  const successRate = calculateSuccessRate();

  return (
    <Box
      sx={{
        position: "relative",
        mb: 3,
        cursor: "pointer",
        "&:first-of-type": {
          mt: 0,
        },
      }}
      className="single-item challenges-list-view-v2 first-challenge cursor"
    >
      <Box
        id="contest-challenges-problem"
        className="individual-challenge-card-v2 content--list-v2 track_content"
        sx={{
          borderRadius: "8px",
          border: `1px solid ${COLORS.border.light}`,
          background: COLORS.background.white,
          boxShadow: SHADOWS.sm,
          overflow: "hidden",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow: SHADOWS.md,
            borderColor: COLORS.primary,
          },
        }}
      >
        <Box className="content--list_body" sx={{ p: 2.5 }}>
          <Box
            className="content--list_header-v2"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Challenge Name and Details */}
            <Box
              className="challenge-name-details"
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Box
                className="pull-left inline-block"
                sx={{
                  width: "100%",
                }}
              >
                <Typography
                  component="h4"
                  className="challengecard-title"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: COLORS.text.primary,
                    mb: 1.5,
                    lineHeight: 1.4,
                  }}
                >
                  {question.title || "Code Challenge"}
                  <Box
                    className="card-details pmT"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 1.5,
                      mt: 1.5,
                    }}
                  >
                    {/* Difficulty - Default to Easy if not provided */}
                    <Chip
                      label="Easy"
                      className="difficulty easy detail-item"
                      size="small"
                      sx={{
                        height: "24px",
                        fontSize: "12px",
                        fontWeight: 500,
                        backgroundColor: "#27AE60",
                        color: "white",
                        borderRadius: "4px",
                        "& .MuiChip-label": {
                          px: 1,
                        },
                      }}
                    />
                    {/* Skill - Use question type name or default */}
                    <Typography
                      component="span"
                      className="skill detail-item"
                      sx={{
                        fontSize: "12px",
                        color: COLORS.text.secondary,
                        fontWeight: 500,
                      }}
                    >
                      {question.questiontypecon?.name || "Problem Solving"}
                    </Typography>
                    {/* Max Score */}
                    <Typography
                      component="span"
                      className="max-score detail-item"
                      sx={{
                        fontSize: "12px",
                        color: COLORS.text.secondary,
                        fontWeight: 500,
                      }}
                    >
                      Max Score: {question.score || 0}
                    </Typography>
                    {/* Success Rate */}
                    {successRate > 0 && (
                      <Typography
                        component="span"
                        className="success-ratio detail-item"
                        sx={{
                          fontSize: "12px",
                          color: COLORS.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        Success Rate: {successRate.toFixed(2)}%
                      </Typography>
                    )}
                  </Box>
                </Typography>
              </Box>
            </Box>

            {/* Right side actions: Bookmark and Solve Challenge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexShrink: 0,
              }}
            >
              {/* Bookmark Button */}
              <Box className="bookmark-cta">
                <IconButton
                  className="ui-btn ui-btn-normal ui-btn-plain star-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark?.();
                  }}
                  aria-label="Add to favourites"
                  sx={{
                    p: 1,
                    color: isBookmarked ? "#FFCB45" : COLORS.text.muted,
                    "&:hover": {
                      backgroundColor: COLORS.background.light,
                      color: "#FFCB45",
                    },
                  }}
                >
                  {isBookmarked ? (
                    <StarIcon sx={{ fontSize: "20px" }} />
                  ) : (
                    <StarBorderIcon sx={{ fontSize: "20px" }} />
                  )}
                </IconButton>
              </Box>

              {/* CTA Container - Solve Challenge Button */}
              <Box className="cta-container">
                <Box className="ctas">
                  <Box className="challenge-submit-btn">
                    <Button
                      className="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled"
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSolve?.();
                      }}
                      sx={{
                        backgroundColor: COLORS.primary,
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 500,
                        px: 2.5,
                        py: 1,
                        borderRadius: "6px",
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: COLORS.primaryDark,
                          boxShadow: SHADOWS.sm,
                        },
                      }}
                    >
                      Solve Challenge
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeChallengeCard;

