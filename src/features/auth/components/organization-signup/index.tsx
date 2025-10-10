/**
 * @author Vishal
 */
import CustomTextField from "@components/ui/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import {
  Alert,
  Box,
  Collapse,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRegisterOrganizationMutation } from "../../api/authApi";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormGetValues,
} from "react-hook-form";
import { IOrganisationRegister } from "types/user.types";

const Step1 = ({
  control,
  errors,
}: {
  control: Control<IOrganisationRegister, any, IOrganisationRegister>;
  errors: FieldErrors<IOrganisationRegister>;
}) => {
  return (
    <>
      <Controller
        name="orgName"
        control={control}
        defaultValue=""
        rules={{ required: "Organization name is required" }}
        render={({ field }) => (
          <CustomTextField
            placeholder="Organization Name"
            {...field}
            labelText="Organization Name"
          />
        )}
      />
      <p style={{ color: "red" }}>{errors.orgName?.message}</p>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        }}
        render={({ field }) => (
          <CustomTextField
            placeholder="Organization Email"
            {...field}
            labelText="Organization Email"
          />
        )}
      />
      <p style={{ color: "red" }}>{errors.email?.message}</p>
    </>
  );
};

const Step2 = ({
  control,
  errors,
  getValues,
}: {
  control: Control<IOrganisationRegister, any, IOrganisationRegister>;
  errors: FieldErrors<IOrganisationRegister>;
  getValues: UseFormGetValues<IOrganisationRegister>;
}) => {
  return (
    <Grid container spacing={3}>
      {/* Full Name row (two column */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              mb={0.5}
              fontSize={17}
            >
              First Name
            </Typography>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <CustomTextField {...field} placeholder="First Name" />
              )}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.firstName?.message}
            </p>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Invisible label for spacing */}
            <Typography
              variant="subtitle2"
              fontWeight={500}
              mb={0.5}
              fontSize={17}
              style={{ visibility: "hidden" }}
            >
              Last Name
            </Typography>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <CustomTextField {...field} placeholder="Last Name" />
              )}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.lastName?.message}
            </p>
          </Grid>
        </Grid>
      </Grid>

      {/* Username (full width) */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" fontWeight={500} mb={0.5} fontSize={17}>
          Username
        </Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <CustomTextField {...field} placeholder="Username" />
          )}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          {errors.username?.message}
        </p>
      </Grid>

      {/* Password row (two columns) */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              mb={0.5}
              fontSize={17}
            >
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  placeholder="Enter Password"
                  type="password"
                />
              )}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.password?.message}
            </p>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              mb={0.5}
              fontSize={17}
            >
              Confirm Password
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  placeholder="Confirm Password"
                  type="password"
                />
              )}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.confirmPassword?.message}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const index = () => {
  const [stepChange, setStepChange] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger, // trigger validation on specific fields
  } = useForm<IOrganisationRegister>();

  const [registerOrganization, { isLoading }] =
    useRegisterOrganizationMutation();

  const onSubmit: SubmitHandler<IOrganisationRegister> = async (
    data: IOrganisationRegister
  ) => {
    try {
      const res = await registerOrganization({ ...data }).unwrap();
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

  const handleNext = async () => {
    if (!stepChange) {
      // Trigger Step 1 validation (this checks Step 1 fields before moving to Step 2)
      const isStep1Valid = await trigger(["orgName", "email"]); // Validate Step 1 fields
      if (isStep1Valid) {
        setStepChange(true); // Proceed to Step 2 if Step 1 is valid
      }
    } else {
      // Step 2 validation is already done when you submit
      handleSubmit(onSubmit)();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={true}
      isUserSignUp={true}
      isLogin={true}
      titleText="Create your account"
      submitButtonText={`${!stepChange ? "Continue" : "Create Account"} ->`}
      dividerText="Sign in with"
      onSubmit={handleNext}
      isLoading={isLoading}
      renderFormFields={
        <Box>
          <Collapse in={!stepChange} unmountOnExit timeout={300}>
            <Step1 control={control} errors={errors} />
          </Collapse>
          <Collapse in={stepChange} unmountOnExit timeout={300}>
            <Step2 control={control} errors={errors} getValues={getValues} />
          </Collapse>
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

export default index;
