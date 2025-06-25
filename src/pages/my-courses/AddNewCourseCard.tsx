// components/AddNewCourseCard.tsx
import { Box, Chip, Divider } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React from "react";

type Props = {
  image: string | null;
  setImage: (img: string | null) => void;
  title: string;
  setTitle: (val: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  tagInput: string;
  setTagInput: (val: string) => void;
};

const AddNewCourseCard = ({
  image,
  setImage,
  title,
  setTitle,
  tags,
  setTags,
  tagInput,
  setTagInput,
}: Props) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
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
      {/* Image Upload */}
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
      >
        {image ? (
          <img
            src={image}
            alt="Course"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            <AddRoundedIcon sx={{ color: "#452B80", fontSize: 40 }} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </>
        )}
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
        {/* Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {tags.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              size="small"
              onDelete={() => setTags(tags.filter((_, index) => index !== i))}
            />
          ))}
        </Box>

        {/* Tag Input */}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag"
          style={{
            width: "100%",
            padding: "2px 0",
            fontWeight: 500,
            fontSize: 16,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            marginTop: 6,
            marginBottom: 12,
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid #6A42AB";
            e.currentTarget.style.borderRadius = "4px";
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.padding = "4px 8px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "none";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.padding = "2px 0";
          }}
        />

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add New Course"
          style={{
            width: "100%",
            fontSize: 16,
            fontWeight: 500,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            padding: "4px 0",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid #6A42AB";
            e.currentTarget.style.borderRadius = "4px";
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.padding = "6px 8px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "none";
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.padding = "4px 0";
          }}
        />
      </Box>

      {/* Bottom Box placeholder */}
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
    </Box>
  );
};

export default AddNewCourseCard;
