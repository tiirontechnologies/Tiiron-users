import CustomTextField from "@components/ui/textfields/CustomTextField";
import SignupImage from "../../../../assets/user-login-img.jpg.jpeg";
import AuthLayout from "@layouts/AuthLayout";
import { Alert, Box, IconButton, InputAdornment, Snackbar } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useRegisterUserMutation } from "../../api/authApi";
import { useForm, Controller } from "react-hook-form";
import { IOrganisationRegister } from "types/user.types";
import { useState } from "react";

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IOrganisationRegister>();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmit = async (data: IOrganisationRegister) => {
    try {
      const res = await registerUser({ ...data }).unwrap();

      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message || "User registered successfully");
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <AuthLayout
      imageSrc={SignupImage}
      imageOnLeft={true}
      titleText="Create your account"
      submitButtonText="Create Account →"
      dividerText="Or sign up with"
      isLoading={isLoading}
      isOrgSignUp={false}
      isLogin={true}
      onSubmit={handleSubmit(onSubmit)}
      renderFormFields={
        <Box display={"grid"} gap={2}>
          <Box display={"flex"} gap={2} width="100%">
            <Box flex={1}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="text"
                    labelText="First Name"
                    placeholder="First Name"
                  />
                )}
              />
              <span style={{ color: "red" }}>
                {errors.firstName?.message}
              </span>
            </Box>

            <Box flex={1}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type="text"
                    labelText="Last Name"
                    placeholder="Last Name"
                  />
                )}
              />
              <span style={{ color: "red" }}>
                {errors.lastName?.message}
              </span>
            </Box>
          </Box>

          <Box>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  labelText="User Name"
                  placeholder="Username"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.username?.message}</span>
          </Box>

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
                  placeholder="mail@example.com"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </Box>

          <Box display={"flex"} gap={2} width="100%">
            <Box flex={1}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
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
              <span style={{ color: "red" }}>
                {errors.password?.message}
              </span>
            </Box>

            <Box flex={1}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Passwords do not match",
                }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    labelText="Confirm Password"
                    placeholder="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                            edge="end"
                            size="small"
                          >
                            {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <span style={{ color: "red" }}>
                {errors.confirmPassword?.message}
              </span>
            </Box>
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
  );
};

export default Index;
