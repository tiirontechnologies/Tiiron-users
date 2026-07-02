import {
  Box,
  Typography,
  Button
} from "@mui/material";
import { COLORS } from "../../constants";


/* =====================================================
   FOOTER
===================================================== */
const PracticeFooter = ({
  activeContentType,
  completed,
  total,
  totalMarks,
  onSubmit,
  isSubmitting,
}: any) => {
  if (!activeContentType) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: { xs: 0, md: "260px" },
        right: 0,
        px: { xs: 1.5, sm: 2, md: 2.5 },
        py: { xs: 1, md: 1.25 },
        pb: { xs: "calc(8px + env(safe-area-inset-bottom))", md: 1.25 },
        background: COLORS.background.white,
        borderTop: `1px solid ${COLORS.border.light}`,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          minHeight: { xs: 44, md: 46 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "13px", sm: "14px" },
            fontWeight: 600,
            lineHeight: 1.4,
            whiteSpace: "nowrap",
          }}
        >
          Total Marks: {totalMarks}
        </Typography>

        <Button
          variant="contained"
          sx={{
            color: "white !important",
            flexShrink: 0,
            minHeight: { xs: 36, sm: 38 },
            px: { xs: 1.5, sm: 2.25 },
            py: 0.75,
            fontSize: { xs: "12px", sm: "14px" },
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
          disabled={isSubmitting || completed === 0}
          onClick={onSubmit}
        >
          {isSubmitting
            ? "Submitting..."
            : `Submit ${activeContentType.name}`}
        </Button>
      </Box>
    </Box>
  );
};

export default PracticeFooter;
