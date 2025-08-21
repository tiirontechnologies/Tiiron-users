import CustomTextField from "@components/Template/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import { useRegisterUserMutation } from "../../../api/api";
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
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const onSubmit = async (data: IOrganisationRegister) => {
    try {
      const res = await registerUser({ body: { ...data } }).unwrap();

      // On success
      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message || "User registered successfully");
      setSnackbarOpen(true);
    } catch (err: any) {
      // On failure
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
      imageSrc={LoginPng}
      imageOnLeft={true}
      titleText="Create your account"
      submitButtonText="Create Account →"
      dividerText="Sign up with"
      isLoading={isLoading}
      isOrgSignUp={true}
      isLogin={true}
      onSubmit={handleSubmit(onSubmit)} // Trigger RHF handleSubmit
      renderFormFields={
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2}>
              <Grid size={{ md: 6, xs: 12 }}>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                  Full Name
                </Typography>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "Full Name is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      type="text"
                      placeholder="Full Name"
                    />
                  )}
                />
                <span style={{ color: "red" }}>
                  {errors.firstName?.message}
                </span>
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                  Last Name
                </Typography>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last Name is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      type="text"
                      placeholder="Last Name"
                    />
                  )}
                />
                <span style={{ color: "red" }}>{errors.lastName?.message}</span>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
              User Name
            </Typography>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="Username"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.username?.message}</span>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="mail@example.com"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="password"
                  placeholder="Password"
                />
              )}
            />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
              Confirm Password
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                />
              )}
            />
            <span style={{ color: "red" }}>
              {errors.confirmPassword?.message}
            </span>
          </Grid>
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
        </Grid>
      }
    />
  );
};

export default Index;
