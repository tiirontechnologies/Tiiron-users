import { Popover, Box, Grid, Paper, Typography, Avatar } from "@mui/material";
import { MouseEvent } from "react";

type ContentTypeOption = {
  value: string;
  label: string;
  icon?: string;
};

type ContentTypeSelectorProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  options: ContentTypeOption[];
  onSelect: (value: string) => void;
};

export default function ContentTypeSelector(props: ContentTypeSelectorProps) {
  const { anchorEl, open, onClose, options, onSelect } = props;

  const handleSelect = (event: MouseEvent<HTMLElement>, value: string) => {
    event.stopPropagation();
    onSelect(value);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 2,
          boxShadow:
            "0px 2px 8px rgba(0,0,0,0.06), 0px 16px 32px rgba(0,0,0,0.08)",
          width: 440,
          maxWidth: "90vw",
        },
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Select content type
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {options.map((opt) => (
          <Grid item xs={12} key={opt.value}>
            <Paper
              role="button"
              tabIndex={0}
              onClick={(e) => handleSelect(e as unknown as MouseEvent<HTMLElement>, opt.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(opt.value);
                }
              }}
              sx={{
                p: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                border: "1px solid",
                borderColor: "divider",
                minHeight: 56,
                transition: (theme) => theme.transitions.create(["box-shadow", "transform", "border-color"], { duration: 200 }),
                '&:hover': {
                  boxShadow: 4,
                  transform: "translateY(-1px)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar
                variant="rounded"
                sx={{ width: 36, height: 36, bgcolor: "primary.light", color: "primary.contrastText", fontSize: 18 }}
                src={opt.icon}
              >
                {opt.label.charAt(0)}
              </Avatar>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                {opt.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Popover>
  );
}


