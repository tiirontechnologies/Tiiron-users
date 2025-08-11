import { Avatar, Box, Button, Container, IconButton, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import { useGetChaptersQuery, useGetCourseByCourseIdQuery } from "../../api/api";
import Loader from "@components/ui/Spinner";

export default function CourseGlossary() {
  const { courseId } = useParams();
  if (!courseId) return <Box>No Course Found or Invalid Course Id...</Box>;
  const { data, isLoading, isError } = useGetCourseByCourseIdQuery({ id: courseId || "1" });
  const { data: chapters } = useGetChaptersQuery({ id: courseId || "1" });
  console.log(data, chapters);
  return (
    <Container style={{ backgroundColor: "white", height: "100%" }} maxWidth="xl">
      {isLoading ? <Loader /> : isError ? <Box>Some error occured...</Box> : <Header course={data?.data} />}
      {isLoading ? <Loader /> : isError ? <Box>Some error occured...</Box> : <Box sx={{ width: "840px", paddingInlineStart: "80px", paddingBlockStart: "40px" }}>
        <Box sx={{ borderBottom: "1px solid gray", paddingBlock: "24px", display: "flex", gap: "24px" }}>
          <Button
            disableElevation
            sx={{
              backgroundColor: '#F1E5FF',
              color: '#333',
              fontSize: '14px',
              padding: '18px 40px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#e8d7fa', // Optional softer hover
                boxShadow: 'none',
              },
            }}
          >
            Overview
          </Button>
          <Button
            disableElevation
            sx={{
              backgroundColor: "transparent",
              color: "#000",
              fontSize: "14px",
              padding: "18px 40px",
              textTransform: "none",
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                borderColor: "#d5d5d5",
              },
            }}

          >
            Lessons
          </Button>
          <Button
            disableElevation
            sx={{
              backgroundColor: "transparent",
              color: "#000",
              fontSize: "14px",
              padding: "18px 40px",
              textTransform: "none",
              border: "1px solid #e0e0e0",
              boxShadow: "none",
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "none",
                borderColor: "#d5d5d5",
              },

            }}
          >
            Reviews
          </Button>
        </Box>
        <Box sx={{ borderBottom: "1px solid gray", paddingBlock: "24px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>Overview</Typography>
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            This course is meticulously crafted to provide you with a
            foundational understanding of the principles, methodologies, and tools that drive exceptional
            user experiences in the digital landscape.
          </Typography>
        </Box>
        <Box sx={{ borderBottom: "1px solid gray", paddingBlock: "24px", display: "grid", gap: "14px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>Lessons</Typography>
          <CourseGlossaryAccordion chapters={chapters?.data?.chapters} />
        </Box>
      </Box>}
      <Box sx={{ borderBottom: "1px solid gray", paddingInlineStart: "80px", paddingBlockStart: "40px", display: "grid", gap: "24px", width: "100%" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>Learner Reviews</Typography>
        <Box sx={{ display: "flex", gap: "139px" }}>
          <StarRatings />
          <Box sx={{ display: "grid", gap: "16px" }}>
            <UserTestimonial />
            <UserTestimonial />
            <UserTestimonial />
            <UserTestimonial />
            <UserTestimonial />
            <Box>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "14px",
                  padding: "13px 24px",
                  textTransform: "none",
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: "#f5f5f5",
                    borderColor: "black",
                  },
                }}
              >
                View more reviews
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
export function Header({ course }: { course: any }) {
  return <Box sx={{ bgcolor: "#FBF8FF", paddingInline: "80px", display: "flex" }}>
    <Box sx={{ paddingBlock: "40px", paddingBottom: "93px", gap: "24px", display: "flex", flexDirection: "column", }}>
      <Box sx={{ width: "840px", display: "flex", flexDirection: "column", gap: "17px" }}>
        <Typography
          variant="subtitle2"
          mb={0.5}
          sx={{ color: "#0F172A", fontWeight: 700, fontSize: "40px" }}
        >
          {course?.title}
        </Typography>
        <Typography variant="body1" sx={{ width: "729px" }}>
          {course?.description}
        </Typography>
      </Box>
      <Box sx={{ width: "840px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <Typography
          variant="subtitle2"
          mb={0.5}
          sx={{ color: "#0F172A", fontWeight: 500, fontSize: "14px" }}
        >
          4.6 {Array(5).fill(null).map(_ => <img src="src/assets/icons/Vector.svg" />)} (651651 rating) | 22 Total Hours. 155 Lectures. All levels
        </Typography>
        <Typography variant="body1" sx={{ width: "729px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <Avatar
              alt="Lindsey Curtis"
              src="src/assets/images/avatarUser.png"
              sx={{ width: 40, height: 40 }}
            />
          </Box>
          Created by {course?.createdBy}
        </Typography>
        <Typography variant="body1" sx={{ width: "729px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Box
            sx={{
              width: 20,
              height: 20,
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <Avatar
              alt="Lindsey Curtis"
              src="src/assets/icons/Icon.svg"
              sx={{ width: 20, height: 20 }}
            />
          </Box>
          English, Spanish, Italian, German
        </Typography>
      </Box>
    </Box>
    <Box sx={{ paddingBlock: "40px", width: "100%", gap: "24px", display: "flex", flexDirection: "column", position: "relative" }}>
      <Box sx={{ position: "absolute", top: "90px", right: 20 }}>
        <ProductCard />
      </Box>
    </Box>
  </Box>
}
export function ProductCard() {
  return (
    <Box
      sx={{
        maxWidth: "400px",
        width: '400px',
        borderRadius: 2,
        border: '1px solid #d1d5db',
        p: 3,
        bgcolor: "white"
      }}
    >
      <Box
        component="img"
        src="https://storage.googleapis.com/a1aa/image/f118b4ff-1d1d-4866-b19b-3fed21951cfb.jpg"
        alt="Man sitting at desk with laptop, Figma logo and UI design on screen"
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="600">
          $49.5
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textDecoration: 'line-through', color: "gray" }}
        >
          $99.5
        </Typography>
        <Typography variant="body1" color="green" fontWeight="600">
          50% Off
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#6A42AB',
          color: '#fff',
          py: 1.5,
          mb: 2,
          '&:hover': { bgcolor: '#6A42AB' },
        }}
      >
        Add To Cart
      </Button>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          borderColor: 'black',
          color: 'black',
          py: 1.5,
          mb: 2,
          '&:hover': {
            bgcolor: '#f3f4f6',
            borderColor: 'black',
          },
        }}
      >
        Buy Now
      </Button>

      <hr />

      <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
        Share
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#6A42AB',
            '&:hover': { bgcolor: '#e0f2ff' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="src/assets/icons/facebook.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#000',
            '&:hover': { bgcolor: '#f5f5f5' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="src/assets/icons/Icon.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#EA4335',
            '&:hover': { bgcolor: '#fdecea' },
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt="Lindsey Curtis"
            src="src/assets/icons/google.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#000',
            '&:hover': { bgcolor: '#f5f5f5' },
            width: 40,
            height: 40,
          }}
        >
          {/* Replace this with actual X (Twitter) icon if needed */}
          <Avatar
            alt="Lindsey Curtis"
            src="src/assets/icons/MicroSoftIcon.svg"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          sx={{
            border: '1px solid #d1d5db',
            color: '#f97316',
            '&:hover': { bgcolor: '#fff7ed' },
            width: 40,
            height: 40,
            p: 0.5,
          }}
        >
          <Avatar
            src="https://storage.googleapis.com/a1aa/image/ad05c61d-49ba-4271-5d7a-3a7ab66f2d01.jpg"
            alt="Microsoft logo"
            sx={{ width: 20, height: 20 }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export function CourseGlossaryAccordion({ chapters }: { chapters?: any[] }) {
  return (
    <div>
      {chapters?.length && chapters?.map((item, idx) => (<Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          key={idx}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Left side: Icon + Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ExpandMoreIcon />
              <Typography sx={{ py: '18px' }}>{item?.title}</Typography>
            </Box>

            {/* Right-aligned text */}
            <Typography sx={{ color: "gray", fontSize: "14px" }} color="text.secondary">{item?.units?.length} Lessons</Typography>
          </Box>
        </AccordionSummary>
        {item?.units?.length && item?.units?.map((unit: any, idx: number) => (
          <AccordionDetails key={idx}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid lightgray',
                borderRadius: '8px',
                padding: '12px 24px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography>{unit?.title}</Typography>
              <Button variant="contained" color="primary">Start</Button>
            </Box>
          </AccordionDetails>
        ))}

      </Accordion>))}
    </div>
  );
}

export function UserTestimonial() {
  return <Box
    sx={{
      maxWidth: '949px', // ~1024px (Tailwind's max-w-4xl)
      width: '949px',
      bgcolor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: 3,
      p: 3,
      display: 'flex',
      gap: 3,
      boxShadow: 1,
      paddingBlock: "24px",
      paddingInline: "22px"
    }}
  >
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "272px" }}>
        <Avatar
          src="https://storage.googleapis.com/a1aa/image/5147a9f3-030f-476c-1cb6-9f5e4c04e342.jpg"
          alt="Mark Doe"
          sx={{ width: 60, height: 60, flexShrink: 0 }}
        />
        <Typography fontWeight={600} color="text.primary" fontSize={16} lineHeight={1.5}>
          Mark Doe
        </Typography>
      </Box>

    </Box>
    {/* Review Section */}
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, flex: 1, width: "631px" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: '4px' }}>
          <Avatar
            alt="Lindsey Curtis"
            src="src/assets/icons/Vector.svg"
            sx={{ width: 16, height: 16 }}
          />
          <Typography fontWeight={600} sx={{ color: 'black', fontWeight: 700, fontSize: 16 }}>
            5
          </Typography>
        </Box>
        <Typography color="text.secondary" fontSize={14}>
          Reviewed on 22nd March, 2024
        </Typography>
      </Box>
      <Typography color="text.primary" fontSize={16} lineHeight={1.7}>
        I was initially apprehensive, having no prior design experience. But the instructor,
        John Doe, did an amazing job of breaking down complex concepts into easily digestible
        modules. The video lectures were engaging, and the real-world examples really helped
        solidify my understanding.
      </Typography>
    </Box>
  </Box>
}

export function StarRatings() {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 5 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];
  return (
    <Box width="100%" maxWidth={300} display="flex" flexDirection="column" gap={3}>
      {/* Top Rating Summary */}
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar
          alt="Lindsey Curtis"
          src="src/assets/icons/Vector.svg"
          sx={{ width: 20, height: 20 }}
        />
        <Typography fontWeight={600} fontSize={20} lineHeight={1}>
          4.6
        </Typography>
        <Typography color="text.secondary" fontSize={14} fontWeight={500} lineHeight={1}>
          146,951 reviews
        </Typography>
      </Box>

      {/* Rating Rows */}
      <Box display="flex" flexDirection="column" gap={1}>
        {ratings.map((rating, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Box display="flex" gap={0.5} color="warning.main">
              {[...Array(5)].map((_, i) =>
                i < rating.stars ? (
                  <Avatar
                    alt="Lindsey Curtis"
                    src="src/assets/icons/Vector.svg"
                    sx={{ width: 14, height: 14 }}
                  />
                ) : (
                  <Avatar
                    alt="Lindsey Curtis"
                    src="src/assets/icons/Vector.svg"
                    sx={{ width: 14, height: 14 }}
                  />
                )
              )}
            </Box>
            <Typography fontSize={14} fontWeight={600} color="text.primary">
              {rating.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

}