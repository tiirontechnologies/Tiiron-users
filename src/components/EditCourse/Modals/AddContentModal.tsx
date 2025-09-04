import React, { useState } from 'react';
import { Box, Button, Modal, Typography, Paper, TextField, MenuItem } from "@mui/material";
import { 
    CloudUpload as CloudUploadIcon, 
    Code as CodeIcon, 
    Quiz as QuizIcon,
    ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { QuestionTypeSelector } from '@components/EditCourse/Components/QuestionTypeSelector';
import { useForm, Controller } from "react-hook-form";
import { AddCourseQuestionForm } from '@components/EditCourse/Components/AddCourseQuestionForm';

interface AddContentModalProps {
    open: boolean;
    unitId: number | null;
    onClose: () => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
    open,
    unitId,
    onClose
}) => {
    const [contentType, setContentType] = useState<'video' | 'block' | 'code' | null>(null);
    const [selectedQuestionType, setSelectedQuestionType] = useState<'multiple_choice' | 'single_choice' | 'fill_up' | null>(null);

    const videoFormMethods = useForm({
        defaultValues: {
            video: null,
            description: ''
        },
        mode: 'onChange'
    });

    const codeFormMethods = useForm({
        defaultValues: {
            code: '',
            language: 'javascript',
            description: ''
        },
        mode: 'onChange'
    });

    const handleClose = () => {
        setContentType(null);
        setSelectedQuestionType(null);
        onClose();
    };

    const renderContentOptions = () => (
        <Box sx={{
            display: "flex",
            gap: 2,
            mx: "auto"
        }}>
            <Paper
                elevation={0}
                onClick={() => setContentType('video')}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                        borderColor: "#7e22ce",
                        bgcolor: "#faf5ff",
                        transform: "translateY(-2px)"
                    }
                }}
            >
                <CloudUploadIcon sx={{ fontSize: 48, color: '#7e22ce' }} />
                <Box>
                    <Typography variant="h6" gutterBottom>Video Content</Typography>
                    <Typography color="text.secondary">Upload video content (MP4 format only)</Typography>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                onClick={() => setContentType('block')}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                        borderColor: "#7e22ce",
                        bgcolor: "#faf5ff",
                        transform: "translateY(-2px)"
                    }
                }}
            >
                <QuizIcon sx={{ fontSize: 48, color: '#7e22ce' }} />
                <Box>
                    <Typography variant="h6" gutterBottom>Question Block</Typography>
                    <Typography color="text.secondary">Create interactive questions and assessments</Typography>
                </Box>
            </Paper>

            <Paper
                elevation={0}
                onClick={() => setContentType('code')}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    transition: "all 0.2s",
                    "&:hover": {
                        borderColor: "#7e22ce",
                        bgcolor: "#faf5ff",
                        transform: "translateY(-2px)"
                    }
                }}
            >
                <CodeIcon sx={{ fontSize: 48, color: '#7e22ce' }} />
                <Box>
                    <Typography variant="h6" gutterBottom>Code Block</Typography>
                    <Typography color="text.secondary">Add code snippets with syntax highlighting</Typography>
                </Box>
            </Paper>
        </Box>
    );

    const renderContentForm = () => {
        switch (contentType) {
            case 'video':
                return (
                    <Box sx={{ p: 3 }}>
                        <form onSubmit={videoFormMethods.handleSubmit((data) => {
                            console.log("Video upload form submitted", data);
                            handleClose();
                        })}>
                            <Box sx={{
                                border: '2px dashed #7e22ce',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                mb: 3,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: '#faf5ff'
                                }
                            }}>
                                <input
                                    type="file"
                                    accept="video/mp4"
                                    id="video-upload"
                                    style={{ display: 'none' }}
                                    {...videoFormMethods.register('video', {
                                        required: 'Please select a video file',
                                        validate: {
                                            isMP4: (files) => {
                                                if (!files?.length) return true;
                                                const file = files[0];
                                                if (file.type !== 'video/mp4') return 'Only MP4 videos are allowed';
                                                if (file.size > 100 * 1024 * 1024) return 'File size must be less than 100MB';
                                                return true;
                                            }
                                        }
                                    })}
                                />
                                <label htmlFor="video-upload">
                                    <CloudUploadIcon sx={{ fontSize: 48, color: '#7e22ce', mb: 1 }} />
                                    <Typography variant="h6" gutterBottom>Click to Upload Video</Typography>
                                    <Typography color="text.secondary" gutterBottom>Only MP4 format supported (max 100MB)</Typography>
                                    {videoFormMethods.watch('video') && (
                                        <Typography color="primary" sx={{ mt: 1 }}>
                                            Selected: {videoFormMethods.watch('video')[0]?.name}
                                        </Typography>
                                    )}
                                    {videoFormMethods.formState.errors.video && (
                                        <Typography color="error" sx={{ mt: 1 }}>
                                            {videoFormMethods.formState.errors.video?.message?.toString()}
                                        </Typography>
                                    )}
                                </label>
                            </Box>
                            <Controller
                                control={videoFormMethods.control}
                                name="description"
                                rules={{
                                    required: 'Video description is required',
                                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Video Description"
                                        placeholder="Enter a description for the video..."
                                        multiline
                                        rows={3}
                                        fullWidth
                                        error={!!videoFormMethods.formState.errors.description}
                                        helperText={videoFormMethods.formState.errors.description?.message}
                                        sx={{ mb: 3 }}
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={!videoFormMethods.formState.isValid || !videoFormMethods.formState.isDirty}
                            >
                                Upload Video
                            </Button>
                        </form>
                    </Box>
                );
            case 'block':
                if (!selectedQuestionType) {
                    return (
                        <Box sx={{ p: 3 }}>
                            <QuestionTypeSelector onSelect={(type) => setSelectedQuestionType(type)} />
                        </Box>
                    );
                }

                return (
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Button 
                                onClick={() => setSelectedQuestionType(null)} 
                                startIcon={<ArrowBackIcon />}
                            >
                                Back to Question Types
                            </Button>
                        </Box>
                        <AddCourseQuestionForm
                            type={selectedQuestionType}
                            unitId={unitId!}
                            onClose={() => {
                                setSelectedQuestionType(null);
                                handleClose();
                            }}
                        />
                    </Box>
                );
            case 'code':
                return (
                    <Box sx={{ p: 3 }}>
                        <form onSubmit={codeFormMethods.handleSubmit((data) => {
                            console.log("Code submitted:", data);
                            handleClose();
                        })}>
                            <Controller
                                control={codeFormMethods.control}
                                name="code"
                                rules={{
                                    required: 'Code is required',
                                    minLength: { value: 10, message: 'Code must be at least 10 characters' },
                                    validate: {
                                        hasCode: (value) => {
                                            if (value.trim().length < 10) return 'Code must contain actual content';
                                            return true;
                                        }
                                    }
                                }}
                                render={({ field }) => (
                                    <Box>
                                        <TextField
                                            {...field}
                                            multiline
                                            rows={10}
                                            fullWidth
                                            label="Code"
                                            placeholder="Enter your code here..."
                                            error={!!codeFormMethods.formState.errors.code}
                                            helperText={codeFormMethods.formState.errors.code?.message}
                                            sx={{
                                                mb: 3,
                                                fontFamily: 'Consolas, Monaco, monospace',
                                                '& .MuiInputBase-input': {
                                                    fontFamily: 'Consolas, Monaco, monospace'
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            />
                            <Controller
                                control={codeFormMethods.control}
                                name="language"
                                rules={{
                                    required: 'Programming language is required'
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Programming Language"
                                        fullWidth
                                        error={!!codeFormMethods.formState.errors.language}
                                        helperText={codeFormMethods.formState.errors.language?.message}
                                        sx={{ mb: 3 }}
                                        SelectProps={{
                                            native: false,
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        maxHeight: 300
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        {[
                                            { value: 'javascript', label: 'JavaScript' },
                                            { value: 'typescript', label: 'TypeScript' },
                                            { value: 'python', label: 'Python' },
                                            { value: 'java', label: 'Java' },
                                            { value: 'csharp', label: 'C#' },
                                            { value: 'cpp', label: 'C++' },
                                            { value: 'php', label: 'PHP' },
                                            { value: 'ruby', label: 'Ruby' },
                                            { value: 'swift', label: 'Swift' },
                                            { value: 'go', label: 'Go' },
                                            { value: 'rust', label: 'Rust' },
                                            { value: 'kotlin', label: 'Kotlin' },
                                            { value: 'scala', label: 'Scala' },
                                            { value: 'html', label: 'HTML' },
                                            { value: 'css', label: 'CSS' },
                                            { value: 'sql', label: 'SQL' }
                                        ].map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                control={codeFormMethods.control}
                                name="description"
                                rules={{
                                    required: 'Description is required',
                                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Code Description"
                                        placeholder="Explain what this code does..."
                                        multiline
                                        rows={3}
                                        fullWidth
                                        error={!!codeFormMethods.formState.errors.description}
                                        helperText={codeFormMethods.formState.errors.description?.message}
                                        sx={{ mb: 3 }}
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={!codeFormMethods.formState.isValid || !codeFormMethods.formState.isDirty}
                            >
                                Save Code
                            </Button>
                        </form>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-content-modal"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: "1000px",
                    maxHeight: "90vh",
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 3,
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "4px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                        "&:hover": {
                            background: "#555"
                        }
                    }
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" component="h2">
                        {contentType ? `Add ${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content` : 'Select Content Type'}
                    </Typography>
                    {contentType && (
                        <Button onClick={() => setContentType(null)}>
                            Back to Selection
                        </Button>
                    )}
                </Box>

                {!contentType ? renderContentOptions() : renderContentForm()}
            </Box>
        </Modal>
    );
};
