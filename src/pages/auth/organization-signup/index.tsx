/**
 * @author Vishal
 */
import CustomTextField from "@components/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import { Box, Collapse, Grid, Typography } from "@mui/material";
import { useState } from "react";

const Step1 = () => {
  return (
    <>
      <CustomTextField
        // value=""
        // onChange={() => {}}
        type="text"
        name="organizationName"
        labelText="Organization Name"
      />
      <CustomTextField
        type="text"
        name="organizationEmail"
        labelText="Organization Email"
        // value=""
        // onChange={() => {}}
      />
    </>
  );
};
const Step2 = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2" fontWeight={500} mb={0.5}>
          Full Name
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }}>
            <CustomTextField type="text" name="name" placeholder="Full Name" />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <CustomTextField
              type="text"
              name="lastName"
              placeholder="Last Name"
              // labelText=" "
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          type="text"
          name="username"
          labelText="Username"
          placeholder="Username"
        />
      </Grid>
      {/* <Grid size={{ xs: 12 }}>
        <CustomTextField
          type="email"
          name="email"
          labelText="Email"
          placeholder="Email"
        />
      </Grid> */}
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          type="password"
          name="password"
          labelText="Password"
          placeholder="Password"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          type="password"
          name="confirmPassword"
          labelText="Confirm Password"
          placeholder="Confirm Password"
        />
      </Grid>
    </Grid>
  );
};
const index = () => {
  const [stepChange, setStepChange] = useState(false);
  return (
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={true}
      titleText="Create your account"
      submitButtonText={`${!stepChange ? "Continue" : "Create Account"}  →`}
      dividerText="Sign in with"
      onSubmit={() => {
        if (!stepChange) {
          setStepChange(true);
        } else {
        }
      }}
      renderFormFields={
        <Box>
          <Collapse in={!stepChange} unmountOnExit timeout={300}>
            <Step1 />
          </Collapse>
          <Collapse in={stepChange} unmountOnExit timeout={300}>
            <Step2 />
          </Collapse>
        </Box>
      }
    />
  );
};

export default index;
