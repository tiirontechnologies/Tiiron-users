import { Box, Button, IconButton, TextField, Typography, Radio } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function SingleChoiceFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors, watch, fields, append, remove } = props;

    return (
        <Box mt={3}>
            <Typography mb={1}>Options:</Typography>
            {(fields || []).map((field: any, idx: number) => (
                <Box
                    key={field.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                        p: 1.5,
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #EAECF0",
                        borderRadius: 1.5,
                    }}
                >
                    <Controller
                        control={control}
                        name={`options.${idx}.text`}
                        rules={{ 
                            required: "Option is required",
                            minLength: { value: 1, message: "Option cannot be empty" },
                            validate: {
                                unique: (value: string) => {
                                    const options = watch('options');
                                    const duplicates = options.filter((opt: any) => opt.text === value);
                                    return duplicates.length <= 1 || "Duplicate options are not allowed";
                                }
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                placeholder={`Option ${idx + 1}`}
                                fullWidth
                                variant="outlined"
                                error={!!errors?.options?.[idx]?.text}
                                helperText={errors?.options?.[idx]?.text?.message}
                                onChange={(e) => {
                                    clearErrors(`options.${idx}.text`);
                                    clearErrors(`options.${idx}.isCorrect`);
                                    field.onChange(e.target.value);
                                }}
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
                        )}
                    />
                    <Controller
                        control={control}
                        name={`options.${idx}.isCorrect`}
                        render={({ field }) => (
                            <Radio
                                checked={field.value}
                                onChange={(e) => {
                                    clearErrors(`options.${idx}.isCorrect`);
                                    field.onChange(e.target.checked);
                                }}
                                sx={{
                                    color: '#6A42AB',
                                    '&.Mui-checked': { color: '#6A42AB' },
                                }}
                            />
                        )}
                    />
                    {(fields && fields.length > 2 && remove) && (
                        <IconButton size="small" onClick={() => remove(idx)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            ))}
            <Button
                sx={{ mt: 1 }}
                variant="outlined"
                onClick={() => append && append({ text: "", isCorrect: false })}
            >
                + Add Option
            </Button>
        </Box>
    );
}


