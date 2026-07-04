import React from "react";
import { Box, Typography } from "@mui/material";
import { ApiQuestion } from "../types";

interface EditorialProps {
    question: ApiQuestion | null;
}

const Editorial: React.FC<EditorialProps> = ({ question }) => {
    return (
        <Box sx={{ p: { xs: 0.5, sm: 1 }, color: "#fff" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#ffffff !important", fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.35rem" } }}>
                Editorial
            </Typography>
            {question?.description ? (
                <Typography sx={{ color: "#ffffff !important", opacity: 0.86, lineHeight: 1.7 }}>
                    The editorial for this problem is currently being prepared. Check back soon for a detailed explanation and optimal approach.
                </Typography>
            ) : (
                <Typography sx={{ color: "#ffffff !important", opacity: 0.82, fontStyle: "italic" }}>
                    No editorial available for this challenge.
                </Typography>
            )}
        </Box>
    );
};

export default Editorial;
