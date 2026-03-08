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
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
                Submission History
            </Typography>

            {submissions.length === 0 ? (
                <Typography sx={{ color: "#a1a1aa", fontStyle: "italic" }}>
                    You haven't submitted any solutions for this problem yet.
                </Typography>
            ) : (
                <TableContainer sx={{ background: "transparent" }}>
                    <Table sx={{ minWidth: 400 }}>
                        <TableHead>
                            <TableRow sx={{ "& th": { color: "#71717a", borderBottom: "1px solid #27272a" } }}>
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
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
                                        "& td": { borderBottom: "1px solid #27272a", color: "#e4e4e7" },
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