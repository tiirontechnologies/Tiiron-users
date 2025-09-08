/**
 * @author Vishal
 */
import CustomTextField from "@components/Template/textfields/CustomTextField";
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
import { useRegisterOrganizationMutation } from "../../../api/api";
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
          <CustomTextField placeholder="Organization Name"  {...field} labelText="Organization Name" />
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
          <CustomTextField placeholder="Organization Email" {...field} labelText="Organization Email" />
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
    <Grid container spacing={2}>
      <Grid>
        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>
          Full Name
        </Typography>
        <Grid container spacing={2}>
          <Grid>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <CustomTextField {...field} placeholder="Full Name" />
              )}
            />
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>
          </Grid>
          <Grid>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <CustomTextField {...field} placeholder="Last Name" />
              )}
            />
            <p style={{ color: "red" }}>{errors.lastName?.message}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <CustomTextField {...field} labelText="Username" />
          )}
        />
        <p style={{ color: "red" }}>{errors.username?.message}</p>
      </Grid>
      <Grid>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <CustomTextField {...field} labelText="Password" />
          )}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
      </Grid>
      <Grid>
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
            <CustomTextField {...field} labelText="Confirm Password" />
          )}
        />
        {/* Display error message if confirmPassword is invalid */}
        <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
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
      const res = await registerOrganization({ body: { ...data } }).unwrap();
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
      submitButtonText={`${!stepChange ? "Continue" : "Create Account"} →`}
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
