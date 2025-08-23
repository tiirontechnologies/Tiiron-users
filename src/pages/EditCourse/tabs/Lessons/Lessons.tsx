import { Fragment, useContext, useState } from "react";
import {
  AccordionDetails,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FileAddIcon from "@icons/FileAddIcon";
import FileUploadIcon from "@icons/FileUploadIcon";
import Loader from "@components/Template/ui/Spinner";
import { CourseContext } from "../..";
import {
  Accordion,
  AccordionSummary,
  LessonItem
} from "@components/EditCourse/Components/StyledComponents";
import { ReusablePopper } from "@components/Template/popper/ReusablePopper";
import { AddLessonPopperItem } from "@components/EditCourse/Components/AddLessonPopperItem";
import { useModal } from "../../../../hooks/useModal";
import { AddQuestionModal } from "@components/EditCourse/Modals/AddQuestionModal";
import { AddChapterModal } from "@components/EditCourse/Modals/AddChapterModal";
import { AddUnitForm } from "@components/EditCourse/Components/AddUnitForm";

export default function Lessons() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const contextData = useContext(CourseContext);
  const [openEditorChapterId, setOpenEditorChapterId] = useState<number | null>(null);
  const { isOpen, closeModal, openModal } = useModal();
  const { isOpen: isChapterModalOpen, closeModal: closeChapterModal, openModal: openChapterModal } = useModal();
  const [unitId, setUnitId] = useState<number | null>(null);

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: { xs: "12px", md: "16px" },
      p: { xs: 1, sm: 2, md: 0 }
    }}>
      {!openEditorChapterId &&
        <Fragment>
          {contextData?.isLoading ? (<Box sx={{ display: "grid", placeItems: "center", p: 10 }}><Loader /></Box>) : contextData?.data?.chapters?.length > 0 ? (contextData?.data?.chapters.map((chapter: any) => (
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
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        flex: 1,
                        minWidth: 0
                      }}>
                        <DragIndicatorIcon sx={{ 
                          color: "#999999", 
                          mr: { xs: "6px", md: "10px" },
                          fontSize: { xs: 18, md: 24 }
                        }} />
                        <Typography sx={{ 
                          color: "#000000", 
                          fontSize: { xs: "14px", md: "16px" }, 
                          ml: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {unit?.title}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        flexShrink: 0
                      }}>
                        <Button 
                          variant="contained" 
                          size={isSmallScreen ? "small" : "medium"}
                          sx={{
                            fontSize: { xs: '12px', md: '14px' },
                            px: { xs: 1.5, md: 2 },
                            py: { xs: 0.5, md: 1 },
                            whiteSpace: 'nowrap'
                          }}
                          onClick={() => {
                            setUnitId(unit?.id);
                            openModal();
                          }}
                        >
                          Add Questions
                        </Button>
                      </Box>
                    </LessonItem>
                  )) : (
                    <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>No Units Found</Box>
                  )}
                  <IconButton
                    sx={{ 
                      m: "auto", 
                      border: "1px solid #E6E6E6",
                      p: { xs: 1, md: 1.5 }
                    }}
                    onClick={() => {
                      setOpenEditorChapterId(chapter?.id);
                    }}
                  >
                    <AddRoundedIcon sx={{ 
                      color: "#4D4D4D",
                      fontSize: { xs: 20, md: 24 }
                    }} />
                  </IconButton>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
          ) : (
            <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>No Data Found...</Box>
          )}
          <Box sx={{ 
            m: "auto", 
            display: "flex", 
            gap: { xs: "12px", md: "24px" },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' }
          }}>
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
              content={<Box sx={{ display: "flex", gap: "16px", flexDirection: "column" }}>
                <AddLessonPopperItem
                  icon={<FileAddIcon />}
                  title="Import Lessons"
                  description="Import lessons from other courses" />
                <AddLessonPopperItem
                  icon={<FileUploadIcon />}
                  title="Add chapter"
                  description="Add another chapter"
                  onClickCallBack={openChapterModal} />
              </Box>}
              trigger={<Button
                startIcon={<AddRoundedIcon />}
                endIcon={<KeyboardArrowDownRoundedIcon />}
                fullWidth={isSmallScreen}
                sx={{
                  fontSize: { xs: '14px', md: '16px' },
                  px: { xs: 2, md: 3 },
                  py: { xs: 1, md: 1.5 },
                  minHeight: { xs: 40, md: 'auto' }
                }}
              >
                Add Chapter
              </Button>} />
          </Box>
        </Fragment>}
      {openEditorChapterId !== null && (<AddUnitForm chapterId={openEditorChapterId} onClose={() => setOpenEditorChapterId(null)} />)}
      <AddQuestionModal onClose={closeModal} open={isOpen} unitId={unitId} />
      <AddChapterModal onClose={closeChapterModal} open={isChapterModalOpen} />
    </Box>
  );
}
