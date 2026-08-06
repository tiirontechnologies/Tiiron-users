import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircleRounded,
  CloseRounded,
  EmailOutlined,
  LockOutlined,
  PasswordOutlined,
} from "@mui/icons-material";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useVerifyPasswordResetOtpMutation,
} from "../../api/authApi";

type Props = { open: boolean; onClose: () => void };
const steps = ["Find account", "Verify OTP", "New password"];
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#a78bfa" },
    "&.Mui-focused fieldset": { borderColor: "#5b35f2", borderWidth: 2 },
  },
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (data?.message) return data.message;
  }
  return fallback;
};

const ForgotPasswordModal = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [requestPasswordReset, { isLoading: isSendingOtp }] =
    useRequestPasswordResetMutation();
  const [verifyPasswordResetOtp, { isLoading: isVerifyingOtp }] =
    useVerifyPasswordResetOtpMutation();
  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation();
  const maskedEmail = useMemo(() => {
    const [name, domain] = email.split("@");
    return name && domain
      ? `${name.slice(0, 2)}${"*".repeat(Math.max(3, name.length - 2))}@${domain}`
      : email;
  }, [email]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setPassword("");
      setConfirmPassword("");
      setError("");
      setCompleted(false);
    }
  }, [open]);

  const verifyOtp = async (code: string) => {
    if (code.length !== 6)
      return setError("Enter the 6-digit code sent to your email.");
    setError("");
    try {
      await verifyPasswordResetOtp({ email, otp: code }).unwrap();
      setStep(2);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Invalid or expired OTP. Please try again."));
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("reset-otp-0")?.focus();
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (step === 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return setError("Please enter a valid email address.");
      try {
        await requestPasswordReset({ email }).unwrap();
        setStep(1);
      } catch (requestError) {
        setError(getErrorMessage(requestError, "Could not send an OTP. Please try again."));
      }
    } else if (step === 2) {
      if (password.length < 8)
        return setError("Password must be at least 8 characters long.");
      if (password !== confirmPassword)
        return setError("Passwords do not match.");
      try {
        await resetPassword({ password }).unwrap();
        setCompleted(true);
      } catch (requestError) {
        setError(getErrorMessage(requestError, "Could not reset password. Please try again."));
      }
    }
  };

  const updateOtp = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");
    if (digit && index < 5)
      document.getElementById(`reset-otp-${index + 1}`)?.focus();
    if (next.join("").length === 6) verifyOtp(next.join(""));
  };

  const changeEmail = () => {
    setStep(0);
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const resendOtp = async () => {
    setError("");
    try {
      await requestPasswordReset({ email }).unwrap();
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("reset-otp-0")?.focus();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Could not resend the OTP. Please try again."));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(48, 28, 121, .32)",
        },
      }}
    >
      <DialogContent
        sx={{
          p: { xs: 2.5, sm: 4 },
          position: "relative",
          background:
            "linear-gradient(145deg, #fbfaff 0%, #fff 55%, #f6f3ff 100%)",
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close forgot password"
          sx={{ position: "absolute", right: 16, top: 16, color: "#64748b" }}
        >
          <CloseRounded />
        </IconButton>
        {completed ? (
          <Box textAlign="center" py={3}>
            <CheckCircleRounded
              sx={{ fontSize: 70, color: "#36b37e", mb: 1.5 }}
            />
            <Typography variant="h5" fontWeight={800} color="#1e293b">
              Password updated!
            </Typography>
            <Typography color="text.secondary" mt={1} mb={3}>
              Your password is ready to use. Sign in with your new password.
            </Typography>
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                borderRadius: 2.5,
                px: 4,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                background: "linear-gradient(90deg, #4f39f6, #7457ff)",
              }}
            >
              Back to sign in
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  mx: "auto",
                  borderRadius: 2.5,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, #4f39f6, #8b5cf6)",
                  color: "white",
                  mb: 2,
                }}
              >
                <LockOutlined />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#1e293b">
                Reset your password
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.7}>
                No worries — we’ll help you get back into your account securely.
              </Typography>
            </Box>
            <Box display="flex" alignItems="flex-start" mt={3.5} mb={4}>
              {steps.map((label, index) => (
                <Box
                  key={label}
                  sx={{
                    flex: 1,
                    position: "relative",
                    textAlign: "center",
                    "&:not(:last-child)::after": {
                      content: '""',
                      position: "absolute",
                      top: 14,
                      left: "60%",
                      width: "80%",
                      height: 2,
                      backgroundColor: index < step ? "#5b35f2" : "#e5e7eb",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 29,
                      height: 29,
                      mx: "auto",
                      mb: 0.8,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 13,
                      fontWeight: 800,
                      color: index <= step ? "#fff" : "#94a3b8",
                      backgroundColor: index <= step ? "#5b35f2" : "#e5e7eb",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    fontSize={11}
                    fontWeight={index === step ? 800 : 600}
                    color={index <= step ? "#4f39f6" : "#94a3b8"}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
            <form onSubmit={submit}>
              {step === 0 && (
                <>
                  <Typography fontWeight={700} mb={0.5}>
                    Find your account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2.5}>
                    Enter the email you use to sign in. We’ll send a secure
                    verification code.
                  </Typography>
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={fieldSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              {step === 1 && (
                <>
                  <Typography fontWeight={700} mb={0.5}>
                    Check your inbox
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2.5}>
                    We sent a 6-digit code to <b>{maskedEmail}</b>.{" "}
                    <Typography
                      component="span"
                      role="button"
                      tabIndex={0}
                      onClick={changeEmail}
                      onKeyDown={(event) =>
                        event.key === "Enter" && changeEmail()
                      }
                      sx={{
                        color: "#5b35f2 !important",
                        fontWeight: 800,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Change email
                    </Typography>
                  </Typography>
                  <Box
                    display="flex"
                    gap={{ xs: 0.7, sm: 1.25 }}
                    justifyContent="center"
                  >
                    {otp.map((value, index) => (
                      <TextField
                        key={index}
                        id={`reset-otp-${index}`}
                        value={value}
                        disabled={isVerifyingOtp}
                        onChange={(e) => updateOtp(e.target.value, index)}
                        inputProps={{
                          inputMode: "numeric",
                          maxLength: 1,
                          "aria-label": `OTP digit ${index + 1}`,
                        }}
                        sx={{
                          width: 48,
                          "& input": {
                            textAlign: "center",
                            fontSize: 21,
                            fontWeight: 800,
                            p: 1.25,
                          },
                          ...fieldSx,
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                    color="text.secondary"
                    mt={2.5}
                  >
                    Didn’t receive it?{" "}
                    <Typography
                      component="span"
                      role="button"
                      tabIndex={0}
                      onClick={resendOtp}
                      onKeyDown={(event) =>
                        event.key === "Enter" &&
                        resendOtp()
                      }
                      sx={{
                        color: "#5b35f2 !important",
                        fontWeight: 800,
                        cursor: isSendingOtp ? "default" : "pointer",
                        pointerEvents: isSendingOtp ? "none" : "auto",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {isSendingOtp ? "Sending..." : "Resend code"}
                    </Typography>
                  </Typography>
                </>
              )}
              {step === 2 && (
                <>
                  <Typography fontWeight={700} mb={0.5}>
                    Create a strong password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2.5}>
                    Choose a new password that you haven’t used before.
                  </Typography>
                  <TextField
                    autoFocus
                    fullWidth
                    type="password"
                    label="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ ...fieldSx, mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={fieldSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              {step !== 1 && (
                <Box mt={3.5}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSendingOtp || isResettingPassword}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.35,
                      textTransform: "none",
                      fontWeight: 800,
                      boxShadow: "0 8px 18px rgba(79, 57, 246, .28)",
                      background: "linear-gradient(90deg, #4f39f6, #7457ff)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #412bd8, #6545ed)",
                      },
                    }}
                  >
                    {step === 0
                      ? isSendingOtp
                        ? "Sending..."
                        : "Send verification code"
                      : isResettingPassword
                        ? "Updating..."
                        : "Update password"}
                  </Button>
                </Box>
              )}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
