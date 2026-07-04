import React from "react";
import { Box, Typography } from "@mui/material";
import { ApiQuestion } from "../types";

interface SolutionProps {
    question: ApiQuestion | null;
}

const Solution: React.FC<SolutionProps> = ({ question }) => {
    return (
        <Box sx={{ p: { xs: 0.5, sm: 1 }, color: "#fff" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#ffffff !important", fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.35rem" } }}>
                Solution
            </Typography>
            <Typography sx={{ color: "#ffffff !important", opacity: 0.86, lineHeight: 1.7 }}>
                Official solution content will be displayed here once available.
            </Typography>
        </Box>
    );
};

export default Solution;
