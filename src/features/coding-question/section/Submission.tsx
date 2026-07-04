import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import { ApiQuestion } from "../types";

interface SubmissionProps {
    question: ApiQuestion | null;
}

const Submission: React.FC<SubmissionProps> = ({ question }) => {
    const submissions = question?.practices || [];

    return (
        <Box sx={{ p: { xs: 0.5, sm: 1 }, color: "#fff" }}>
            <Typography variant="h5" sx={{ mb: 2, color: "#ffffff !important", fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.35rem" } }}>
                Submission History
            </Typography>

            {submissions.length === 0 ? (
                <Box
                    sx={{
                        p: 2,
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                    }}
                >
                <Typography sx={{ color: "#ffffff !important", opacity: 0.82, fontStyle: "italic" }}>
                    You haven't submitted any solutions for this problem yet.
                </Typography>
                </Box>
            ) : (
                <TableContainer
                    sx={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "10px",
                    }}
                >
                    <Table sx={{ minWidth: 400 }}>
                        <TableHead>
                            <TableRow sx={{ "& th": { color: "#ffffff !important", borderBottom: "1px solid rgba(255,255,255,0.08)", fontWeight: 800 } }}>
                                <TableCell>Status</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Time Spent</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...submissions].reverse().map((sub) => (
                                <TableRow
                                    key={sub.id}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.04)" },
                                        "& td": { borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#ffffff !important", fontWeight: 600 },
                                        "&:last-child td": { borderBottom: 0 },
                                    }}
                                >
                                    <TableCell>
                                        <Chip
                                            label={sub.isCorrect ? "Accepted" : "Wrong Answer"}
                                            size="small"
                                            sx={{
                                                backgroundColor: sub.isCorrect ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                                color: sub.isCorrect ? "#22c55e" : "#ef4444",
                                                fontWeight: 600,
                                                border: `1px solid ${sub.isCorrect ? "#22c55e" : "#ef4444"}`,
                                                borderRadius: "7px",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{sub.score}</TableCell>
                                    <TableCell>{sub.timeSpent ? `${sub.timeSpent}s` : "N/A"}</TableCell>
                                    <TableCell>
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default Submission;
