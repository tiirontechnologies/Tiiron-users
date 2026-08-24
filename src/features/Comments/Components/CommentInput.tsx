import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Avatar, TextField, Button, Typography } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { commentTheme } from "../theme";

const MAX_LENGTH = 500;

interface CommentInputProps {
  avatarUrl: string;
  placeholder?: string;
  initialValue?: string;
  submitLabel?: string;
  autoFocus?: boolean;
  showCancel?: boolean;
  loading?: boolean;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
  size?: "default" | "compact";
}

const CommentInput: React.FC<CommentInputProps> = ({
  avatarUrl,
  placeholder = "Ask a question or share your thoughts about this lesson...",
  initialValue = "",
  submitLabel = "Comment",
  autoFocus = false,
  showCancel = false,
  loading = false,
  onSubmit,
  onCancel,
  size = "default",
}) => {
  const [text, setText] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const trimmed = text.trim();
  const isEmpty = trimmed.length === 0;
  const remaining = MAX_LENGTH - text.length;

  const handleSubmit = () => {
    if (isEmpty || loading) return;
    onSubmit(trimmed);
    setText("");
  };

  const avatarSize = size === "compact" ? { xs: 30, sm: 32 } : { xs: 36, sm: 40 };

  return (
    <Stack direction="row" spacing={1.5}>
      <Avatar
        src={avatarUrl}
        sx={{ width: avatarSize, height: avatarSize, flexShrink: 0 }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          multiline
          minRows={size === "compact" ? 1 : 2}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= MAX_LENGTH) setText(e.target.value);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: commentTheme.radius.input,
              bgcolor: commentTheme.colors.background,
              fontSize: 14,
              "& fieldset": { borderColor: commentTheme.colors.border },
              "&:hover fieldset": { borderColor: commentTheme.colors.primary },
              "&.Mui-focused fieldset": { borderColor: commentTheme.colors.primary },
            },
          }}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1.5}
          sx={{ mt: 1 }}
        >
          <Typography
            sx={{
              fontSize: 11.5,
              color: remaining < 30 ? commentTheme.colors.error : commentTheme.colors.textSecondary,
            }}
          >
            {text.length}/{MAX_LENGTH}
          </Typography>

          {showCancel && (
            <Button
              size="small"
              onClick={() => {
                setText("");
                onCancel?.();
              }}
              sx={{
                borderRadius: commentTheme.radius.button,
                textTransform: "none",
                color: commentTheme.colors.textSecondary,
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            disabled={isEmpty || loading}
            onClick={handleSubmit}
            endIcon={<SendRoundedIcon sx={{ fontSize: 15 }} />}
            sx={{
              borderRadius: commentTheme.radius.button,
              textTransform: "none",
              px: 2.5,
              fontWeight: 600,
              background: commentTheme.gradient,
              boxShadow: "none",
              "&:hover": { background: commentTheme.gradient, opacity: 0.92, boxShadow: "none" },
              "&.Mui-disabled": { background: commentTheme.colors.border, color: "#fff" },
            }}
          >
            {submitLabel}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CommentInput;
