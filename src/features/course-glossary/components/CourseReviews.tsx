import { Box, Button, Typography } from "@mui/material";
import StarRatings from "./StarRatings";
import UserTestimonial from "./UserTestimonial";

export default function CourseReviews() {
  const testimonials = [
    {
      name: "Mark Doe",
      rating: 5,
      date: "22nd March, 2024",
      review:
        "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      date: "15th March, 2024",
      review:
        "This course exceeded my expectations! The content is well-structured and the instructor explains everything clearly. I've learned so much and feel confident applying these skills in my work.",
    },
    {
      name: "Michael Chen",
      rating: 4,
      date: "10th March, 2024",
      review:
        "Great course overall. The practical exercises are very helpful. The only thing I'd improve is adding more advanced examples, but for beginners this is perfect.",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      date: "5th March, 2024",
      review:
        "Excellent course! The instructor is knowledgeable and the material is up-to-date. I've already recommended this to several colleagues.",
    },
    {
      name: "David Kim",
      rating: 5,
      date: "1st March, 2024",
      review:
        "One of the best courses I've taken. The step-by-step approach makes complex topics easy to understand. The community support is also fantastic.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        pt: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        <StarRatings />

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2.5, md: 3 },
            width: "100%",
            flex: 1,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <UserTestimonial
              key={index}
              name={testimonial.name}
              rating={testimonial.rating}
              date={testimonial.date}
              review={testimonial.review}
            />
          ))}

          <Box sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                border: "2px solid #E2E8F0",
                backgroundColor: "white",
                color: "#475569",
                fontSize: { xs: "13px", md: "14px" },
                padding: { xs: "10px 16px", md: "13px 24px" },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  borderColor: "#6A42AB",
                  color: "#6A42AB",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 6px rgba(106, 66, 171, 0.1)",
                },
              }}
            >
              View more reviews
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

