import { Box, Typography, Divider } from "@mui/material";
import FileEditIcon from "@icons/FileEditIcon";

export function CourseQuestionEditMain() {
  return (
    <Box>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "16px",
          bgcolor: "#fff",
          border: "1px solid #E6E6E6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Typography sx={{ color: "#6A42AB", fontSize: "24px", fontWeight: "600" }}>
            02
          </Typography>
          <Divider orientation="vertical" color="#cccccc" flexItem />
          <Typography sx={{ color: "#000000", fontSize: "18px", fontWeight: "600" }}>
            Course Question 1
          </Typography>
        </Box>
        <FileEditIcon />
      </Box>
      <Box
        sx={{
          borderRadius: "16px",
          bgcolor: "#F9FAFA",
          border: "1px solid #E6E6E6",
          mt: "16px",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            border: "1px solid #D9D9D9",
            bgcolor: "#fff",
            width: "fit-content",
            borderRadius: "16px",
          }}
        >
          Answer 1
        </Box>
      </Box>
    </Box>
  );
}
