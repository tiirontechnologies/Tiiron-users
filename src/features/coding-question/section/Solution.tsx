import React from "react";
import { Box, Typography } from "@mui/material";
import { ApiQuestion } from "../types";

interface SolutionProps {
    question: ApiQuestion | null;
}

const Solution: React.FC<SolutionProps> = ({ question }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#fff" }}>
                Solution
            </Typography>
            <Typography sx={{ color: "#a1a1aa" }}>
                Official solution content will be displayed here once available.
            </Typography>
        </Box>
    );
};

export default Solution;