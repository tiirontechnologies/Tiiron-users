import React from "react";
import { Box, Grid } from "@mui/material";

import { Header, ProblemPanel, EditorPanel } from "./components";

const CodingQuestionPage: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f0f12",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          p: 1.5,
          gap: 1.5,
          backgroundColor: "#0f0f12",
        }}
      >
        <Grid container sx={{ flex: 1, overflow: "hidden", minHeight: 0, }} spacing={1.5}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              overflow: "hidden",
              minHeight: 0,
              order: { xs: 1, md: 1 },
              height: "100vh",
              overflowY: "scroll"
            }}
          >
            <ProblemPanel />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minHeight: 0,
              maxHeight: "100vh",
              order: { xs: 2, md: 2 }
            }}
          >
            <EditorPanel />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CodingQuestionPage;
