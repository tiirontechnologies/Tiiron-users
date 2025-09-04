import { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    TextField,
    Checkbox,
    Radio,
} from "@mui/material";
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "@components/Template/RichTextEditor";

type QuestionType = "multiple_choice" | "single_choice" | "fill_up";

interface IAddCourseQuestionFormProps {
    type: QuestionType;
    unitId: number;
    onClose: () => void;
}

interface ICreateCourseQuestion {
    text: string;
    score: number;
    correctAnswer?: string;
    options?: Array<{
        text: string;
        isCorrect: boolean;
    }>;
}

export function AddCourseQuestionForm({
    type,
    unitId,
    onClose,
}: IAddCourseQuestionFormProps) {
    const {
        control,
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors, isValid, isDirty },
        watch,
    } = useForm<ICreateCourseQuestion>({
        defaultValues: {
            text: "",
            score: 1,
            correctAnswer: "",
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
        mode: "onChange"
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const watchedOptions = useWatch({ control, name: "options" });

    useEffect(() => {
        if (type === "single_choice") {
            const index = watchedOptions.findIndex((op: any) => op.isCorrect);
            if (index > -1) {
                watchedOptions.forEach((op: any, i: number) => {
                    op.isCorrect = i === index;
                });
            }
        }
    }, [watchedOptions, type]);

    const onSubmit: SubmitHandler<ICreateCourseQuestion> = async (data) => {
        const payload = {
            text: data.text,
            type,
            score: Number(data.score),
            unitId: unitId,
            ...(type === "fill_up" 
                ? { correctAnswer: data.correctAnswer }
                : { options: data.options }
            )
        };

        console.log("Question form submitted:", payload);
        onClose();
    };

    const validateAtLeastOneCorrect = () => {
        const isCorrect = watchedOptions.some((o: any) => o.isCorrect);
        if (!isCorrect) {
            watchedOptions.forEach((_: any, idx: number) =>
                setError(`options.${idx}.isCorrect`, {
                    type: "custom",
                    message: "Mark at least one as correct",
                })
            );
            return false;
        }
        return true;
    };

    return (
        <Box sx={{ bg: "#fff", borderRadius: 2 }}>
            <form
                onSubmit={handleSubmit((data) => {
                    if (type !== "fill_up" && !validateAtLeastOneCorrect()) return;
                    onSubmit(data);
                })}
                noValidate
            >
                {/* Question */}
                <Typography mb={1}>Question:</Typography>
                <Controller
                    name="text"
                    control={control}
                    rules={{ 
                        required: "Question is required",
                        validate: {
                            minLength: (value) => value.length >= 10 || "Question must be at least 10 characters",
                            hasActualContent: (value) => {
                                const textOnly = value.replace(/<[^>]*>/g, '').trim();
                                return textOnly.length >= 10 || "Question must contain actual content";
                            }
                        }
                    }}
                    render={({ field }) => (
                        <Box sx={{ mb: 3 }}>
                            <RichTextEditor
                                value={field.value}
                                onChange={(value) => {
                                    clearErrors("text");
                                    field.onChange(value);
                                }}
                                placeholder="Write your question here..."
                            />
                            {errors.text && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {errors.text.message}
                                </Typography>
                            )}
                        </Box>
                    )}
                />

                {/* Score */}
                <Controller
                    name="score"
                    control={control}
                    rules={{
                        required: "Score is required",
                        min: { value: 1, message: "Score must be greater than 0" },
                        max: { value: 100, message: "Score cannot exceed 100" }
                    }}
                    render={({ field }) => (
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                {...field}
                                type="number"
                                label="Score"
                                fullWidth
                                error={!!errors.score}
                                helperText={errors.score?.message}
                                inputProps={{ min: 1, max: 100 }}
                            />
                        </Box>
                    )}
                />
                {errors.score && (
                    <Typography color="error">{errors.score.message}</Typography>
                )}

                {/* Options Section */}
                {type !== "fill_up" && (
                    <Box mt={3}>
                        <Typography mb={1}>Options:</Typography>
                        {fields.map((field, idx) => (
                            <Box
                                key={field.id}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <Controller
                                    control={control}
                                    name={`options.${idx}.text`}
                                    rules={{ 
                                        required: "Option is required",
                                        minLength: { value: 1, message: "Option cannot be empty" },
                                        validate: {
                                            unique: (value) => {
                                                const options = watch('options');
                                                const duplicates = options.filter(opt => opt.text === value);
                                                return duplicates.length <= 1 || "Duplicate options are not allowed";
                                            }
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            placeholder={`Option ${idx + 1}`}
                                            fullWidth
                                            error={!!errors?.options?.[idx]?.text}
                                            helperText={errors?.options?.[idx]?.text?.message}
                                            onChange={(e) => {
                                                clearErrors(`options.${idx}.text`);
                                                clearErrors(`options.${idx}.isCorrect`);
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={`options.${idx}.isCorrect`}
                                    render={({ field }) =>
                                        type === "multiple_choice" ? (
                                            <Checkbox
                                                checked={field.value}
                                                onChange={(e) => {
                                                    clearErrors(`options.${idx}.isCorrect`);
                                                    field.onChange(e.target.checked);
                                                }}
                                            />
                                        ) : (
                                            <Radio
                                                checked={field.value}
                                                onChange={(e) => {
                                                    clearErrors(`options.${idx}.isCorrect`);
                                                    field.onChange(e.target.checked);
                                                }}
                                            />
                                        )
                                    }
                                />
                                {fields.length > 2 && (
                                    <IconButton onClick={() => remove(idx)}>
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        <Button
                            sx={{ mt: 1 }}
                            variant="outlined"
                            onClick={() => append({ text: "", isCorrect: false })}
                        >
                            + Add Option
                        </Button>
                    </Box>
                )}

                {/* Fill-Up Correct Answer */}
                {type === "fill_up" && (
                    <>
                        <Controller
                            control={control}
                            name="correctAnswer"
                            rules={{ required: "Correct answer is required" }}
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
                        {errors.correctAnswer && (
                            <Typography color="error">
                                {errors.correctAnswer.message}
                            </Typography>
                        )}
                    </>
                )}

                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={!isValid || !isDirty}
                    >
                        Save Question
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
