import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExploreIcon from "@mui/icons-material/Explore";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Chip,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(circle at top right, ${alpha(
          theme.palette.primary.light,
          0.1
        )} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
      }}
    >
      <title>404 - Page not found | Tiiron</title>
      <Navbar />

      {/* Background gradients */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%, ${alpha(
            theme.palette.primary.main,
            0.25
          )}, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${alpha(
            "#22d3ee",
            0.25
          )}, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Main Section */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          py: { xs: 4, md: 6 },
          pb: { md: 0 },
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center" sx={{ width: "100%" }}>
          {/* Header Chip */}
          <Chip
            icon={<AutoAwesomeIcon />}
            label="Let's get you back on track"
            sx={{
              background: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              fontWeight: 600,
              px: 2,
              py: 0.4,
              borderRadius: "999px",
              fontSize: "0.9rem",
            }}
          />

          {/* 404 Heading */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "3rem", md: "4.5rem" },
                background:
                  "linear-gradient(135deg, #2563eb 0%, #7c3aed 45%, #0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0,
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Subheading + Text */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              We couldn’t find that page
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 550,
                mx: "auto",
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              The page you're looking for might have been moved or deleted. Let’s get you back to where learning happens.
            </Typography>
          </motion.div>

          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <Card
              sx={{
                mx: "auto",
                maxWidth: 720,
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                backdropFilter: "blur(10px)",
                background: alpha(theme.palette.background.paper, 0.9),
              }}
            >
              <CardContent sx={{ px: { xs: 3, md: 5 }, py: { xs: 3, md: 4 } }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 3, md: 4 }}
                  justifyContent="center"
                  alignItems="stretch"
                >
                  {/* Back to Home */}
                  <Stack alignItems="center" spacing={1} sx={{ flex: 1 }}>
                    <SearchIcon
                      sx={{
                        fontSize: 44,
                        color: theme.palette.primary.main,
                        background: alpha(theme.palette.primary.main, 0.08),
                        borderRadius: 2,
                        p: 1,
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Back to Home
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explore new updates and features on Tiiron’s homepage.
                    </Typography>
                    <Button
                      component={Link}
                      to="/"
                      startIcon={<ArrowBackIosNewIcon fontSize="small" />}
                      variant="contained"
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                        py: 0.8,
                        background:
                          "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                        boxShadow: "0 6px 18px rgba(99,102,241,0.25)",
                        "&:hover": {
                          boxShadow: "0 8px 22px rgba(99,102,241,0.35)",
                        },
                      }}
                    >
                      Go Home
                    </Button>
                  </Stack>

                  {/* Divider */}
                  <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={{ my: isMobile ? 2 : 0 }}
                  />

                  {/* Explore Courses */}
                  <Stack alignItems="center" spacing={1} sx={{ flex: 1 }}>
                    <ExploreIcon
                      sx={{
                        fontSize: 44,
                        color: "#0ea5e9",
                        background: alpha("#0ea5e9", 0.08),
                        borderRadius: 2,
                        p: 1,
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Browse Courses
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Discover AI-powered recommendations just for you.
                    </Typography>
                    <Button
                      component={Link}
                      to="/learner/browse-courses"
                      variant="outlined"
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 3,
                        py: 0.8,
                        borderColor: alpha("#0ea5e9", 0.6),
                        color: "#0ea5e9",
                        "&:hover": {
                          borderColor: "#0ea5e9",
                          backgroundColor: alpha("#0ea5e9", 0.08),
                        },
                      }}
                    >
                      Explore
                    </Button>
                  </Stack>
                </Stack>

                {/* Divider */}
                <Divider sx={{ my: { xs: 2.5, md: 3 } }} />

                {/* Support Section */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    textAlign={{ xs: "center", md: "left" }}
                  >
                    <SupportAgentIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: 26,
                      }}
                    />
                    <Box>
                      <Typography fontWeight={600}>Need support?</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Our team is here to help you right away.
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      px: 3,
                      py: 0.8,
                      background: "linear-gradient(135deg, #22c55e, #14b8a6)",
                      boxShadow: "0 6px 16px rgba(34,197,94,0.25)",
                      "&:hover": {
                        boxShadow: "0 8px 20px rgba(34,197,94,0.35)",
                      },
                    }}
                  >
                    Contact Support
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>

          {/* Go Back */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Want to go back?
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Previous page →
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
};

export default NotFound;
