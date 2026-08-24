export const commentTheme = {
  colors: {
    primary: "#6C5CE7",
    primaryDark: "#5B4BD1",
    background: "#FAFBFC",
    card: "#FFFFFF",
    border: "#ECEEF3",
    textPrimary: "#1A1D29",
    textSecondary: "#6B7280",
    mentorBg: "#F3F1FE",
    mentorBorder: "#6C5CE7",
    error: "#E5484D",
  },
  radius: {
    card: "16px",
    button: "12px",
    input: "14px",
  },
  gradient: "linear-gradient(135deg, #6C5CE7 0%, #8A7FF0 100%)",
  typography: {
    heading: { fontSize: 22, fontWeight: 700 },
    name: { fontSize: 15, fontWeight: 600 },
    body: { fontSize: 14, fontWeight: 400 },
    meta: { fontSize: 12, fontWeight: 500 },
  },
} as const;