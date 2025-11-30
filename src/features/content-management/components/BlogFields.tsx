import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { ContentFieldsProps } from "./ContentFields.types";

export default function BlogFields(props: ContentFieldsProps) {
    const { control, errors, clearErrors } = props;
    const [tagInput, setTagInput] = useState("");

    return (
        <Box sx={{ mt: 2 }}>
            <Controller
                name="blogTags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && tagInput.trim()) {
                                    const next = Array.from(new Set([...(field.value || []), tagInput.trim()]));
                                    field.onChange(next);
                                    setTagInput("");
                                    e.preventDefault();
                                }
                            }}
                            label="Add tag and press Enter"
                            fullWidth
                            variant="outlined"
                            sx={{
                                backgroundColor: "#FAFAFB",
                                borderRadius: 1.5,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    '& fieldset': { borderColor: '#D0D5DD' },
                                    '&:hover fieldset': { borderColor: '#98A2B3' },
                                    '&.Mui-focused fieldset': { borderColor: '#4F39F6', borderWidth: 2 },
                                },
                            }}
                        />
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                            {(field.value || []).map((t: string) => (
                                <Chip key={t} label={t} onDelete={() => field.onChange((field.value || []).filter((x: string) => x !== t))} />
                            ))}
                        </Stack>
                    </Box>
                )}
            />
        </Box>
    );
}


