import { Box } from "@mui/material";
import { useState } from "react";
import { useModal } from "../../../../hooks/useModal";
import { DeleteModal } from "@components/Courses/Modal/DeleteCourseModal";
import { DeleteCourseSection } from "@components/EditCourse/Components/SettingsSections/DeleteCourseSection";
import { CourseDetailsSection } from "@components/EditCourse/Components/SettingsSections/CourseDetailsSection";
import { NavigationSection } from "@components/EditCourse/Components/SettingsSections/NavigationSection";
import { ExpirationSection } from "@components/EditCourse/Components/SettingsSections/ExpirationSection";
import { CompletionSection } from "@components/EditCourse/Components/SettingsSections/CompletionSection";
import { RatingSection } from "@components/EditCourse/Components/SettingsSections/RatingSection";
import { CertificatesSection } from "@components/EditCourse/Components/SettingsSections/CertificatesSection";
import { ButtonTextSection } from "@components/EditCourse/Components/SettingsSections/ButtonTextSection";
import { AcknowledgmentSection } from "@components/EditCourse/Components/SettingsSections/AcknowledgmentSection";
import { DurationSection } from "@components/EditCourse/Components/SettingsSections/DurationSection";
import { useParams } from "react-router-dom";

export default function Settings() {
  const [selected, setSelected] = useState("free");
  const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { courseId } = useParams();
  return (
    <Box 
      display="grid" 
      gap={{ xs: "16px", md: "24px" }}
      sx={{
        p: { xs: 1, sm: 2, md: 0 },
        '& > *': {
          width: '100%'
        }
      }}
    >
      <CourseDetailsSection />
      <ExpirationSection />
      <DurationSection />
      <NavigationSection selected={selected} setSelected={setSelected} />
      <CompletionSection />
      <RatingSection />
      <CertificatesSection />
      <ButtonTextSection />
      <AcknowledgmentSection />
      <DeleteCourseSection onDelete={openDeleteModal} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={Number(courseId!)} // TODO: Get actual course ID
      />
    </Box>
  );
}
