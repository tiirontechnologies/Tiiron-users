import { Fragment, useContext, useState } from "react";
import {
  AccordionDetails,
  Box,
  Button,
  IconButton,
  Typography,
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

  const contextData = useContext(CourseContext);
  const [openEditorChapterId, setOpenEditorChapterId] = useState<number | null>(null);
  const { isOpen, closeModal, openModal } = useModal();
  const { isOpen: isChapterModalOpen, closeModal: closeChapterModal, openModal: openChapterModal } = useModal();
  const [unitId, setUnitId] = useState<number | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DragIndicatorIcon sx={{ color: "#999999", mr: "10px" }} />
                        <Typography sx={{ color: "#000000", fontSize: "16px", ml: 1 }}>
                          {unit?.title}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Button variant="contained" size="small" onClick={() => {
                          setUnitId(unit?.id);
                          openModal();
                        }}>Add Questions</Button>
                      </Box>
                    </LessonItem>
                  )) : (
                    <Box sx={{ display: "grid", placeItems: "center", p: 10 }}>No Units Found</Box>
                  )}
                  <IconButton
                    sx={{ m: "auto", border: "1px solid #E6E6E6" }}
                    onClick={() => {
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
