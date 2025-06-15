/**
 * @author Vishal
 */

import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomTextField from "@components/textfields/CustomTextField";
import LoginPng from "@images/login.png";
// import MicrosoftIcon from "@mui/iconas-material/Windows";
import Microsoft from "@icons/MicroSoftIcon.svg";
import Google from "@icons/google.svg";
import Facebook from "@icons/facebook.svg";

const Login = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isExtraSmall = useMediaQuery("(max-width:568px)");
  const socialButtonStyle = {
    flex: "1 1 220px", //  allow wrapping, grow/shrink with base 220px
    minWidth: isExtraSmall ? "100%" : 220, // ⬅ full width on small screens
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
    textTransform: "none",
    border: "1px solid #B2B5C4",
    borderRadius: "8px",
  };

  // Microsoft SVG icon style
  const microsoftIconStyle = {
    width: 20,
    height: 20,
    display: "block", // Prevent vertical misalignment due to line-height
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Section: Form Fields & Buttons */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box maxWidth="750px" mx="auto" width="100%">
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight={600}
            mb={4}
            fontSize={32}
            textAlign="center"
          >
            Sign in to your account
          </Typography>

          {/* Email & Password Fields */}
          <CustomTextField
            type="text"
            name="email"
            labelText="Email"
            placeholder="Username or Email ID"
            value=""
            onChange={() => {}}
          />
          <CustomTextField
            type="password"
            name="password"
            labelText="Password"
            placeholder="Enter Password"
            value=""
            onChange={() => {}}
          />

          {/* Sign In Button */}
          <Box display="flex" alignItems="center" gap={2} mt={2} mb={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6A42AB",
                textTransform: "none",
                px: 3,
                fontWeight: 600,
              }}
            >
              Sign In →
            </Button>
          </Box>

          <Divider>Sign in with</Divider>

          {/* Social Login Buttons */}
          <Box display="flex" gap={2} mt={3} flexWrap="wrap">
            {/* Facebook */}
            <Button
              // fullWidth
              sx={{ ...socialButtonStyle, color: "#0866FF" }}
              variant="outlined"
              startIcon={
                <img src={Facebook} alt="Facebook" style={microsoftIconStyle} />
              }
            >
              Facebook
            </Button>

            {/* Google */}
            <Button
              sx={{ ...socialButtonStyle, color: "#EA4335" }}
              variant="outlined"
              startIcon={
                <img src={Google} alt="Google" style={microsoftIconStyle} />
              }
            >
              Google
            </Button>

            {/* Microsoft */}
            <Button
              sx={{ ...socialButtonStyle, color: "#000000" }}
              variant="outlined"
              startIcon={
                <img
                  src={Microsoft}
                  alt="Microsoft"
                  style={microsoftIconStyle}
                />
              }
            >
              Microsoft
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* Right Section: Background Image */}
      {!isSmallScreen && (
        <Grid size={{ md: 6 }}>
          <Box
            sx={{
              height: "100%",
              backgroundImage: `url(${LoginPng})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
