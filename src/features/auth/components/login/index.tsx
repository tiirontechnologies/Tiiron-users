/**
 * @author Nitin
 */
import CustomTextField from "@components/ui/textfields/CustomTextField";
import LoginPng from "../../../../assets/user-login-img.jpg.jpeg";
import AuthLayout from "@layouts/AuthLayout";
import { Alert, Box, IconButton, InputAdornment, Snackbar, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useLoginMutation } from "../../api/authApi";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TAuth } from "types/auth.types";
import { useNavigate } from "react-router-dom";
import { ENV } from "../../../../config/env";
import ForgotPasswordModal from "../forgot-password";

const Login = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authLogin, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuth>();
  const navigate = useNavigate();

  // ✅ Normal login
  const onSubmit: SubmitHandler<TAuth> = async (data) => {
    try {
      const res = await authLogin({ ...data }).unwrap();
      const { roleId } = res?.user;
      console.log(res);
      navigate("/");
      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message || "Login successful");
      setSnackbarOpen(true);
    } catch (err: any) {
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  // ✅ Google login handler
  const handleGoogleAuth = () => {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = `${ENV.AUTH_URL}/google`;
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={false}
      isLoading={isLoading}
      isUserSignUp={true}
      signUpBtnText="Sign Up"
      titleText="Sign in to your account"
      submitButtonText="Sign In →"
      dividerText="Sign in with"
      onSubmit={handleSubmit(onSubmit)}
      onGoogleAuth={handleGoogleAuth} // ✅ Pass Google handler
      renderFormFields={
        <Box display={"grid"} gap={2}>
          <Box>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="email"
                  labelText="Email"
                  placeholder="mail@mail.com"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </Box>
          <Box>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  labelText="Password"
                  placeholder="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((visible) => !visible)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </Box>
          <Box sx={{ mt: -1, textAlign: "right" }}>
            <Typography component="span" role="button" tabIndex={0} onClick={() => setForgotPasswordOpen(true)} onKeyDown={(event) => event.key === "Enter" && setForgotPasswordOpen(true)} sx={{ color: "#5b35f2", fontSize: 13, fontWeight: 700, cursor: "pointer", "&:hover": { color: "#3E2DC4", textDecoration: "underline" } }}>
              <Box component="span" sx={{ color: "#1932d2" }}>Can&apos;t sign in? Reset your password.
                </Box>
            </Typography>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      }
    />
    <ForgotPasswordModal open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </>
  );
};

export default Login;
