import CustomTextField from "@components/textfields/CustomTextField";
import LoginPng from "@images/login.png";
import AuthLayout from "@layouts/AuthLayout";
import { Box, Grid, Typography } from "@mui/material";
/**
 *
 * @author Vishal
 */
const index = () => {
  return (
    <AuthLayout
      imageSrc={LoginPng}
      imageOnLeft={true}
      titleText="Create your account"
      submitButtonText="Create Account →"
      dividerText="Sign up with"
      onSubmit={() => console.log("Submit login")}
      renderFormFields={
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={0.5}>
              Full Name
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ md: 6, xs: 12 }}>
                <CustomTextField
                  type="text"
                  name="name"
                  placeholder="Full Name"
                />
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
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              type="email"
              name="email"
              labelText="Email"
              placeholder="Email"
            />
          </Grid>
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
      }
    />
  );
};

export default index;
