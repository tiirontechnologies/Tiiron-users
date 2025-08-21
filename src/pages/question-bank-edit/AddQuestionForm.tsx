import React, { useEffect } from "react";
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
import { ICreateQuestion } from "types/questioncreate.types";
import { useCreateQuestionMutation } from "../../api/api";
import { useSnackbar } from "@layouts/Snackbar/SnackBarProvider";

type QuestionType = "multiple_choice" | "single_choice" | "fill_up";

interface AddQuestionFormProps {
    type: QuestionType;
    unit: number;
    courseId: number;
    onClose: () => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
    type,
    unit,
    courseId,
    onClose,
}) => {
    const { showSnackbar } = useSnackbar();
    const {
        control,
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors },
    } = useForm<ICreateQuestion>({
        defaultValues: {
            text: "",
            score: 1,
            correctAnswer: "",
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
    });

    const [createQuestion, { isLoading }] = useCreateQuestionMutation();
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

    const onSubmit: SubmitHandler<ICreateQuestion> = async (data: ICreateQuestion) => {
        // build payload
        const payload: any = {
            text: data.text,
            type,
            score: Number(data.score),
            unit,
            courseId,
        };
        if (type === "fill_up") {
            payload.correctAnswer = data.correctAnswer;
        } else {
            payload.options = data.options;
        }
        try {
            const res = await createQuestion({ body: payload }).unwrap();
            showSnackbar({ message: res?.message, severity: "success" });
        } catch (error: any) {
            console.error("Error creating Unit:", error);
            const errorMessage = error?.data?.errors?.map((e: any) => e.message).join(", ") || "Something went wrong!";
            showSnackbar({ message: errorMessage, severity: "error" });
        }
        finally {
            onClose();
        }
    };

    // custom validators
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
        <Box sx={{ bg: "#fff", p: 3, borderRadius: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight={600} fontSize={18}>
                    Add {type.replace("_", " ")} Question
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

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
                    rules={{ required: "Question is required" }}
                    render={({ field }) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(value) => {
                                clearErrors("text");
                                field.onChange(value);
                            }}
                            placeholder="Write question..."
                        />
                    )}
                />
                {errors.text && (
                    <Typography color="error">{errors.text.message}</Typography>
                )}

                {/* Score */}
                <TextField
                    sx={{ mt: 2 }}
                    type="number"
                    label="Score"
                    {...register("score", {
                        required: "Score is required",
                        min: { value: 1, message: "Score must be greater 0" },
                    })}
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
                                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                            >
                                <Controller
                                    control={control}
                                    name={`options.${idx}.text`}
                                    rules={{ required: "Option is required" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            placeholder={`Option ${idx + 1}`}
                                            fullWidth
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

                                {/* Errors */}
                                <Box>
                                    {errors?.options?.[idx]?.text && (
                                        <Typography color="error">
                                            {(errors.options[idx] as any)?.text?.message}
                                        </Typography>
                                    )}
                                    {errors?.options?.[idx]?.isCorrect && (
                                        <Typography color="error">
                                            {(errors.options[idx] as any)?.isCorrect?.message}
                                        </Typography>
                                    )}
                                </Box>
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
                            <Typography color="error">{errors.correctAnswer.message}</Typography>
                        )}
                    </>
                )}

                <Button fullWidth sx={{ mt: 3 }} type="submit" variant="contained" loading={isLoading}>
                    Save Question
                </Button>
            </form>
        </Box>
    );
};

export default AddQuestionForm;
