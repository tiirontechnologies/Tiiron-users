// components/QuestionCard.tsx
import { Box, Typography, Chip, Divider } from "@mui/material";

interface QuestionCardProps {
  thumbnailSrc: string;
  tags: string[];
  title: string;
  name: string;
  rating: number;
  backgroundColor: string;
  color: string;
}

const QuestionCard = ({
  tags,
  title,
  name,
  backgroundColor,
  color,
}: QuestionCardProps) => {
  return (
    <Box
      sx={{
        width: 268,
        height: 242,
        borderRadius: "20px",
        padding: 1.5,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "10px" }}>
        {tags.map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{ bgcolor: backgroundColor, color: color, p: "12px" }}
          />
        ))}
      </Box>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          mt: "10px",
        }}
      >
        {title}
      </Typography>
      <Divider
        sx={{
          position: "absolute",
          bottom: 37,
          left: 12,
          right: 12,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          bottom: 12,
          left: 12,
          right: 12,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#666666" }}>
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "#666666", mt: "3px" }}>
            1 Topic • 2 Question
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionCard;
