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
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ListAddIcon from "@icons/ListAddIcon";
import { ReusablePopper } from "@components/popper/ReusablePopper";
import FileAddIcon from "@icons/FileAddIcon";
import FileUploadIcon from "@icons/FileUploadIcon";
import React from "react";
import VideoCircleIcon from "@icons/VideoCircleIcon";
import GridViewIcon from "@icons/GridViewIcon";
import TextBlockIcon from "@icons/TextBlockIcon";
import CodeCircleIcon from "@icons/CodeCircleIcon";
import MessageQuestionIcon from "@icons/MessageQuestionIcon";
import ImportIcon from "@icons/ImportIcon";
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
          <AddContactButton />
          <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </LessonItem>
      <Box sx={{ m: "auto", display: "flex", gap: "24px" }}>
        <ReusablePopper
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          arrowPlacement="right"
          content={
            <Box sx={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <AddLessonPopperItem
                icon={<FileAddIcon />}
                title="Import Lessons"
                description="Import lessons from other courses"
              />
              <AddLessonPopperItem
                icon={<FileUploadIcon />}
                title="Import Lessons"
                description="Import lessons from other courses"
              />
            </Box>
          }
          trigger={
            <Button
              startIcon={<AddRoundedIcon />}
              endIcon={<KeyboardArrowDownRoundedIcon />}
            >
              Add Lesson
            </Button>
          }
        />

        <Button startIcon={<ListAddIcon />} variant="outlined">
          Add Lesson
        </Button>
      </Box>
    </Box>
  );
};
export default Lessons;

const AddLessonPopperItem = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
}) => {
  return (
    <Box sx={{ display: "flex", gap: "24px", alignItems: "center", p: "16px" }}>
      <Box
        sx={{
          height: "48px",
          width: "48px",
          borderRadius: "8px",
          bgcolor: "#F1F2F4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: "600", fontSize: "18px", color: "#4d4d4d" }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#666666" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

// add contact btn
const AddContactButton = () => {
  const contentTypes = [
    {
      id: 1,
      icon: <VideoCircleIcon />,
      title: "Video",
    },
    {
      id: 2,
      icon: <GridViewIcon color="#7E51CF" />,
      title: "Block",
    },
    {
      id: 3,
      icon: <TextBlockIcon />,
      title: "Text",
    },
    {
      id: 4,
      icon: <CodeCircleIcon />,
      title: "Code",
    },
    {
      id: 5,
      icon: <MessageQuestionIcon />,
      title: "Tasks",
    },
    {
      id: 6,
      icon: <ImportIcon />,
      title: "Bank",
    },
  ];
  return (
    <ReusablePopper
      backgroundColor="#F9FAFA"
      content={
        <Box
          sx={{
            width: "359px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {contentTypes.map((type) => (
            <Box
              sx={{
                width: "93px",
                height: "94px",
                borderRadius: "8px",
                bgcolor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid #E6E6E6",
                p: "24px",
              }}
            >
              {type.icon}
              <Typography
                sx={{ fontWeight: 600, fontSize: "16px", color: "#000" }}
              >
                {type.title}
              </Typography>
            </Box>
          ))}
        </Box>
      }
      trigger={<Button>Add Content</Button>}
    />
  );
};
