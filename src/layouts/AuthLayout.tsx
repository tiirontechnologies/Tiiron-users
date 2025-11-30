import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { ReactNode, useState } from "react";
import Microsoft from "@icons/MicroSoftIcon.svg";
import Google from "@icons/google.svg";
import Facebook from "@icons/facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithMicrosoft,
} from "../features/auth/firebaseAuth";

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
  const navigate = useNavigate();
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleOAuthSignIn = async (
    provider: "google" | "facebook" | "microsoft"
  ) => {
    try {
      setOauthLoading(provider);
      let user;

      switch (provider) {
        case "google":
          user = await signInWithGoogle();
          break;
        case "facebook":
          user = await signInWithFacebook();
          break;
        case "microsoft":
          user = await signInWithMicrosoft();
          break;
      }

      // Double-check email is present (additional safety check)
      // Check both user.email and providerData for email
      const userEmail = user.email || user.providerData?.[0]?.email;
      if (!userEmail) {
        // Try reloading user data once more
        await user.reload();
        const reloadedEmail = user.email || user.providerData?.[0]?.email;
        if (!reloadedEmail) {
          throw new Error(
            "Email is required to sign in. Please ensure your account has an email address and grant the necessary permissions."
          );
        }
      }

      setSnackbar({
        open: true,
        message: `Successfully signed in with ${provider}!`,
        severity: "success",
      });

      // Navigation will be handled by the auth listener
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      console.error(`${provider} sign-in error:`, error);

      // Determine user-friendly error message
      let errorMessage = error.message || `Failed to sign in with ${provider}`;

      // Provide specific guidance based on error
      if (error.message && error.message.includes("Email is required")) {
        errorMessage = error.message;
      } else if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in was cancelled. Please try again.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email. Please sign in using the original method.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked. Please allow popups for this site and try again.";
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setOauthLoading(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
                  backgroundColor: "#4F39F6",
                  color: "#FFFFFF",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                  boxShadow: "0px 6px 18px rgba(79, 57, 246, 0.35)",
                  transition: "background-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#3E2DC4",
                    color: "#FFFFFF",
                    boxShadow: "0px 10px 24px rgba(79, 57, 246, 0.45)",
                  },
                  "&:active": {
                    backgroundColor: "#3E2DC4",
                    boxShadow: "0px 2px 8px rgba(79, 57, 246, 0.4)",
                    color: "#FFFFFF",
                  },
                  "&:focus-visible": {
                    outline: "3px solid rgba(79, 57, 246, 0.35)",
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
              onClick={() => handleOAuthSignIn("facebook")}
              disabled={oauthLoading !== null}
              startIcon={
                <img src={Facebook} alt="Facebook" style={iconStyle} />
              }
            >
              {oauthLoading === "facebook" ? "Loading..." : "Facebook"}
            </Button>
            <Button
              sx={{ ...socialButtonStyle, color: "#EA4335" }}
              variant="outlined"
              onClick={() => handleOAuthSignIn("google")}
              disabled={oauthLoading !== null}
              startIcon={<img src={Google} alt="Google" style={iconStyle} />}
            >
              {oauthLoading === "google" ? "Loading..." : "Google"}
            </Button>
            <Button
              sx={{ ...socialButtonStyle, color: "#000000" }}
              variant="outlined"
              onClick={() => handleOAuthSignIn("microsoft")}
              disabled={oauthLoading !== null}
              startIcon={
                <img src={Microsoft} alt="Microsoft" style={iconStyle} />
              }
            >
              {oauthLoading === "microsoft" ? "Loading..." : "Microsoft"}
            </Button>
          </Box>

          {/* Snackbar for OAuth notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
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
                      backgroundColor: "#4F39F6",
                      color: "#FFFFFF",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#3E2DC4",
                        color: "#FFFFFF",
                      },
                      "&:active": {
                        backgroundColor: "#3E2DC4",
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