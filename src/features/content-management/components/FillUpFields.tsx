import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { ContentFieldsProps } from "./ContentFields.types";

export default function FillUpFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors } = props;

    return (
        <>
            <Controller
                control={control}
                name="correctAnswer"
                rules={{ required: "Correct answer is required" }}
                render={({ field }) => (
                    <TextField
                        sx={{
                            mt: 2,
                            backgroundColor: "#FAFAFB",
                            borderRadius: 1.5,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5,
                                '& fieldset': { borderColor: '#D0D5DD' },
                                '&:hover fieldset': { borderColor: '#98A2B3' },
                                '&.Mui-focused fieldset': { borderColor: '#4F39F6', borderWidth: 2 },
                            },
                        }}
                        label="Correct Answer"
                        fullWidth
                        variant="outlined"
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
    );
}


