import React from "react";
import { Box, Typography } from "@mui/material";
import { ApiQuestion } from "../types";

interface EditorialProps {
    question: ApiQuestion | null;
}

const Editorial: React.FC<EditorialProps> = ({ question }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#fff" }}>
                Editorial
            </Typography>
            {question?.description ? (
                <Typography sx={{ color: "#a1a1aa" }}>
                    The editorial for this problem is currently being prepared. Check back soon for a detailed explanation and optimal approach.
                </Typography>
            ) : (
                <Typography sx={{ color: "#a1a1aa", fontStyle: "italic" }}>
                    No editorial available for this challenge.
                </Typography>
            )}
        </Box>
    );
};

export default Editorial;