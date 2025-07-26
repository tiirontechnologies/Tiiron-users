import {
  AccordionDetails,
  accordionSummaryClasses,
  AccordionSummaryProps,
  Box,
  Button,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import FileIcon from "@icons/FileIcon";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(() => ({
  borderRadius: "16px",
  backgroundColor: "#F9FAFA",
  overflow: "hidden",
  borderTop: "1px solid #F2F2F2",
  borderBottom: "1px solid #F2F2F2",
  padding: "4px",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  const { children, ...other } = props;
  return (
    <MuiAccordionSummary
      {...other}
      expandIcon={null} // disable default expand icon
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        <DragIndicatorIcon sx={{ color: "#999" }} />
        <ArrowForwardIosSharpIcon
          sx={{
            fontWeight: 600,
            color: "#000",
            fontSize: "0.9rem",
            transition: "transform 0.3s",
            transform: props["aria-expanded"]
              ? "rotate(90deg)"
              : "rotate(0deg)",
          }}
          className="custom-expand-icon"
        />
        {children}
        <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </MuiAccordionSummary>
  );
})(({ theme }) => ({
  // backgroundColor: "rgba(51, 20, 20, 0.03)",
  backgroundColor: "inherit",
  flexDirection: "row",
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  [`& .custom-expand-icon`]: {
    transition: "transform 0.3s",
  },
  [`&.Mui-expanded .custom-expand-icon`]: {
    transform: "rotate(90deg)",
  },
}));
const LessonItem = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fff",
  border: "1px solid #F2F2F2",
  borderRadius: "8px",
  padding: "16px",
}));

const Lessons = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Accordion>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span" sx={{ color: "#000", fontWeight: 600 }}>
            Chapter 1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LessonItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DragIndicatorIcon sx={{ color: "#999999", mr: "10px" }} />
                <FileIcon />
                <Typography sx={{ color: "#000000", fontSize: "16px", ml: 1 }}>
                  Lesson 1
                </Typography>
              </Box>
              <Box>
                <Button>Add Content</Button>
                <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </LessonItem>
            <LessonItem>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DragIndicatorIcon sx={{ color: "#999999", mr: "10px" }} />
                <FileIcon />
                <Typography sx={{ color: "#000000", fontSize: "16px", ml: 1 }}>
                  Lesson 1
                </Typography>
              </Box>
              <Box>
                <Button variant="outlined">Edit Content</Button>
                <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </LessonItem>
            <IconButton sx={{ m: "auto", border: "1px solid #E6E6E6" }}>
              <AddRoundedIcon sx={{ color: "#4D4D4D" }} />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>
      <LessonItem>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DragIndicatorIcon sx={{ color: "#999999", mr: "10px" }} />
          <FileIcon />
          <Typography sx={{ color: "#000000", fontSize: "16px", ml: 1 }}>
            Lesson 1
          </Typography>
        </Box>
        <Box>
          <Button>Add Content</Button>
          <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </LessonItem>
    </Box>
  );
};
export default Lessons;
