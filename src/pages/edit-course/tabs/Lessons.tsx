import {
  AccordionDetails,
  accordionSummaryClasses,
  AccordionSummaryProps,
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  styled,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ListAddIcon from "@icons/ListAddIcon";
import { ReusablePopper } from "@components/popper/ReusablePopper";
import FileAddIcon from "@icons/FileAddIcon";
import FileUploadIcon from "@icons/FileUploadIcon";
import React, { Fragment, useContext, useState } from "react";
import VideoCircleIcon from "@icons/VideoCircleIcon";
import GridViewIcon from "@icons/GridViewIcon";
import TextBlockIcon from "@icons/TextBlockIcon";
import CodeCircleIcon from "@icons/CodeCircleIcon";
import MessageQuestionIcon from "@icons/MessageQuestionIcon";
import ImportIcon from "@icons/ImportIcon";
import Loader from "@components/ui/Spinner";
import { ReactComponent as BlockIcon } from "../../../assets/icons/element-3.svg?react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCreateChapterMutation, useCreateUnitMutation } from "../../../api/api";
import { CourseContext } from "..";
import RichTextEditor from "@components/RichTextEditor";
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

const itemBoxStyle = {
  border: "1px solid #E6E6E6",
  borderRadius: "8px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: "6px",
  cursor: "pointer",
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
};

const Lessons = () => {

  const contextData = useContext(CourseContext);

  const { courseId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ title: string }>();
  const [createChapter, { isLoading: isCreating }] = useCreateChapterMutation();
  const [_editorValue, setEditorValue] = useState('');
  const onSubmit: SubmitHandler<{ title: string }> = async (data: { title: string }) => {
    try {
      const response = await createChapter({
        body: {
          title: data.title,
          courseId: Number(courseId!),
        }
      }).unwrap();
      contextData?.setSnackbarSeverity("success");
      contextData?.setSnackbarMessage(response?.message || "Course Deleted successfully");
      contextData?.setSnackbarOpen(true);
    } catch (err: any) {
      console.error("Delete failed", err);
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      contextData?.setSnackbarSeverity("error");
      contextData?.setSnackbarMessage(errorMessage);
      contextData?.setSnackbarOpen(true);
    } finally {
      reset();
    }
  };
  const [openEditorChapterId, setOpenEditorChapterId] = useState<number | null>(null);


  /**
   * Form for adding a new Unit in  chapter
   */
  const [createUnit, { isLoading: isCreatingUnit }] = useCreateUnitMutation();
  const {
    register: registerEditorForm,
    handleSubmit: handleSubmitEditorForm,
    formState: { errors: editorErrors },
    reset: resetEditorForm,
    control: editorControl,
  } = useForm<{ title: string; content: string }>();
  const onSubmitEditorForm: SubmitHandler<{ title: string, content: string }> = async (data: { title: string; content: string; }) => {
    try {
      // Here you would typically call an API to save the chapter
      // For now, we just log the data
      console.log("Chapter data submitted:", data, openEditorChapterId);
      const response = await createUnit({
        body: {
          title: data.title,
          content: data.content,
          chapterId: Number(openEditorChapterId),
        }
      }).unwrap();
      contextData?.setSnackbarSeverity("success");
      contextData?.setSnackbarMessage(response?.message || "Unit created successfully");
      contextData?.setSnackbarOpen(true);
    } catch (err: any) {
      console.error("Error creating Unit:", err);
      const errorMessage =
        err?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Something went wrong!";
      contextData?.setSnackbarSeverity("error");
      contextData?.setSnackbarMessage(errorMessage);
      contextData?.setSnackbarOpen(true);
    } finally {
      resetEditorForm();
      setOpenEditorChapterId(null);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {!openEditorChapterId &&
        <Fragment>
          {contextData?.isLoading ? (
            <Box sx={{ display: "grid", placeItems: "center", p: 10 }}><Loader /></Box>
          ) : contextData?.data?.chapters?.length > 0 ? (
            contextData?.data?.chapters.map((chapter: any) => (
              <Accordion key={chapter.id}>
                <AccordionSummary aria-controls={`panel${chapter?.id}-content`} id={`panel${chapter?.id}-header`}>
                  <Typography component="span" sx={{ color: "#000", fontWeight: 600 }}>
                    {chapter?.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {chapter?.units?.length > 0 ? chapter?.units.map((unit: any) => (
                      <LessonItem key={unit?.id}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <DragIndicatorIcon sx={{ color: "#999999", mr: "10px" }} />
                          <Typography sx={{ color: "#000000", fontSize: "16px", ml: 1 }}>
                            {unit?.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ReusablePopper
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            content={
                              <Box sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "12px",
                                p: 2,
                                minWidth: 200
                              }}>
                                <Box sx={itemBoxStyle}><VideoCircleIcon /><Typography>Video</Typography></Box>
                                <Box sx={itemBoxStyle}><SvgIcon component={BlockIcon} /><Typography>Block</Typography></Box>
                                <Box sx={itemBoxStyle}><TextBlockIcon /><Typography>Text</Typography></Box>
                                <Box sx={itemBoxStyle}><CodeCircleIcon /><Typography>Code</Typography></Box>
                                <Box sx={itemBoxStyle}><VideoCircleIcon /><Typography>Tasks</Typography></Box>
                                <Box sx={itemBoxStyle}><ImportIcon /><Typography>Bank</Typography></Box>
                              </Box>
                            }
                            trigger={
                              <Button variant="contained" size="small">Add Content</Button>
                            }
                          />
                          <IconButton sx={{ color: "#4D4D4D", ml: "auto" }}>
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </LessonItem>
                    )) : (
                      <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>No Units Found</Box>
                    )}
                    <IconButton
                      sx={{ m: "auto", border: "1px solid #E6E6E6" }}
                      onClick={() => {
                        setEditorValue(String(chapter.id))
                        setOpenEditorChapterId(chapter?.id);
                      }}
                    >
                      <AddRoundedIcon sx={{ color: "#4D4D4D" }} />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>No Data Found...</Box>
          )}
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
                    title="Add chapter"
                    description="Add another chapter"
                    onClickCallBack={() => setOpen(true)}
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
        </Fragment>
      }
      {openEditorChapterId !== null && (
        <Box
          component="form"
          onSubmit={handleSubmitEditorForm(onSubmitEditorForm)}
          noValidate
          sx={{
            mt: 2,
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Title Input */}
          <TextField
            fullWidth
            label="Lesson Title"
            placeholder="Enter the title of the lesson"
            variant="outlined"
            {...registerEditorForm("title", {
              required: "Title is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            error={!!editorErrors.title}
            helperText={editorErrors.title?.message}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "12px",
              },
            }}
          />

          {/* Rich Text Editor */}
          <Box>
            <Controller
              name="content"
              control={editorControl}
              defaultValue=""
              rules={{
                required: "Content is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              }}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpenEditorChapterId(null)}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={isCreatingUnit}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              {isCreatingUnit ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>

      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Chapter
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Chapter Title"
              variant="outlined"
              margin="normal"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 2, message: "Minimum 2 characters required" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <Box display="flex" justifyContent="end" gap="10px" mt={3}>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isCreating} loading={isCreating}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={contextData?.snackbarOpen}
        autoHideDuration={6000}
        onClose={contextData?.handleCloseSnackbar}
      >
        <Alert
          onClose={contextData?.handleCloseSnackbar}
          severity={contextData?.snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {contextData?.snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Lessons;

const AddLessonPopperItem = ({
  title,
  description,
  icon,
  onClickCallBack
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
  onClickCallBack?: () => void;
}) => {
  return (
    <Box
      role="button"
      onClick={onClickCallBack}
      sx={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        p: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          bgcolor: "#f5f5f5",
          transform: "translateY(-2px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
      }}>
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
export const AddContactButton = () => {
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
