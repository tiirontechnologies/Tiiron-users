import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionForm from './components/QuestionForm';
import QuestionTypeSelector from './components/QuestionTypeSelector';
import ToolBar from "../../course-settings/components/index";

export type ContentType = 
  | 'mcq' 
  | 'single_choice' 
  | 'fill_up' 
  | 'subjective' 
  | 'blog' 
  | 'video' 
  | 'assignment' 
  | 'quiz';

const CreateCourseContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unitId, type: defaultType } = location.state || {};
  const [selectedType, setSelectedType] = useState<ContentType | null>(defaultType || null);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <ToolBar previousPage="/courses" courseName="Create Content">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {unitId && (
            <Typography variant="body1" color="textSecondary">
              Unit: {unitId}
            </Typography>
          )}
        </Box>
      </ToolBar>
      <Box sx={{ height: "calc(100vh - 64px)", p: "24px" }}>
        {!selectedType ? (
          <QuestionTypeSelector 
            selectedType={selectedType} 
            onTypeSelect={setSelectedType} 
          />
        ) : (
          <QuestionForm 
            type={selectedType}
            unitId={unitId}
            onBack={() => setSelectedType(null)}
            onClose={handleBack}
          />
        )}
      </Box>
    </Box>
  );
};

export default CreateCourseContent;
