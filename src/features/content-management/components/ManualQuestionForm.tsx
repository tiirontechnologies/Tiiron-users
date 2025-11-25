/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import RichTextEditor from "@components/ui/RichTextEditor";
import { getContentTypeComponent } from "../components/getContentTypeComponent";

type ContentType =
  | "multiple_choice"
  | "single_choice"
  | "fill_up"
  | "subjective"
  | "blog"
  | "video";

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
  duration?: number; // ✅ added
}

interface IManualQuestionFormProps {
  type: ContentType;
  unitId: number;
  onClose: () => void;
  onSubmit: (data: ICreateCourseContent) => Promise<void>;
  isLoading: boolean;
}

export function ManualQuestionForm({
  type,
  onClose,
  onSubmit: handleFormSubmit,
  isLoading,
}: IManualQuestionFormProps) {

  const effectiveType: ContentType = ((): ContentType => {
    if ((type as string) === "code" || (type as string) === "mcq")
      return "multiple_choice";
    return type;
  })();

  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    setError,
    formState: { errors },
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
      duration: 0, 
    },
    mode: "onChange",
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

  // ✅ Validate at least one correct answer
  const validateAtLeastOneCorrect = () => {
    if (
      effectiveType === "multiple_choice" ||
      effectiveType === "single_choice"
    ) {
      const isCorrect = watchedOptions.some((o: any) => o.isCorrect);
      if (!isCorrect) {
        watchedOptions.forEach((_, idx) =>
          setError(`options.${idx}.isCorrect`, {
            type: "custom",
            message: "Mark at least one as correct",
          })
        );
        return false;
      }
    }
    return true;
  };

  // ✅ Handle Submit
  const onSubmit: SubmitHandler<ICreateCourseContent> = async (data) => {
    console.log("🚀 Manual form data:", data);

    if (!validateAtLeastOneCorrect()) return;

    try {
      await handleFormSubmit(data);
    } catch (error) {
      console.error("❌ Manual form submission error:", error);
    }
  };

  // ✅ JSX
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>

      {/* Title */}
      <Typography mb={1}>Title:</Typography>
      <Controller
        name="text"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Title"
            error={!!errors.text}
            helperText={errors.text?.message}
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Description */}
      <Typography mb={1}>Description:</Typography>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Box sx={{ mb: 3 }}>
            <RichTextEditor
              value={field.value}
              onChange={(value) => {
                clearErrors("description");
                field.onChange(value);
              }}
              placeholder="Add description..."
            />
          </Box>
        )}
      />

      {/* Score */}
      <Controller
        name="score"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Score"
            fullWidth
            sx={{ mb: 3 }}
          />
        )}
      />

      {/* Duration Field */}
      {effectiveType === "video" && (
        <Controller
          name="duration"
          control={control}
          rules={{ required: "Duration is required for video" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Video Duration (seconds)"
              fullWidth
              error={!!errors.duration}
              helperText={errors.duration?.message}
              sx={{ mb: 3 }}
            />
          )}
        />
      )}

      {/* Dynamic Fields */}
      {(() => {
        const FieldsComponent = getContentTypeComponent(effectiveType);
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

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button onClick={onClose} variant="outlined" disabled={isLoading}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" disabled={isLoading}>
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
  );
}
