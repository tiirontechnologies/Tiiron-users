import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface UserTestimonialProps {
  name?: string;
  rating?: number;
  date?: string;
  review?: string;
  avatar?: string;
}

export default function UserTestimonial({
  name = "Mark Doe",
  rating = 5,
  date = "22 Mar 2026",
  review = "",
  avatar,
}: UserTestimonialProps) {
  const [expanded, setExpanded] = useState(false);
  const isLongText = review.length > 180;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 2.5,
        p: 2,
        transition: "all .2s ease",
        "&:hover": {
          borderColor: "#4F46E5",
          boxShadow: "0 8px 20px rgba(79,70,229,.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 44,
            height: 44,
            bgcolor: "#EEF2FF",
            color: "#4338CA",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {name?.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Name + Rating + Date */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1,
              mb: 0.8,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                <StarRoundedIcon sx={{ fontSize: 15, color: "#F59E0B" }} />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                  }}
                >
                  {rating}.0
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 11,
                color: "#9CA3AF",
                whiteSpace: "nowrap",
              }}
            >
              {date}
            </Typography>
          </Box>

          {/* Review Text */}
          <Typography
            sx={{
              fontSize: 13.5,
              color: "#4B5563",
              lineHeight: 1.7,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: expanded ? "unset" : 3,
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {review || "No written review provided."}
          </Typography>

          {isLongText && (
            <Typography
              onClick={() => setExpanded(!expanded)}
              sx={{
                mt: 0.75,
                fontSize: 12,
                fontWeight: 600,
                color: "#4F46E5",
                cursor: "pointer",
                width: "fit-content",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {expanded ? "Read less" : "Read more"}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}