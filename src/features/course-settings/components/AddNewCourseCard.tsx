// components/AddNewCourseCard.tsx
import { Box, Divider, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useModal } from "../../../hooks/useModal";
import { AddNewCourseModal } from "./Modal/AddNewCourseModal";


export default function AddNewCourseCard() {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <Box
      sx={{
        border: "1px dashed #000000",
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
          background: "#E2D5FF",
          borderRadius: "12px",
          height: 113,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          cursor: "pointer",
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
        onClick={openModal}
      >
        <AddRoundedIcon sx={{ color: "#452B80", fontSize: 40 }} />
      </Box>

      <Divider
        sx={{
          position: "absolute",
          bottom: 37,
          left: 12,
          right: 12,
        }} />

      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          mt: 1,
          pb: "90px",
          pr: 1,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c4c4c4",
            borderRadius: 10,
          },
        }}
      >
        <Typography
          style={{
            width: "100%",
            fontSize: 16,
            fontWeight: 500,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            padding: "4px 0",
          }}
        >
          Add A New Course
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          px: 1.5,
          display: "flex",
          justifyContent: "center",
          bgcolor: "#fff",
        }}
      ></Box>
      <AddNewCourseModal isOpen={isOpen} onClose={closeModal} />
    </Box>
  );
}