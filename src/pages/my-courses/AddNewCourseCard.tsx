// components/AddNewCourseCard.tsx
import { Alert, Box, Button, Chip, Divider, Modal, Snackbar, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ICreateCourse } from "types/course.types";
import { useCreateCourseMutation } from "../../api/api";

type Props = {
  image: string | null;
  setImage: (img: string | null) => void;
  title: string;
  setTitle: (val: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagInput: string;
  setTagInput: (val: string) => void;
};

const AddNewCourseCard = ({
  tags,
  setTags,
  tagInput,
  setTagInput,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateCourse>({ mode: "onBlur" });

  const handleAddTag = (): void => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data: ICreateCourse) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());

      // Append image only if present
      if (data.image) {
        formData.append("image", data.image);
      }

      // Append each tag
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      // 🔥 Send data to server via RTK hook
      const response = await createCourse({ body: formData }).unwrap();
      setSnackbarSeverity("success");
      setSnackbarMessage(response?.message || "Course Created successfully");
      setSnackbarOpen(true);
      setOpen(false);
      // ✅ Success handler
      console.log("Course created successfully:", response);
    } catch (error: any) {
      // ❌ Error handler
      console.error("Error creating course:", error);
      const errorMessage =
        error?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

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
        onClick={() => setOpen(true)}
      >
        <AddRoundedIcon sx={{ color: "#452B80", fontSize: 40 }} />
      </Box>

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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
            Add Course
          </Typography>

          <Box
            component="form"
            sx={{ mt: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Course Name"
              variant="outlined"
              margin="normal"
              {...register("title", {
                required: "Course name is required",
                minLength: { value: 2, message: "Minimum 2 characters required" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              variant="outlined"
              margin="normal"
              {...register("price", {
                valueAsNumber: true,
                validate: (value) => parseInt(value) > 0 || "Price must be greater than 0",
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              fullWidth
              label="Course Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Controller
              name="image"
              control={control}
              rules={{
                validate: {
                  acceptedFormats: (file) => {
                    if (!file) return true;
                    const isValid =
                      file.type === "image/png" || file.type === "image/jpeg";
                    return isValid || "Only JPG/PNG files are allowed";
                  },
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file); // Send single File, not FileList
                    }}
                    style={{ marginTop: 16 }}
                  />
                  {errors.image && (
                    <Typography variant="body2" color="error" mt={1}>
                      {errors.image.message}
                    </Typography>
                  )}
                </>
              )}
            />


            <TextField
              fullWidth
              label="Add Tag"
              variant="outlined"
              margin="normal"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter or , to add"
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                />
              ))}
            </Box>

            <Box display="flex" justifyContent="end" gap="10px" mt={3}>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddNewCourseCard;
