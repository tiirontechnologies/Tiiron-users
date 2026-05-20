import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import {
  useRateCourseMutation,
  useUpdateRatingMutation,
} from "../../api/courseProgressApi";

interface Props {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
  initialRating?: number;
  initialReview?: string;
}

const RatingDialog: React.FC<Props> = ({
  open,
  onClose,
  isUpdate,
  initialRating,
  initialReview,
}) => {
  const [step, setStep] = useState<"rating" | "review" | "thankyou">("rating");
  const [rating, setRating] = useState<number | null>(initialRating || 4);
  const [review, setReview] = useState(initialReview || "");

  const [rateCourse, { isLoading: isRating }] = useRateCourseMutation();
  const [updateRating, { isLoading: isUpdating }] = useUpdateRatingMutation();
  const isLoading = isRating || isUpdating;

  const orange = "#F97316";
  const { courseId } = useParams();

const prevOpenRef = React.useRef(false);

useEffect(() => {
  if (open && !prevOpenRef.current) {
    setStep("rating");
    setRating(initialRating || 4);
    setReview(initialReview || "");
  }
  prevOpenRef.current = open;
}, [open]);

  const handleSubmit = async (withReview: boolean) => {
    try {
      const payload = {
        courseId: courseId,
        value: rating,
        review: withReview ? review : null,
      };

      if (isUpdate) {
        await updateRating(payload).unwrap(); // ✅ hook variable
      } else {
        await rateCourse(payload).unwrap();   // ✅ hook variable
      }

      if (withReview) {
        setStep("thankyou");
      } else {
        onClose();
      }
    } catch (err) {
      console.error("Rating submit error:", err);
    }
  };

  const handleClose = () => {
    setStep("rating");
    onClose();
  };

  const backdropProps = {
    sx: {
      backdropFilter: "blur(6px)",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  };

  return (
    <>
      {/* ================= RATING ================= */}
      {step === "rating" && (
        <Dialog
          open={open}
          onClose={handleClose}
          BackdropProps={backdropProps}
          PaperProps={{
            sx: {
              borderRadius: "20px",
              p: 4,
              width: 420,
              textAlign: "center",
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            ✕
          </IconButton>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "16px",
              background: "#FFE7D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <StarIcon sx={{ color: orange, fontSize: 30 }} />
          </Box>

          <Typography fontSize={24} fontWeight={700}>
            How would you rate this course?
          </Typography>

          <Typography sx={{ fontSize: 14, color: "#6b7280", mt: 1, mb: 3 }}>
            Your feedback helps us refine the curriculum and empowers other
            students.
          </Typography>

          <Rating
            value={rating}
            onChange={(_, val) => setRating(val)}
            size="large"
            sx={{ fontSize: 36, color: orange, mb: 3 }}
          />

          <Button
            fullWidth
            disabled={isLoading}
            onClick={() => handleSubmit(false)}
            sx={{
              background:
                "linear-gradient(90deg,#f97316,#b45309) !important",
              color: "#fff !important",
              borderRadius: "12px !important",
              py: "12px !important",
              fontWeight: "600 !important",
              boxShadow: "none !important",
              "&:hover": {
                background:
                  "linear-gradient(90deg,#ea580c,#92400e) !important",
              },
            }}
          >
            {isLoading ? "Submitting..." : "Submit Rating"}
          </Button>

          <Typography
            onClick={() => setStep("review")}
            sx={{ mt: 2, fontSize: 13, color: "#0c0303", cursor: "pointer" }}
          >
            Leave a written review
          </Typography>

          <Typography sx={{ mt: 4, fontSize: 11, color: "#9ca3af" }}>
            Powered by Tiiron Technologies Pvt Ltd. | Version 1.2.0
          </Typography>
        </Dialog>
      )}

      {/* ================= REVIEW ================= */}
      {step === "review" && (
        <Dialog
          open={open}
          onClose={handleClose}
          BackdropProps={backdropProps}
          PaperProps={{
            sx: { borderRadius: "20px", p: 3, width: 480 },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            ✕
          </IconButton>

          <Typography fontWeight={700} fontSize={20}>
            Why did you leave this rating?
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 2 }}>
            Your feedback helps improve future experience.
          </Typography>

          <Box
            sx={{
              background: "#f9fafb",
              p: 2,
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Rating
              value={rating}
              onChange={(_, val) => setRating(val)}
              sx={{ color: orange }}
            />
            <Typography
              onClick={() => setStep("rating")}
              sx={{
                fontSize: 12,
                color: orange,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              CHANGE RATING
            </Typography>
          </Box>

          <Typography fontSize={12} color="#9ca3af" mb={1}>
            DETAILED COMMENT
          </Typography>

          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="What aspects did you like? Any improvements?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ background: "#f9fafb", borderRadius: 2 }}
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              onClick={() => setStep("rating")}
           sx={{
    background: "transparent !important",
    color: `${orange} !important`,
    border: `1.5px solid ${orange} !important`,
    px: "16px !important",
    borderRadius: "10px !important",
    boxShadow: "none !important",
    "&:hover": { background: "rgba(249,115,22,0.08) !important" },
  }}
            >
              Back
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => handleSubmit(true)}
              sx={{
                background: `${orange} !important`,
                color: "#fff !important",
                px: "16px !important",
                borderRadius: "10px !important",
                boxShadow: "none !important",
                "&:hover": { background: `${orange} !important` },
              }}
            >
              {isLoading ? "Saving..." : "Save and Continue"}
            </Button>
          </Box>
        </Dialog>
      )}

      {/* ================= THANK YOU ================= */}
      {step === "thankyou" && (
        <Dialog
          open={open}
          onClose={handleClose}
          BackdropProps={backdropProps}
          maxWidth="md"
          PaperProps={{
            sx: { borderRadius: "20px", overflow: "hidden" },
          }}
        >
          <Box display="flex" width={720} height={500}>
            {/* LEFT IMAGE */}
            <Box
              sx={{
                width: "40%",
                position: "relative",
                backgroundImage: `url("https://images.unsplash.com/photo-1607746882042-944635dfe10e")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  p: 2,
                  color: "#fff",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              />
            </Box>

            {/* RIGHT CONTENT */}
            <Box sx={{ width: "60%", p: 3 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "#fff7ed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <Typography color="#f97316">✔</Typography>
              </Box>

              <Typography fontSize={20} fontWeight={700}>
                Thanks for helping our community!
              </Typography>

              <Typography fontSize={13} color="#6b7280" mt={1} mb={2}>
                Your review has been published. Community feedback is the
                cornerstone of the <b>Illuminated Mentor</b> experience.
              </Typography>

              {/* REVIEW CARD */}
              <Box
                sx={{
                  background: "#f3f4f6",
                  p: 2,
                  borderRadius: "12px",
                  mb: 2,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Rating value={rating} readOnly sx={{ color: "#f97316" }} />
                  <Typography
                    fontSize={10}
                    sx={{
                      background: "#e5e7eb",
                      px: 1,
                      py: 0.3,
                      borderRadius: "8px",
                    }}
                  >
                    CURRENT REVIEW
                  </Typography>
                </Box>
                <Typography fontSize={12} mt={1} color="#374151">
                  "{review}"
                </Typography>
              </Box>

              {/* BUTTONS */}
              <Box display="flex" gap={2} mb={2}>
              <Button
  onClick={handleClose}
 sx={{
    flex: 1,
     background: `${orange} !important`,
                color: "#fff !important",
    border: "1.5px solid #f97316 !important",
    borderRadius: "10px !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    boxShadow: "none !important",
    "&:hover": {   background: `${orange} !important`,
                color: "#fff !important", },
  }}
>
  Save and Exit
</Button>

               <Button
  onClick={() => setStep("review")}
  sx={{
    flex: 1,
    background: "transparent !important",
    color: "#f97316 !important",
    border: "1.5px solid #f97316 !important",
    borderRadius: "10px !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    boxShadow: "none !important",
    "&:hover": {background: "transparent !important", color: "#f97316 !important", },
  }}
>
  Edit Review
</Button>
              </Box>

              {/* SHARE TAGS */}
              <Typography fontSize={11} color="#9ca3af" mb={1}>
                SHARE ACHIEVEMENT
              </Typography>

              <Box display="flex" gap={1} flexWrap="wrap">
                {["#UIUXDesign", "#DigitalLearning", "#Mentorship"].map(
                  (tag) => (
                    <Box
                      key={tag}
                      sx={{
                        fontSize: 11,
                        px: 1.2,
                        py: 0.5,
                        background: "#f3f4f6",
                        borderRadius: "20px",
                      }}
                    >
                      {tag}
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default RatingDialog;