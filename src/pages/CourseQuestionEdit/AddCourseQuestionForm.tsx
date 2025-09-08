import { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    TextField,
    Checkbox,
    Radio,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "@components/Template/RichTextEditor";
import UploadBox from "@components/Template/ui/uploadbox/UploadBox";

type QuestionType = "multiple_choice" | "single_choice" | "fill_up" | "subjective" | "blog" | "video" | "assignment" | "quiz";

interface IAddCourseQuestionFormProps {
    type: QuestionType;
    courseId: number;
    unitId: number;
    onClose: () => void;
}

export default function AddCourseQuestionForm({type, courseId, unitId, onClose}:IAddCourseQuestionFormProps) {
    // Subjective answer length options
    const subjectiveLengths = [
        { value: 'short', label: 'Short (50-100 words)' },
        { value: 'medium', label: 'Medium (100-250 words)' },
        { value: 'long', label: 'Long (250+ words)' },
    ];

    // Form state for all types
    const {
        control, register, handleSubmit, clearErrors, setError, formState: { errors }, watch, setValue
    } = useForm<any>({
        defaultValues: {
            title: '',
            text: '',
            score: 1,
            correctAnswer: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
            answerLength: 'medium',
            blogContent: '',
            video: undefined,
        },
        mode: 'onChange',
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'options' });
    const watchedOptions = watch('options');

    // For single_choice, assignment, quiz: only one correct
    useEffect(() => {
        if (["single_choice", "assignment", "quiz"].includes(type)) {
            const index = watchedOptions.findIndex((op: any) => op.isCorrect);
            if (index > -1) {
                watchedOptions.forEach((op: any, i: number) => {
                    op.isCorrect = i === index;
                });
            }
        }
    }, [watchedOptions, type]);

    // Strict validation for at least one correct option and at least 2 options (for MCQ and Single Choice)
    const validateAtLeastOneCorrect = () => {
        if (!watchedOptions || watchedOptions.length < 2) {
            setError('options', { type: 'min', message: 'At least 2 options are required' });
            return false;
        }
        const isCorrect = watchedOptions.some((o: any) => o.isCorrect);
        if (!isCorrect) {
            watchedOptions.forEach((_: any, idx: number) => setError(`options.${idx}.isCorrect`, {
                type: "custom",
                message: "At least one option must be marked as correct",
            }));
            return false;
        }
        return true;
    };

    // Handle file upload for video, with validation
    const handleVideoUpload = (files: FileList) => {
        if (!files || !files.length) {
            setError('video', { type: 'required', message: 'Video is required' });
            return;
        }
        const file = files[0];
        if (file.size > 100 * 1024 * 1024) {
            setError('video', { type: 'maxSize', message: 'File size must be less than 100MB' });
            return;
        }
        if (!file.type.startsWith('video/')) {
            setError('video', { type: 'type', message: 'Only video files are allowed' });
            return;
        }
        setValue('video', files);
        clearErrors('video');
    };

    // On submit, log all data and type
    const onSubmit: SubmitHandler<any> = (data) => {
        // MCQ and single_choice: at least 2 options, at least one correct, all filled
        if (["multiple_choice", "single_choice"].includes(type)) {
            if (!validateAtLeastOneCorrect()) return;
            for (let i = 0; i < data.options.length; i++) {
                if (!data.options[i].text || data.options[i].text.trim().length < 1) {
                    setError(`options.${i}.text`, { type: 'required', message: 'Option is required' });
                    return;
                }
            }
            if (!data.text || data.text.replace(/<[^>]+>/g, '').trim().length < 10) {
                setError('text', { type: 'minLength', message: 'Question must be at least 10 characters' });
                return;
            }
        }
        // Fill up: question and correct answer required
        if (type === 'fill_up') {
            if (!data.text || data.text.replace(/<[^>]+>/g, '').trim().length < 5) {
                setError('text', { type: 'minLength', message: 'Question must be at least 5 characters' });
                return;
            }
            if (!data.correctAnswer || data.correctAnswer.trim().length < 1) {
                setError('correctAnswer', { type: 'required', message: 'Correct answer is required' });
                return;
            }
        }
        // Subjective: title and answer length required
        if (type === 'subjective') {
            if (!data.title || data.title.trim().length < 5) {
                setError('title', { type: 'minLength', message: 'Title must be at least 5 characters' });
                return;
            }
            if (!data.answerLength) {
                setError('answerLength', { type: 'required', message: 'Answer length is required' });
                return;
            }
        }
        // Blog: min length
        if (type === 'blog') {
            if (!data.blogContent || data.blogContent.replace(/<[^>]+>/g, '').trim().length < 20) {
                setError('blogContent', { type: 'minLength', message: 'Blog content must be at least 20 characters' });
                return;
            }
        }
        // Video: file required, type/size checked in upload handler
        if (type === 'video') {
            if (!data.video || !data.video.length) {
                setError('video', { type: 'required', message: 'Video is required' });
                return;
            }
        }
        // Score: required, min 1
        if (data.score === undefined || data.score === null || data.score < 1) {
            setError('score', { type: 'min', message: 'Score must be at least 1' });
            return;
        }
        // Log the data and type
        console.log('Form submitted:', { type, ...data });
        onClose();
    };

    // Renderers for each type
    const renderOptionsInput = (single: boolean) => (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Options</Typography>
            {fields.map((field, idx) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Controller
                        control={control}
                        name={`options.${idx}.text`}
                        rules={{ required: 'Option is required', minLength: { value: 1, message: 'Option is required' } }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder={`Option ${idx + 1}`}
                                error={!!errors.options?.[idx]?.text}
                            />
                        )}
                    />
                    {errors.options?.[idx]?.text && <p style={{ color: 'red', margin: 0 }}>{String(errors.options[idx].text.message)}</p>}
                    <Controller
                        control={control}
                        name={`options.${idx}.isCorrect`}
                        render={({ field }) => (
                            single ? (
                                <Radio
                                    checked={field.value}
                                    onChange={() => {
                                        watchedOptions.forEach((_: any, i: number) => setValue(`options.${i}.isCorrect`, i === idx));
                                    }}
                                />
                            ) : (
                                <Checkbox
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )
                        )}
                    />
                    {errors.options?.[idx]?.isCorrect && <p style={{ color: 'red', margin: 0 }}>{String(errors.options[idx].isCorrect.message)}</p>}
                    {fields.length > 2 && (
                        <IconButton onClick={() => remove(idx)}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
            {errors.options && typeof errors.options.message === 'string' && <p style={{ color: 'red', margin: 0 }}>{errors.options.message}</p>}
            <Button variant="outlined" onClick={() => append({ text: '', isCorrect: false })}>
                Add Option
            </Button>
        </Box>
    );

    return (
        <Box sx={{ bg: "#fff", p: { xs: 2, sm: 3 }, borderRadius: 2, mb: 2, maxWidth: "100%" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight={600} fontSize={{ xs: 16, sm: 18 }} sx={{ wordBreak: "break-word" }}>
                    Add {type.replace("_", " ")} Question
                </Typography>
                <IconButton onClick={onClose} sx={{ ml: 1 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* MCQ */}
                {type === 'multiple_choice' && (
                    <>
                        <Controller
                            name="text"
                            control={control}
                            rules={{ required: 'Question is required', minLength: { value: 10, message: 'Question must be at least 10 characters' } }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Write question..."
                                />
                            )}
                        />
                        {errors.text && <p style={{ color: 'red', margin: '4px 0 0 0' }}>{String(errors.text.message)}</p>}
                        {renderOptionsInput(false)}
                    </>
                )}
                {/* Single Choice, Assignment, Quiz */}
                {(type === 'single_choice' || type === 'assignment' || type === 'quiz') && (
                    <>
                        <Controller
                            name="text"
                            control={control}
                            rules={{ required: 'Question is required', minLength: { value: 10, message: 'Question must be at least 10 characters' } }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Write question..."
                                />
                            )}
                        />
                        {errors.text && <p style={{ color: 'red', margin: '4px 0 0 0' }}>{String(errors.text.message)}</p>}
                        {renderOptionsInput(true)}
                    </>
                )}
                {/* Fill Ups */}
                {type === 'fill_up' && (
                    <>
                        <Controller
                            name="text"
                            control={control}
                            rules={{ required: 'Question is required', minLength: { value: 5, message: 'Question must be at least 5 characters' } }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Write question..."
                                />
                            )}
                        />
                        {errors.text && <p style={{ color: 'red', margin: '4px 0 0 0' }}>{String(errors.text.message)}</p>}
                        <Controller
                            name="correctAnswer"
                            control={control}
                            rules={{ required: 'Correct answer is required' }}
                            render={({ field }) => (
                                <TextField
                                    sx={{ mt: 2 }}
                                    label="Correct Answer"
                                    fullWidth
                                    {...field}
                                    onChange={(e) => {
                                        clearErrors("correctAnswer");
                                        field.onChange(e.target.value);
                                    }}
                                />
                            )}
                        />
                        {errors.correctAnswer && <Typography color="error">{String(errors.correctAnswer.message)}</Typography>}
                    </>
                )}
                {/* Subjective */}
                {type === 'subjective' && (
                    <>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Question Title"
                                    fullWidth
                                    error={!!errors.title}
                                />
                            )}
                        />
                        {errors.title && <p style={{ color: 'red', margin: 0 }}>{String(errors.title.message)}</p>}
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Answer Length</InputLabel>
                            <Controller
                                name="answerLength"
                                control={control}
                                rules={{ required: 'Answer length is required' }}
                                render={({ field }) => (
                                    <Select {...field} label="Answer Length" error={!!errors.answerLength}>
                                        {subjectiveLengths.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                        {errors.answerLength && <Typography color="error">{String(errors.answerLength.message)}</Typography>}
                    </>
                )}
                {/* Blog */}
                {type === 'blog' && (
                    <>
                        <Controller
                            name="blogContent"
                            control={control}
                            rules={{ required: 'Blog content is required', minLength: { value: 20, message: 'Blog content must be at least 20 characters' } }}
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Write your blog content here..."
                                />
                            )}
                        />
                        {errors.blogContent && <p style={{ color: 'red', margin: 0 }}>{String(errors.blogContent.message)}</p>}
                    </>
                )}
                {/* Video */}
                {type === 'video' && (
                    <>
                        <UploadBox
                            icon={<span role="img" aria-label="video">🎬</span>}
                            coloredTitle={"Upload Video"}
                            title={"(MP4, max 100MB)"}
                            description={"Click or drag to upload a video file."}
                            onFilesDropped={handleVideoUpload}
                        />
                        {errors.video && <Typography color="error">{String(errors.video.message)}</Typography>}
                        {watch('video')?.[0] && (
                            <Typography color="primary" sx={{ mt: 1 }}>
                                Selected: {watch('video')[0].name}
                            </Typography>
                        )}
                    </>
                )}
                {/* Score (for all except video) */}
                {type !== 'video' && (
                    <>
                        <TextField
                            sx={{ mt: 2 }}
                            type="number"
                            label="Score"
                            {...register("score", {
                                required: "Score is required",
                                min: { value: 1, message: "Score must be at least 1" },
                            })}
                            error={!!errors.score}
                        />
                        {errors.score && <p style={{ color: 'red', margin: 0 }}>{String(errors.score.message)}</p>}
                    </>
                )}
                <Button fullWidth sx={{ mt: 3, mb: { xs: 2, sm: 0 } }} type="submit" variant="contained">
                    Save Question
                </Button>
            </form>
        </Box>
    );
}
