// components/CourseCard.tsx
import { Box, Typography, Chip, Divider, Button, IconButton, Modal } from "@mui/material";
import DocumentIcon from "@icons/DocumentIcon";
import StarFilledIcon from "@icons/StarFilledIcon";
import { UPLOADS } from "../../constants/constants";
import { useDeleteCourseMutation } from "../../api/api";
import { useState } from "react";
import DeleteIcon from "@icons/DeleteIcon";
import { Link } from "react-router-dom";

interface CourseCardProps {
  thumbnailSrc?: string;
  tags?: string[];
  title: string;
  chapters?: number;
  rating?: number;
  id: number;
  setSnackbarSeverity: React.Dispatch<React.SetStateAction<"success" | "error">>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const CourseCard = ({
  thumbnailSrc,
  tags,
  title,
  chapters,
  rating,
  id,
  setSnackbarSeverity,
  setSnackbarMessage,
  setSnackbarOpen,
}: CourseCardProps) => {
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(id);


  const handleOpenDeleteModal = (courseId: number) => {
    setSelectedCourseId(courseId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCourseId(null);
    setOpenDeleteModal(false);
  };


  const handleDelete = async () => {
    if (!selectedCourseId) return;

    try {
      const response = await deleteCourse({ id }).unwrap();
      setSnackbarSeverity("success");
      setSnackbarMessage(response?.message || "Course Deleted successfully");
      setSnackbarOpen(true);
    } catch (err: any) {
      console.error("Delete failed", err);
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteModal();
    }
  };


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
            src={UPLOADS + thumbnailSrc}
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
        {tags?.map((tag, idx) => (
          <Chip key={idx} label={tag} size="small" sx={{
            fontSize: "10px",
            backgroundColor: "#E2D5FF",
            color: "#452B80",

          }} />
        ))}
      </Box>
      <Link
        to={`edit/${id}`}
        style={{
          fontWeight: 600,
          fontSize: 16,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginTop: "10px",
          textDecoration: "none",
          color: "black"
        }}
      >
        {title}
      </Link>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          background: "#fff",
          "&:hover": { background: "#eee" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDeleteModal(id);
        }}
      >
        <DeleteIcon />
      </IconButton>
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
            {chapters} Chapters
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "7px", alignItems: "center" }}>
          <StarFilledIcon />
          <Typography sx={{ fontSize: "12px", color: "#666666", mt: "3px" }}>
            {rating}
          </Typography>
        </Box>
      </Box>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Course
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are about to permanently delete this course. Are you sure you
            want to delete it?
          </Typography>
          <Box display={"flex"} gap={"10px"} justifyContent={"end"} mt={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained" disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseCard;
