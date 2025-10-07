import { Box, Paper, Typography, Grid } from '@mui/material';
import {
    Quiz as QuizIcon,
    CheckBox as MultipleChoiceIcon,
    RadioButtonChecked as SingleChoiceIcon,
    TextFields as FillUpIcon,
    Subject as SubjectiveIcon,
    Article as BlogIcon,
    VideoLibrary as VideoIcon,
    Assignment as AssignmentIcon
} from '@mui/icons-material';
import { ContentType } from '..';

interface QuestionTypeSelectorProps {
    selectedType: ContentType | null;
    onTypeSelect: (type: ContentType) => void;
}

const questionTypes = [
    { type: 'mcq' as ContentType, icon: <MultipleChoiceIcon />, label: 'Multiple Choice', description: 'Multiple correct answers allowed' },
    { type: 'single_choice' as ContentType, icon: <SingleChoiceIcon />, label: 'Single Choice', description: 'Only one correct answer' },
    { type: 'fill_up' as ContentType, icon: <FillUpIcon />, label: 'Fill in the Blank', description: 'Type in the correct answer' },
    { type: 'subjective' as ContentType, icon: <SubjectiveIcon />, label: 'Subjective', description: 'Long form answers' },
    { type: 'blog' as ContentType, icon: <BlogIcon />, label: 'Blog', description: 'Rich text content' },
    { type: 'video' as ContentType, icon: <VideoIcon />, label: 'Video', description: 'Upload video content' },
    { type: 'assignment' as ContentType, icon: <AssignmentIcon />, label: 'Assignment', description: 'Single choice assignment' },
    { type: 'quiz' as ContentType, icon: <QuizIcon />, label: 'Quiz', description: 'Single choice quiz' }
];

const QuestionTypeSelector = ({ selectedType, onTypeSelect }: QuestionTypeSelectorProps) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Select Content Type
            </Typography>
            <Grid container spacing={2}>
                {questionTypes.map(({ type, icon, label, description }) => (
                    <Grid item xs={12} sm={6} md={4} key={type}>
                        <Paper
                            elevation={0}
                            onClick={() => onTypeSelect(type)}
                            sx={{
                                p: 3,
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: selectedType === type ? '#7e22ce' : '#e0e0e0',
                                bgcolor: selectedType === type ? '#faf5ff' : 'transparent',
                                transition: 'all 0.2s',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'flex-start',
                                '&:hover': {
                                    borderColor: '#7e22ce',
                                    bgcolor: '#faf5ff',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <Box sx={{ 
                                color: '#7e22ce',
                                '& .MuiSvgIcon-root': {
                                    fontSize: '2rem'
                                }
                            }}>
                                {icon}
                            </Box>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    {label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {description}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuestionTypeSelector;
