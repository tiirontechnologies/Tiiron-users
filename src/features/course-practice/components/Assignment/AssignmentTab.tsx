
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Skeleton,
  Paper,
  Alert,
  Chip,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssignmentIcon from "@mui/icons-material/Assignment";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GradeIcon from "@mui/icons-material/Grade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import {
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
} from "../../api/courseProgressApi";

const isValidDriveLink = (url: string) =>
  url.includes("drive.google.com") || url.includes("docs.google.com");

// ─── Types ────────────────────────────────────────────────────────────────────
interface AssignmentItem {
  id: number;
  title: string;
  description?: string;
  maxMarks: number;
  driveLink?: string;
  driveUrl?: string;
  submissions?: Array<{
    id: number;
    submissionUrl: string;
    marks: number | null;
    feedback: string | null;
  }>;
submission?: { submissionUrl: string; marks: number | null; feedback: string | null };
  submissionUrl?: string;
}

interface AssignmentCardProps {
  assignment: AssignmentItem;
  refetch: () => void;
}

// ─── Single Assignment Card ───────────────────────────────────────────────────
const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, refetch }) => {
  const [driveLink, setDriveLink] = useState("");
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState("");

  const [submitAssignment, { isLoading: isSubmitting }] =
    useSubmitAssignmentMutation();

  // Backend returns only the logged-in user's own submission
  const userSubmission =
    assignment.submissions?.[0] ||
    assignment.submission ||
    (assignment.submissionUrl
      ? { submissionUrl: assignment.submissionUrl, marks: null, feedback: null }
      : null);

  const alreadySubmitted = !!userSubmission || justSubmitted;
  const effectiveUrl = userSubmission?.submissionUrl || submittedUrl;

  const handleSubmit = async () => {
    if (!driveLink.trim()) {
      setError("Please enter Google Drive link");
      return;
    }
    if (!isValidDriveLink(driveLink)) {
      setError("Please enter a valid Google Drive link");
      return;
    }
    try {
      await submitAssignment({
        assignmentId: assignment.id,
        submissionUrl: driveLink.trim(),
      }).unwrap();
      setSubmittedUrl(driveLink.trim());
      setJustSubmitted(true);
      setDriveLink("");
      setError("");
      refetch();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to submit assignment");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* ── Card Header (click to expand/collapse) ── */}
      <Box
        onClick={() => setExpanded((p) => !p)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          cursor: "pointer",
          bgcolor: expanded ? "#f8f9ff" : "#fff",
          borderBottom: expanded ? "1px solid #E5E7EB" : "none",
          transition: "background 0.2s",
          "&:hover": { bgcolor: "#f0f3ff" },
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "#e8eaf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AssignmentIcon sx={{ color: "#3949ab", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography fontWeight={700} fontSize={15} color="#1a237e">
              {assignment.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.3}>
              <Chip
                icon={<GradeIcon sx={{ fontSize: "13px !important" }} />}
                label={`${assignment.maxMarks} marks`}
                size="small"
                sx={{ bgcolor: "#e8eaf6", color: "#3949ab", fontWeight: 600, fontSize: 11 }}
              />
              {alreadySubmitted && (
                <Chip
                  icon={<CheckCircleOutlineIcon sx={{ fontSize: "13px !important" }} />}
                  label={
                    userSubmission?.marks != null
                      ? `Scored: ${userSubmission.marks}/${assignment.maxMarks}`
                      : "Submitted"
                  }
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 600, fontSize: 11 }}
                />
              )}
            </Box>
          </Box>
        </Box>
        {expanded ? (
          <ExpandLessIcon sx={{ color: "#9fa8da" }} />
        ) : (
          <ExpandMoreIcon sx={{ color: "#9fa8da" }} />
        )}
      </Box>

      {/* ── Expandable Body ── */}
      {expanded && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          {/* LEFT — Assignment Details */}
          <Box
            sx={{
              p: 3,
              borderRight: { md: "1px solid #E5E7EB" },
              borderBottom: { xs: "1px solid #E5E7EB", md: "none" },
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#9fa8da", fontWeight: 700, letterSpacing: 1, fontSize: 11 }}
            >
              Instructions
            </Typography>

            {assignment.description && (
              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.8, mt: 1, mb: 2.5, fontSize: 14 }}
              >
                {assignment.description}
              </Typography>
            )}

            {(assignment.driveLink || assignment.driveUrl) && (
              <Button
                variant="outlined"
                href={(assignment.driveLink || assignment.driveUrl)!}
                target="_blank"
                rel="noreferrer"
                startIcon={<OpenInNewIcon />}
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "#c5cae9",
                  color: "#3949ab",
                }}
              >
                Open Assignment File
              </Button>
            )}
          </Box>

          {/* RIGHT — Submit / Success */}
          <Box sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ color: "#9fa8da", fontWeight: 700, letterSpacing: 1, fontSize: 11 }}
            >
              Your Submission
            </Typography>

            {alreadySubmitted ? (
              // ── SUCCESS STATE ──────────────────────────────────────────
              <Box mt={1.5}>
                {/* Big success banner */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    bgcolor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: 2.5,
                    px: 2.5,
                    py: 2,
                    mb: 2,
                  }}
                >
                  <TaskAltIcon sx={{ color: "#16a34a", fontSize: 32, flexShrink: 0 }} />
                  <Box>
                    <Typography fontWeight={700} fontSize={14} color="#15803d">
                      Assignment Submitted!
                    </Typography>
                    <Typography fontSize={12} color="#166534" mt={0.2}>
                      Your work has been received. We'll notify you once it's reviewed.
                    </Typography>
                  </Box>
                </Box>

                {/* Marks + feedback if graded */}
                {userSubmission?.marks != null && (
                  <Box
                    sx={{
                      bgcolor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      mb: 2,
                    }}
                  >
                    <Typography fontWeight={700} fontSize={13} color="#1d4ed8">
                      Marks: {userSubmission.marks} / {assignment.maxMarks}
                    </Typography>
                    {userSubmission.feedback && (
                      <Typography fontSize={12} color="#1e40af" mt={0.5}>
                        Feedback: {userSubmission.feedback}
                      </Typography>
                    )}
                  </Box>
                )}

                <Button
                  variant="outlined"
                  href={effectiveUrl}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<OpenInNewIcon />}
                  size="small"
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  View My Submission
                </Button>
              </Box>
            ) : (
              // ── SUBMIT FORM ────────────────────────────────────────────
              <Box mt={1.5}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, lineHeight: 1.7, fontSize: 13 }}
                >
                  Upload your solution to Google Drive and paste the sharing link below.
                  Make sure sharing is set to{" "}
                  <strong>Anyone with the link can view.</strong>
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  label="Google Drive Link"
                  placeholder="https://drive.google.com/file/d/..."
                  value={driveLink}
                  onChange={(e) => {
                    setDriveLink(e.target.value);
                    setError("");
                  }}
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon sx={{ fontSize: 18, color: "#9fa8da" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />

                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 2.5,
                    background: "linear-gradient(135deg, #5c6bc0 0%, #3949ab 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #3949ab 0%, #283593 100%)",
                    },
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

// ─── Main Tab ─────────────────────────────────────────────────────────────────
const AssignmentTab: React.FC<{ unitId: number }> = ({ unitId }) => {
  const { data, isLoading, refetch } = useGetAssignmentQuery(unitId, {
    skip: !unitId,
  });

  const assignments = data?.data || [];

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton height={60} sx={{ mb: 2, borderRadius: 2 }} />
        <Skeleton height={60} sx={{ mb: 2, borderRadius: 2 }} />
        <Skeleton height={60} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (assignments.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <AssignmentIcon sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
        <Typography color="text.secondary">No assignments available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={600}>
        {assignments.length} Assignment{assignments.length !== 1 ? "s" : ""}
      </Typography>

      {assignments.map((assignment: any) => (
        <AssignmentCard key={assignment.id} assignment={assignment} refetch={refetch} />
      ))}
    </Box>
  );
};

export default AssignmentTab;