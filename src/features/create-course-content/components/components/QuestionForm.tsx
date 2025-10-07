import { useState } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    TextField, 
    IconButton, 
    Radio, 
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper
} from '@mui/material';
import { ArrowBack, CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import RichTextEditor from '@components/ui/RichTextEditor';
import { ContentType } from '..';

interface QuestionFormProps {
    type: ContentType;
    unitId?: number;
    onBack: () => void;
    onClose: () => void;
}

type AnswerLength = 'short' | 'medium' | 'long';

interface FormData {
    title: string;
    text: string;
    description: string;
    score: number;
    options?: Array<{ text: string; isCorrect: boolean }>;
    correctAnswer?: string;
    answerLength?: AnswerLength;
    content?: string;
    video?: FileList;
}

const answerLengths: { value: AnswerLength; label: string }[] = [
    { value: 'short', label: 'Short (50-100 words)' },
    { value: 'medium', label: 'Medium (100-250 words)' },
    { value: 'long', label: 'Long (250+ words)' }
];

const QuestionForm = ({ type, unitId, onBack, onClose }: QuestionFormProps) => {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
        setValue,
        clearErrors
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            title: '',
            text: '',
            description: '',
            score: 1,
            options: type === 'mcq' || type === 'single_choice' ? [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ] : undefined,
            correctAnswer: type === 'fill_up' ? '' : undefined,
            answerLength: type === 'subjective' ? 'medium' : undefined,
            content: type === 'blog' ? '' : undefined,
            video: undefined
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options'
    });

    const watchedOptions = watch('options');

    const validateForm = async (data: FormData) => {
        console.log('Form submitted with:', { type, unitId, ...data });
        // TODO: Add API call to save content
        onClose();
    };

    const renderQuestionInput = () => (
        <Box sx={{ mb: 3 }}>
            <Controller
                name="text"
                control={control}
                rules={{
                    required: 'Question text is required',
                    validate: {
                        minLength: (value) => value.length >= 10 || 'Question must be at least 10 characters',
                        hasContent: (value) => {
                            const textOnly = value.replace(/<[^>]*>/g, '').trim();
                            return textOnly.length >= 10 || 'Question must contain actual content';
                        }
                    }
                }}
                render={({ field }) => (
                    <>
                        <Typography variant="subtitle1" gutterBottom>Question</Typography>
                        <RichTextEditor
                            value={field.value}
                            onChange={(value) => {
                                clearErrors('text');
                                field.onChange(value);
                            }}
                            placeholder="Write your question here..."
                        />
                        {errors.text && (
                            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                {errors.text.message}
                            </Typography>
                        )}
                    </>
                )}
            />
        </Box>
    );

    const renderOptionsInput = () => (
        type === 'mcq' || type === 'single_choice' || type === 'assignment' || type === 'quiz' ? (
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>Options</Typography>
                {fields.map((field, index) => (
                    <Box
                        key={field.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2
                        }}
                    >
                        <Controller
                            control={control}
                            name={`options.${index}.text`}
                            rules={{
                                required: 'Option text is required',
                                validate: {
                                    unique: (value) => {
                                        const options = watchedOptions || [];
                                        return options.filter(opt => opt.text === value).length <= 1 || 'Duplicate options are not allowed'
                                    }
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder={`Option ${index + 1}`}
                                    error={!!errors.options?.[index]?.text}
                                    helperText={errors.options?.[index]?.text?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={`options.${index}.isCorrect`}
                            render={({ field: { value, onChange } }) => (
                                type === 'mcq' ? (
                                    <Checkbox
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                        }}
                                    />
                                ) : (
                                    <Radio
                                        checked={value}
                                        onChange={(e) => {
                                            // Uncheck all other options for single choice
                                            watchedOptions?.forEach((_, idx) => {
                                                setValue(`options.${idx}.isCorrect`, idx === index);
                                            });
                                        }}
                                    />
                                )
                            )}
                        />
                        {fields.length > 2 && (
                            <IconButton onClick={() => remove(index)}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    onClick={() => append({ text: '', isCorrect: false })}
                >
                    Add Option
                </Button>
            </Box>
        ) : null
    );

    const renderSubjectiveInput = () => (
        type === 'subjective' ? (
            <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Expected Answer Length</InputLabel>
                    <Controller
                        name="answerLength"
                        control={control}
                        rules={{ required: 'Please select expected answer length' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Expected Answer Length"
                                error={!!errors.answerLength}
                            >
                                {answerLengths.map(({ value, label }) => (
                                    <MenuItem key={value} value={value}>{label}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                </FormControl>
            </Box>
        ) : null
    );

    const renderBlogInput = () => (
        type === 'blog' ? (
            <Box sx={{ mb: 3 }}>
                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: 'Blog content is required',
                        validate: {
                            minLength: (value) => value.length >= 50 || 'Blog content must be at least 50 characters'
                        }
                    }}
                    render={({ field }) => (
                        <>
                            <Typography variant="subtitle1" gutterBottom>Blog Content</Typography>
                            <RichTextEditor
                                value={field.value}
                                onChange={(value) => {
                                    clearErrors('content');
                                    field.onChange(value);
                                }}
                                placeholder="Write your blog content here..."
                            />
                            {errors.content && (
                                <Typography color="error" variant="caption">
                                    {errors.content.message}
                                </Typography>
                            )}
                        </>
                    )}
                />
            </Box>
        ) : null
    );

    const renderVideoInput = () => (
        type === 'video' ? (
            <Box sx={{ mb: 3 }}>
                <Paper
                    elevation={0}
                    sx={{
                        border: '2px dashed #7e22ce',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        mb: 2,
                        cursor: 'pointer'
                    }}
                >
                    <input
                        type="file"
                        accept="video/mp4"
                        id="video-upload"
                        style={{ display: 'none' }}
                        {...register('video', {
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
                        <Typography variant="h6" gutterBottom>
                            Click to Upload Video
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            Only MP4 format supported (max 100MB)
                        </Typography>
                        {watch('video')?.[0] && (
                            <Typography color="primary" sx={{ mt: 1 }}>
                                Selected: {watch('video')[0].name}
                            </Typography>
                        )}
                        {errors.video && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {errors.video.message?.toString()}
                            </Typography>
                        )}
                    </label>
                </Paper>
            </Box>
        ) : null
    );

    const renderFillUpInput = () => (
        type === 'fill_up' ? (
            <Box sx={{ mb: 3 }}>
                <Controller
                    name="correctAnswer"
                    control={control}
                    rules={{
                        required: 'Correct answer is required',
                        minLength: {
                            value: 1,
                            message: 'Answer cannot be empty'
                        }
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Correct Answer"
                            fullWidth
                            error={!!errors.correctAnswer}
                            helperText={errors.correctAnswer?.message}
                        />
                    )}
                />
            </Box>
        ) : null
    );

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <Button
                    onClick={onBack}
                    startIcon={<ArrowBack />}
                >
                    Back
                </Button>
                <Typography variant="h5">
                    {type === 'mcq' ? 'Multiple Choice Question' :
                     type === 'single_choice' ? 'Single Choice Question' :
                     type === 'fill_up' ? 'Fill in the Blank' :
                     type === 'subjective' ? 'Subjective Question' :
                     type === 'blog' ? 'Blog Content' :
                     type === 'video' ? 'Video Content' :
                     type === 'assignment' ? 'Assignment' :
                     'Quiz'}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit(validateForm)}>
                <Box sx={{ mb: 3 }}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Title is required',
                            minLength: {
                                value: 5,
                                message: 'Title must be at least 5 characters'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                </Box>

                {['mcq', 'single_choice', 'fill_up', 'subjective', 'assignment', 'quiz'].includes(type) && renderQuestionInput()}
                {renderOptionsInput()}
                {renderSubjectiveInput()}
                {renderBlogInput()}
                {renderVideoInput()}
                {renderFillUpInput()}

                <Box sx={{ mb: 3 }}>
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: 'Description is required',
                            minLength: {
                                value: 10,
                                message: 'Description must be at least 10 characters'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Controller
                        name="score"
                        control={control}
                        rules={{
                            required: 'Score is required',
                            min: {
                                value: 1,
                                message: 'Score must be at least 1'
                            },
                            max: {
                                value: 100,
                                message: 'Score cannot exceed 100'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Score"
                                type="number"
                                fullWidth
                                error={!!errors.score}
                                helperText={errors.score?.message}
                                inputProps={{ min: 1, max: 100 }}
                            />
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid || !isDirty}
                    >
                        Save Content
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default QuestionForm;
