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
          left: "289px",
          right: 0,
          p: 3,
          background: COLORS.background.white,
          borderTop: `1px solid ${COLORS.border.light}`,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {completed} / {total}
          </Typography>
  
          <Typography>Total Marks: {totalMarks}</Typography>
  
          <Button
            variant="contained"
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