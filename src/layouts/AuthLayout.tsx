import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import Microsoft from "@icons/MicroSoftIcon.svg";
import Google from "@icons/google.svg";
import Facebook from "@icons/facebook.svg";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  imageSrc: string;
  imageOnLeft?: boolean;
  titleText: string;
  submitButtonText: string;
  dividerText: string;
  signUpBtnText?: string;
  signInBtnTxt?: string;
  onSubmit: () => void;
  renderFormFields: ReactNode;
  isLoading?: boolean;
  isOrgSignUp?: boolean;
  isUserSignUp?: boolean;
  isLogin?: boolean;
}

const AuthLayout = ({
  imageSrc,
  imageOnLeft = false,
  titleText,
  submitButtonText,
  signUpBtnText,
  dividerText,
  onSubmit,
  renderFormFields,
  isLoading,
  signInBtnTxt,
  isOrgSignUp = false,
  isUserSignUp = false,
  isLogin = false
}: AuthLayoutProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isExtraSmall = useMediaQuery("(max-width:568px)");

  const iconStyle = {
    width: 20,
    height: 20,
    display: "block",
  };

  const socialButtonStyle = {
    flex: "1 1 220px",
    minWidth: isExtraSmall ? "100%" : 220,
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
    textTransform: "none",
    border: "1px solid #B2B5C4",
    borderRadius: "8px",
  };

  const ImageSection = (
    <Grid item md={6} xs={12}>
      <Box
        sx={{
          height: "100%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isSmallScreen && imageOnLeft && ImageSection}
      <Grid item
        md={6}
        xs={12}
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
            {titleText}
          </Typography>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {/* Form Fields */}
            {renderFormFields}

            {/* Submit Button */}
            <Box display="flex" alignItems="center" gap={2} mt={2} mb={3}>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{
                  backgroundColor: "#6A42AB",
                  color: "#FFFFFF",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  boxShadow: "0px 6px 18px rgba(106, 66, 171, 0.35)",
                  transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#5B3798",
                    boxShadow: "0px 10px 24px rgba(106, 66, 171, 0.45)",
                  },
                  "&:active": {
                    backgroundColor: "#4A2C73",
                    boxShadow: "0px 2px 8px rgba(74, 44, 115, 0.4)",
                    color: "#FFFFFF",
                  },
                  "&:focus-visible": {
                    outline: "3px solid rgba(106, 66, 171, 0.35)",
                    outlineOffset: "2px",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#B8A1DE",
                    color: "#FFFFFF",
                    opacity: 0.95,
                  },
                }}
              >
                {isLoading ? "Loading..." : submitButtonText}
              </Button>
            </Box>
          </form>

          {/* Divider Text */}
          <Divider>{dividerText}</Divider>

          {/* Social Buttons */}
          <Box display="flex" gap={2} mt={3} flexWrap="wrap">
            <Button
              sx={{ ...socialButtonStyle, color: "#0866FF" }}
              variant="outlined"
              startIcon={
                <img src={Facebook} alt="Facebook" style={iconStyle} />
              }
            >
              Facebook
            </Button>
            <Button
              sx={{ ...socialButtonStyle, color: "#EA4335" }}
              variant="outlined"
              startIcon={<img src={Google} alt="Google" style={iconStyle} />}
            >
              Google
            </Button>
            <Button
              sx={{ ...socialButtonStyle, color: "#000000" }}
              variant="outlined"
              startIcon={
                <img src={Microsoft} alt="Microsoft" style={iconStyle} />
              }
            >
              Microsoft
            </Button>
          </Box>
          <Box display={"flex"} gap={2} width={"100%"}>
            <Box width={"100%"} >
              {isOrgSignUp && <Box display="flex" gap={2} mt={3} width={"100%"} flexWrap="nowrap">
                <Link
                  to={"/organization/create-account"}
                  style={{
                    width: "100%"
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                  >
                    Sign Up as Organization
                  </Button>
                </Link>
              </Box>}
              {isUserSignUp && <Box display="flex" gap={2} mt={3} flexWrap="nowrap">
                <Link
                  to={"/sign-up"}
                  style={{
                    width: "100%"
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                  >
                    {signUpBtnText ?? "Sign Up as User"}
                  </Button>
                </Link>
              </Box>}
            </Box>
            {isLogin && (
              <Box
                display="flex"
                gap={2}
                width={"100%"}
                mt={3}
                flexWrap="nowrap"
              >
                <Link
                  to={"/login"}
                  style={{
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#6A42AB",
                      color: "#FFFFFF",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#5B3798",
                      },
                      "&:active": {
                        backgroundColor: "#4A2C73",
                        color: "#FFFFFF",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#B8A1DE",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {signInBtnTxt ?? "Sign In"}
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>

      {!isSmallScreen && !imageOnLeft && ImageSection}
    </Grid>
  );
};

export default AuthLayout;