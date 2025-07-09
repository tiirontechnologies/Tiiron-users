import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "289px",
        right: 0,
        height: "84px",
        bgcolor: "#fff",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "32px",
        borderBottom: "1px solid #D9D9D9",
      }}
    >
      <Typography
        sx={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}
      >
        Course Name /{" "}
        <Typography
          component="span"
          sx={{ fontWeight: "400", fontSize: "16px", color: "#000000" }}
        >
          Chapter 1 - Lesson 1
        </Typography>
      </Typography>
      <Typography
        sx={{ fontSize: "24px", fontWeight: "600", color: "#000000" }}
      >
        25/30{" "}
        <Typography
          component="span"
          sx={{ fontSize: "18px", fontWeight: "600", color: "#000000" }}
        >
          Points
        </Typography>
      </Typography>
    </Box>
  );
};

export default Header;
