import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import AddQuestionForm from "@pages/question-bank-edit/AddQuestionForm";
import { useParams } from 'react-router-dom';

interface AddQuestionModalProps {
    open: boolean;
    unitId: number | null;
    onClose: () => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
    open,
    unitId,
    onClose
}) => {
    const [questionType, setQuestionType] = useState<"multiple_choice" | "single_choice" | "fill_up" | "">("");

    const handleClose = () => {
        setQuestionType("");
        onClose();
    };
    const { courseId } = useParams();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Question
                </Typography>
                {!questionType && (
                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button variant="outlined" onClick={() => setQuestionType("multiple_choice")}>
                            Multiple Choice
                        </Button>
                        <Button variant="outlined" onClick={() => setQuestionType("single_choice")}>
                            Single Choice
                        </Button>
                        <Button variant="outlined" onClick={() => setQuestionType("fill_up")}>
                            Fill Up
                        </Button>
                    </Box>
                )}
                {questionType && unitId && (
                    <Box sx={{ mt: 2 }}>
                        <AddQuestionForm
                            type={questionType}
                            unit={unitId}
                            courseId={Number(courseId!)}
                            onClose={handleClose}
                        />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};
