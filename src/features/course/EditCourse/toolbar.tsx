import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
// icons
import WestIcon from "@mui/icons-material/West";

import MoreButton from "../../course-settings/components/MoreButton";
import PublishButton from "../../course-settings/components/PublishButton";
import { Link, useNavigate, useParams } from "react-router-dom";

const ToolBar = ({ children, courseName, previousPage }: { courseName?: string; children: React.ReactNode; previousPage?: string }) => {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          padding: "24px",
          borderBottom: "1px solid #cccccc",
        }}
      >
        {/* left side  */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton sx={{ color: "#000000" }}>
            <Link to={previousPage || "/courses"} style={{ textDecoration: "none", color: "black" }}><WestIcon /></Link>
          </IconButton>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            {courseName || "Course Name"}
          </Typography>
        </Box>
        {/* right side  */}
        {children}
      </Box>
    </Box>
  );
};

export const RightSideTools = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "48px",
      }}
    >
      <PublishButton />
      <Button
        variant="outlined"
        onClick={() => navigate(`/course-progress/${courseId}`)}
        sx={{
          padding: "12px 32px",
          height: "48px",
          color: "#6A42AB",
          border: "1px solid #6A42AB",
          borderRadius: "8px",
          backgroundColor: "transparent",
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "#6A42BB",
            boxShadow: "0 0 10px rgba(106, 66, 171, 0.4)", // soft glow around border
            backgroundColor: "transparent", // keep transparent
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 3px rgba(106, 66, 171, 0.3)",
          },
          "&:active": {
            transform: "scale(0.98)", // subtle click feedback
            boxShadow: "0 0 6px rgba(106, 66, 171, 0.3)",
          },
        }}
      >
        Preview
      </Button>

      <MoreButton />
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "#B3B3B3", // sets the line color
          height: "48px", // sets custom height
          borderWidth: "0.8px", // optional: control thickness
        }}
      />
      <Box>
        <Rating
          size="small"
          name="simple-uncontrolled"
          readOnly
          defaultValue={0}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#808080", // 🎯 your custom color here (e.g., #ccc, white, etc.)
            },
            "& .MuiRating-iconFilled": {
              color: "gold", // optional: change selected star color
            },
          }}
        />
        <Typography sx={{ color: "#808080", fontSize: "12px" }}>
          No Rating
        </Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Lessons</Typography>
      </Box>
      <Typography sx={{ color: "#000000" }}>/</Typography>
      <Box sx={{ textAlign: "center", color: "#000000" }}>
        <Typography>2</Typography>
        <Typography>Learners</Typography>
      </Box>
    </Box>
  );
};

export default ToolBar;
