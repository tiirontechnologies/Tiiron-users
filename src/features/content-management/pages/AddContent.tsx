import { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    CircularProgress,
} from "@mui/material";
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import RichTextEditor from "@components/ui/RichTextEditor";
import { getContentTypeComponent } from "../components/getContentTypeComponent";
import { 
    useCreateVideoContentMutation,
    useCreateMcqContentMutation,
    useCreateFillUpContentMutation,
    useCreateBlogContentMutation,
    useCreateSubjectiveContentMutation
} from "../api/contentApi";

type ContentType = "multiple_choice" | "single_choice" | "fill_up" | "subjective" | "blog" | "video";

interface IAddCourseContentFormProps {
    type: ContentType;
    unitId: number;
    courseId?: number;
    onClose: () => void;
}

interface ICreateCourseContent {
    text: string;
    score: number;
    description?: string;
    correctAnswer?: string;
    options?: Array<{
        text: string;
        isCorrect: boolean;
    }>;
    blogTags?: string[];
    videoUrl?: string;
    videoFileName?: string;
}

export function AddCourseContentForm({ type, unitId, onClose, }: IAddCourseContentFormProps) {
    // Normalize external/legacy type aliases to supported internal types
    const effectiveType: ContentType = ((): ContentType => {
        // Treat unknown aliases like "code" or "mcq" as multiple_choice
        if ((type as string) === "code" || (type as string) === "mcq") return "multiple_choice";
        return type;
    })();
    // API mutation hooks
    const [createVideoContent, { isLoading: isVideoLoading }] = useCreateVideoContentMutation();
    const [createMcqContent, { isLoading: isMcqLoading }] = useCreateMcqContentMutation();
    const [createFillUpContent, { isLoading: isFillUpLoading }] = useCreateFillUpContentMutation();
    const [createBlogContent, { isLoading: isBlogLoading }] = useCreateBlogContentMutation();
    const [createSubjectiveContent, { isLoading: isSubjectiveLoading }] = useCreateSubjectiveContentMutation();

    const isLoading = isVideoLoading || isMcqLoading || isFillUpLoading || isBlogLoading || isSubjectiveLoading;

    const {
        control,
        register,
        handleSubmit,
        clearErrors,
        setError,
        setValue,
        formState: { errors, isValid, isDirty },
        watch,
    } = useForm<ICreateCourseContent>({
        defaultValues: {
            text: "",
            score: 1,
            description: "",
            correctAnswer: "",
            options: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
            blogTags: [],
            videoUrl: "",
            videoFileName: "",
        },
        mode: "onChange"
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const watchedOptions = useWatch({ control, name: "options" });

    useEffect(() => {
        if (effectiveType === "single_choice") {
            const index = watchedOptions.findIndex((op: any) => op.isCorrect);
            if (index > -1) {
                watchedOptions.forEach((op: any, i: number) => {
                    op.isCorrect = i === index;
                });
            }
        }
    }, [watchedOptions, effectiveType]);

    const onSubmit: SubmitHandler<ICreateCourseContent> = async (data) => {
        console.log("🚀 Form submitted with data:", data);
        console.log("📝 Content type:", type, "→ effective:", effectiveType);
        console.log("🆔 Unit ID:", unitId);
        
        try {
            let response;
            
            switch (effectiveType) {
                case "video":
                    console.log("🎥 Creating video content...");
                    const videoPayload = {
                        unitId,
                        quesTypeId: 6, // Video type
                        contentTypeId: 1,
                        description: {
                            html: data.description || "",
                            title: data.videoFileName || "",
                        },
                        title: data.text,
                        url: data.videoUrl || "",
                        duration: 0, // You might want to calculate this
                    };
                    console.log("📤 Video payload:", videoPayload);
                    response = await createVideoContent({
                        body: videoPayload
                    }).unwrap();
                    break;

                case "multiple_choice":
                case "single_choice":
                    console.log("📋 Creating MCQ/Single Choice content...");
                    const mcqPayload = {
                        unitId,
                        quesTypeId: effectiveType === "multiple_choice" ? 1 : 2, // MCQ or Single Choice
                        contentTypeId: 2,
                        description: {
                            html: data.description || "",
                            title: data.text,
                        },
                        options: data.options || [],
                    };
                    console.log("📤 MCQ payload:", mcqPayload);
                    response = await createMcqContent({
                        body: mcqPayload
                    }).unwrap();
                    break;

                case "fill_up":
                    response = await createFillUpContent({
                        body: {
                            unitId,
                            quesTypeId: 3, // Fill Up type
                            contentTypeId: 4,
                            description: {
                                html: data.description || "",
                                title: data.text,
                                correctAnswer: data.correctAnswer || "",
                            },
                        }
                    }).unwrap();
                    break;

                case "blog":
                    response = await createBlogContent({
                        body: {
                            unitId,
                            quesTypeId: 5, // Blog type
                            contentTypeId: 5,
                            description: {
                                html: data.description || "",
                                tags: data.blogTags || [],
                            },
                            html: data.text,
                        }
                    }).unwrap();
                    break;

                case "subjective":
                    response = await createSubjectiveContent({
                        body: {
                            unitId,
                            quesTypeId: 4, // Subjective type
                            contentTypeId: 3,
                            description: {
                                html: data.description || "",
                            },
                            question: data.text,
                        }
                    }).unwrap();
                    break;

                default:
                    throw new Error(`Unsupported content type: ${type}`);
            }

            console.log("✅ Content created successfully:", response);
            onClose();
        } catch (error) {
            console.error("❌ Error creating content:", error);
            console.error("❌ Error details:", {
                message: error.message,
                status: error.status,
                data: error.data
            });
            // You might want to show a toast notification here
        }
    };

    const validateAtLeastOneCorrect = () => {
        console.log("🔍 Validating options:", watchedOptions);
        const isCorrect = watchedOptions.some((o: any) => o.isCorrect);
        console.log("🔍 At least one correct:", isCorrect);
        
        if (!isCorrect) {
            console.log("❌ No correct option found, setting errors");
            watchedOptions.forEach((_: any, idx: number) =>
                setError(`options.${idx}.isCorrect`, {
                    type: "custom",
                    message: "Mark at least one as correct",
                })
            );
            return false;
        }
        console.log("✅ Validation passed");
        return true;
    };

    return (
        <Box
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 2,
                p: 3,
                border: "1px solid #EAECF0",
                boxShadow:
                    "0px 1px 3px rgba(16,24,40,0.10), 0px 1px 2px rgba(16,24,40,0.06)",
            }}
        >
            <form
                noValidate
            >
                {/* Title (plain input) */}
                <Typography mb={1}>Title:</Typography>
                <Controller
                    name="text"
                    control={control}
                    rules={{
                        required: "Title is required",
                        minLength: { value: 3, message: "Title must be at least 3 characters" }
                    }}
                    render={({ field }) => (
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                {...field}
                                fullWidth
                                label="Title"
                                variant="outlined"
                                error={!!errors.text}
                                helperText={errors.text?.message}
                                sx={{
                                    backgroundColor: "#FAFAFB",
                                    borderRadius: 1.5,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1.5,
                                        '& fieldset': { borderColor: '#D0D5DD' },
                                        '&:hover fieldset': { borderColor: '#98A2B3' },
                                        '&.Mui-focused fieldset': { borderColor: '#6A42AB', borderWidth: 2 },
                                    },
                                }}
                                placeholder="Enter content title..."
                                onChange={(e) => {
                                    clearErrors("text");
                                    field.onChange(e.target.value);
                                }}
                            />
                            {errors.text && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {errors.text.message}
                                </Typography>
                            )}
                        </Box>
                    )}
                />

                {/* Description (HTML) */}
                <Typography mb={1}>Description:</Typography>
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        validate: {
                            hasActualContent: (value) => {
                                const textOnly = (value || "").replace(/<[^>]*>/g, '').trim();
                                return textOnly.length === 0 || textOnly.length >= 5 || "Description must have content or be empty";
                            }
                        }
                    }}
                    render={({ field }) => (
                        <Box sx={{ mb: 3 }}>
                            <RichTextEditor
                                value={field.value}
                                onChange={(value) => {
                                    clearErrors("description");
                                    field.onChange(value);
                                }}
                                placeholder="Add an optional description..."
                            />
                            {errors.description && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {errors.description.message as string}
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
                                variant="outlined"
                                error={!!errors.score}
                                helperText={errors.score?.message}
                                inputProps={{ min: 1, max: 100 }}
                                sx={{
                                    backgroundColor: "#FAFAFB",
                                    borderRadius: 1.5,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1.5,
                                        '& fieldset': { borderColor: '#D0D5DD' },
                                        '&:hover fieldset': { borderColor: '#98A2B3' },
                                        '&.Mui-focused fieldset': { borderColor: '#6A42AB', borderWidth: 2 },
                                    },
                                }}
                            />
                        </Box>
                    )}
                />
                {errors.score && (
                    <Typography color="error">{errors.score.message}</Typography>
                )}

                {(() => {
                    const FieldsComponent = getContentTypeComponent(type);
                    if (!FieldsComponent) return null;
                    return (
                        <FieldsComponent
                            control={control}
                            errors={errors}
                            clearErrors={clearErrors}
                            watch={watch}
                            fields={fields}
                            append={append}
                            remove={remove}
                            setValue={setValue}
                        />
                    );
                })()}

                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 1.5 }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 1.5, px: 3 }}
                        onClick={() => {
                            console.log("🔘 Save Content button clicked - SKIPPING VALIDATION");
                            
                            // Get form data directly without validation
                            const formData = watch();
                            console.log("🔍 Form data:", formData);
                            console.log("🔍 Content type:", type);
                            console.log("🔍 Unit ID:", unitId);
                            
                            // Call onSubmit directly without validation
                            console.log("🚀 Calling onSubmit directly...");
                            onSubmit(formData);
                        }}
                    >
                        {isLoading ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Saving...
                            </>
                        ) : (
                            "Save Content"
                        )}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}