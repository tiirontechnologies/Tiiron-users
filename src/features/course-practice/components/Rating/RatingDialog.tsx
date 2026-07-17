import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import {
  useRateCourseMutation,
  useUpdateRatingMutation,
} from "../../api/courseProgressApi";
import feedbackGirl from "../../../../assets/feedback-girl.png"; 

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [step, setStep] = useState<"rating" | "review" | "thankyou">("rating");
  const [rating, setRating] = useState<number | null>(initialRating || 4);
  const [review, setReview] = useState(initialReview || "");

  const [rateCourse, { isLoading: isRating }] = useRateCourseMutation();
  const [updateRating, { isLoading: isUpdating }] = useUpdateRatingMutation();
  const isLoading = isRating || isUpdating;

  const orange = "#F97316";
  const orangeText = "#c2410c"; // darker shade — better contrast on white/transparent bg
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
        await updateRating(payload).unwrap();
      } else {
        await rateCourse(payload).unwrap();
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
              borderRadius: { xs: "16px", sm: "20px" },
              p: { xs: 3, sm: 4 },
              width: { xs: "92vw", sm: 420 },
              maxWidth: "420px",
              textAlign: "center",
              m: { xs: 1.5, sm: 3 },
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: { xs: 10, sm: 16 }, top: { xs: 10, sm: 16 }, color: "#6b7280" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              width: { xs: 52, sm: 60 },
              height: { xs: 52, sm: 60 },
              borderRadius: "16px",
              background: "#FFE7D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <StarIcon sx={{ color: orange, fontSize: { xs: 26, sm: 30 } }} />
          </Box>

          <Typography sx={{ fontSize: { xs: 20, sm: 24 }, fontWeight: 700 }}>
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
            sx={{ fontSize: { xs: 30, sm: 36 }, color: orange, mb: 3 }}
          />

          <Button
            fullWidth
            disabled={isLoading}
            onClick={() => handleSubmit(false)}
            sx={{
              background: "linear-gradient(90deg,#f97316,#b45309) !important",
              color: "#fff !important",
              borderRadius: "12px !important",
              py: "12px !important",
              fontWeight: "600 !important",
              boxShadow: "none !important",
              "&:hover": {
                background: "linear-gradient(90deg,#ea580c,#92400e) !important",
              },
            }}
          >
            {isLoading ? "Submitting..." : "Submit Rating"}
          </Button>

          <Typography
            onClick={() => setStep("review")}
            sx={{ mt: 2, fontSize: 13, color: "#111827", cursor: "pointer", fontWeight: 500 }}
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
            sx: {
              borderRadius: { xs: "16px", sm: "20px" },
              p: { xs: 2, sm: 3 },
              width: { xs: "92vw", sm: 480 },
              maxWidth: "480px",
              m: { xs: 1.5, sm: 3 },
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: { xs: 8, sm: 12 }, top: { xs: 8, sm: 12 }, color: "#6b7280" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 }, pr: 3 }}>
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
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 1, sm: 0 },
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
                color: orangeText,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              CHANGE RATING
            </Typography>
          </Box>

          <Typography fontSize={12} color="#6b7280" mb={1} fontWeight={600}>
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

          <Box
            mt={3}
            display="flex"
            flexDirection={{ xs: "column-reverse", sm: "row" }}
            gap={{ xs: 1.5, sm: 0 }}
            justifyContent="space-between"
          >
            <Button
              onClick={() => setStep("rating")}
              sx={{
                background: "transparent !important",
                color: `${orangeText} !important`,
                border: `1.5px solid ${orange} !important`,
                px: "16px !important",
                borderRadius: "10px !important",
                boxShadow: "none !important",
                width: { xs: "100%", sm: "auto" },
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
                width: { xs: "100%", sm: "auto" },
                "&:hover": { background: "#ea580c !important" },
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
          fullWidth
          maxWidth="md"
          fullScreen={isMobile}
          PaperProps={{
            sx: { borderRadius: { xs: 0, sm: "20px" }, overflow: "hidden" },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{ width: "100%", height: { xs: "100%", sm: 500 } }}
          >
            {/* IMAGE */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                height: { xs: 160, sm: "auto" },
                position: "relative",
                backgroundImage: `url(${feedbackGirl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
            />

            {/* RIGHT CONTENT */}
            <Box sx={{ width: { xs: "100%", sm: "60%" }, p: { xs: 2.5, sm: 3 }, overflowY: "auto" }}>
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
                <Typography sx={{ color: orangeText }}>✔</Typography>
              </Box>

              <Typography sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 700 }}>
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
                  <Rating value={rating} readOnly sx={{ color: orange }} />
                  <Typography
                    fontSize={10}
                    sx={{
                      background: "#e5e7eb",
                      color: "#374151",
                      px: 1,
                      py: 0.3,
                      borderRadius: "8px",
                      fontWeight: 600,
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
              <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={1.5} mb={2}>
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
                    "&:hover": {
                      background: "#ea580c !important",
                      color: "#fff !important",
                    },
                  }}
                >
                  Save and Exit
                </Button>

                <Button
                  onClick={() => setStep("review")}
                  sx={{
                    flex: 1,
                    background: "transparent !important",
                    color: `${orangeText} !important`,
                    border: `1.5px solid ${orange} !important`,
                    borderRadius: "10px !important",
                    textTransform: "none !important",
                    fontWeight: "600 !important",
                    boxShadow: "none !important",
                    "&:hover": {
                      background: "rgba(249,115,22,0.08) !important",
                      color: `${orangeText} !important`,
                    },
                  }}
                >
                  Edit Review
                </Button>
              </Box>

              {/* SHARE TAGS */}
              <Typography fontSize={11} color="#6b7280" mb={1} fontWeight={600}>
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
                        color: "#374151",
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