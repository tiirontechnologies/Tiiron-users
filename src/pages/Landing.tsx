import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3rem" },
                color: "#1f2937",
              }}
            >
              Welcome to Tiiron
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: "#6b7280",
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              Your comprehensive Learning Management System for creating, managing, and delivering
              engaging educational content.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  backgroundColor: "#6A42AB",
                  "&:hover": { backgroundColor: "#5a3599" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/about")}
                sx={{
                  borderColor: "#6A42AB",
                  color: "#6A42AB",
                  "&:hover": { borderColor: "#5a3599" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 300, md: 400 },
                backgroundColor: "#e5e7eb",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Image Placeholder
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "white", py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: 6, color: "#1f2937" }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Course Management",
                description: "Create and organize courses with ease, manage content, and track learner progress.",
              },
              {
                title: "Interactive Learning",
                description: "Engage learners with interactive content, quizzes, and practice exercises.",
              },
              {
                title: "Analytics & Reports",
                description: "Get detailed insights into learner performance and course effectiveness.",
              },
              {
                title: "Multi-tenant Support",
                description: "Manage multiple organizations, courses, and learners from a single platform.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1f2937" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: "#6A42AB", py: { xs: 4, md: 8 }, color: "white" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of educators using Tiiron to deliver exceptional learning experiences.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/organization/create-account")}
            sx={{
              backgroundColor: "white",
              color: "#6A42AB",
              "&:hover": { backgroundColor: "#f3f4f6" },
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            Create Your Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;

