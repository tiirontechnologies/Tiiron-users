import { Box, Typography } from "@mui/material";
import React from "react";


interface CreateContentLayoutProps {
  heading: string;
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
}

const CreateContentLayout = ({
  heading,
  sidebarContent,
  mainContent,
}: CreateContentLayoutProps) => {
  return (
    <Box sx={{ display: "flex", gap: "24px", width: "100%" }}>
      {/* Sidebar Panel */}
      <Box
        sx={{ flex: 0.4, bgcolor: "#F9FAFA", borderRadius: "16px", p: "16px" }}
      >
        <Typography sx={{ mb: "24px", fontSize: "16px", py: "16px" }}>
          {heading}
        </Typography>
        {sidebarContent}
      </Box>

      {/* Main Panel */}
      <Box sx={{ flex: 1 }}>{mainContent}</Box>
    </Box>
  );
};

export default CreateContentLayout;


