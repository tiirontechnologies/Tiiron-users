import { TextField, Typography, Box, TextFieldProps } from "@mui/material";
import React from "react";

type CustomTextFieldProps = TextFieldProps & {
  labelText?: string;
  inputSx?: object;
};

const CustomTextField = React.forwardRef<HTMLDivElement, CustomTextFieldProps>(
  ({ name, value, onChange, placeholder, type = "text", labelText, onKeyDown, inputSx, InputProps, ...rest }, ref) => {
    return (
      <Box mb={2}>
        {labelText && (
          <Typography
            variant="subtitle2"
            mb={0.5}
            sx={{ color: "#0F172A", fontWeight: 500 }}
          >
            {labelText}
          </Typography>
        )}
        <TextField
          {...rest} 
          name={name}
          type={type}
          value={value ?? ""} 
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          fullWidth
          size="small"
          variant="outlined"
          ref={ref} 
          InputProps={{
            ...InputProps,
            sx: {
              py: "10px", 
              backgroundColor: "#fff",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E2E8F0",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4F39F6",
              },
              "& input::placeholder": {
                color: "#94A3B8",
                opacity: 1,
              },
              ...inputSx,
              ...InputProps?.sx,
            },
          }}
        />
      </Box>
    );
  }
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
