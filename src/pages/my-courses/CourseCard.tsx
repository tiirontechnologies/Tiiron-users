// components/CourseCard.tsx
import { Box, Typography, Chip, Divider } from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import StarFilledIcon from "@icons/StarFilledIcon";

interface CourseCardProps {
  thumbnailSrc: string;
  tags: string[];
  title: string;
  lessons: number;
  rating: number;
}

const CourseCard = ({
  thumbnailSrc,
  tags,
  title,
  lessons,
  rating,
}: CourseCardProps) => {
  return (
    <Box
      sx={{
        width: 268,
        height: 311,
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
      <Box
        sx={{
          borderRadius: 2,
          height: 113,
          width: "100%",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              backgroundColor: "#E2D5FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#452B80",
              fontWeight: 600,
            }}
          >
            No Image
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "10px" }}>
        {tags.map((tag, idx) => (
          <Chip key={idx} label={tag} size="small" />
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
          <DocumentIcon />
          <Typography sx={{ fontSize: "12px", color: "#666666" }}>
            {lessons} Lessons
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <StarFilledIcon />
          <Typography sx={{ fontSize: "12px", color: "#666666", mt: "3px" }}>
            {rating}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCard;
