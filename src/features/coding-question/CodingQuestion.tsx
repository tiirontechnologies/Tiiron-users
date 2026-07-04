import React from "react";
import { Box } from "@mui/material";

import { Header, ProblemPanel, EditorPanel } from "./components";

const CodingQuestionPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #101114 0%, #0d0e11 42%, #111215 100%)",
        color: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          minHeight: 0,
          overflow: { xs: "auto", md: "hidden" },
          p: { xs: 1, sm: 1.25, md: 1.5 },
          background:
            "radial-gradient(circle at top left, rgba(79, 57, 246, 0.10), transparent 28%), #0d0e11",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 1.25, md: 1.5 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              minWidth: 0,
              minHeight: { xs: 420, md: 0 },
              display: "flex",
              overflow: "hidden",
            }}
          >
            <ProblemPanel />
          </Box>

          <Box
            sx={{
              minWidth: 0,
              minHeight: { xs: 560, md: 0 },
              display: "flex",
              overflow: "hidden",
            }}
          >
            <EditorPanel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodingQuestionPage;
