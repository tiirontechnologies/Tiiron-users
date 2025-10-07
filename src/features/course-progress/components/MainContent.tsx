import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import { useState } from "react";
import Scoresvg from "@icons/Score.svg";


const McqTemplate = ({ question }: { question: any }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  console.log("question", question)
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
      {question.content.options.map((opt: any, oidx: number) => (
        <Box
          key={oidx}
          sx={{
            flex: 1,
            minWidth: 180,
            border: `1px solid ${showAnswers && opt.isCorrect ? "#6A42AB" : "#E6E6E6"}`,
            p: "12px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            mb: 1,
            background: showAnswers && opt.isCorrect ? "#ECFDF8" : "#F9FAFA",
          }}
        >
          <input
            type="radio"
            checked={showAnswers ? opt.isCorrect : false}
            disabled
            style={{
              marginRight: 12,
              accentColor: showAnswers && opt.isCorrect ? "#6A42AB" : "#E6E6E6",
            }}
          />
          <Typography
            sx={{ fontSize: "15px", color: "#222", fontWeight: 500 }}
          >
            {opt.text}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}


const FillUpTemplate = ({ question }: { question: any }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: "8px",
        background: "#F9FAFA",
        border: "1px solid #E6E6E6",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "15px",
          color: "#6A42AB",
          fontWeight: 600,
          mr: 2,
        }}
      >
        Correct Answer:
      </Typography>
      <input
        type="text"
        value={showAnswers ? question.correctAnswer || "" : ""}
        disabled
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #6A42AB",
          background: "#fff",
          fontWeight: 500,
          color: "#222",
          minWidth: 120,
        }}
      />
    </Box>
  )
}

const SubjectiveTemplate = ({ question }: { question: any }) => {
  const [answer, setAnswer] = useState('');

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
        {question.content.question}
      </Typography>
      <Box
        component="textarea"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        sx={{
          width: '100%',
          minHeight: '120px',
          padding: '12px 16px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          fontSize: '15px',
          fontFamily: 'inherit',
          lineHeight: 1.5,
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          '&:focus': {
            borderColor: '#6A42AB',
            boxShadow: '0 0 0 3px rgba(66, 178, 133, 0.1)'
          },
          '&::placeholder': {
            color: '#9CA3AF',
            fontSize: '14px'
          }
        }}
      />
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
          {answer.length} characters
        </Typography>
        <Typography sx={{ fontSize: '12px', color: '#6B7280' }}>
          Minimum 10 characters required
        </Typography>
      </Box>
    </Box>
  )
}

const BlogTemplate = ({ question }: { question: any }) => {
  return (
    <Box 
      sx={{ 
        mt: 2,
        p: 3,
        borderRadius: '8px',
        background: '#fff',
        border: '1px solid #E6E6E6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <Box
        dangerouslySetInnerHTML={{ 
          __html: question.content.html || question.content.text || '' 
        }}
        sx={{
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: '#0F172A',
            fontWeight: 600,
            mb: 2,
            mt: 3,
            '&:first-of-type': {
              mt: 0
            }
          },
          '& p': {
            color: '#374151',
            lineHeight: 1.6,
            mb: 2,
            fontSize: '15px'
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            mb: 2
          },
          '& ul, & ol': {
            pl: 3,
            mb: 2,
            '& li': {
              color: '#374151',
              lineHeight: 1.6,
              mb: 1
            }
          },
          '& blockquote': {
            borderLeft: '4px solid #6A42AB',
            pl: 2,
            ml: 0,
            fontStyle: 'italic',
            color: '#6B7280',
            background: '#F9FAFA',
            p: 2,
            borderRadius: '0 8px 8px 0',
            mb: 2
          },
          '& code': {
            background: '#F3F4F6',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'monospace',
            color: '#E11D48'
          },
          '& pre': {
            background: '#1F2937',
            color: '#F9FAFB',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            mb: 2,
            '& code': {
              background: 'transparent',
              color: 'inherit',
              padding: 0
            }
          },
          '& a': {
            color: '#6A42AB',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            mb: 2,
            '& th, & td': {
              border: '1px solid #E5E7EB',
              padding: '8px 12px',
              textAlign: 'left'
            },
            '& th': {
              background: '#F9FAFB',
              fontWeight: 600
            }
          }
        }}
      />
    </Box>
  )
}

const VideoTemplate = ({ question }: { question: any }) => {
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(question.content.url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Box sx={{ mt: 2 }}>
      {embedUrl ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '56.25%', // 16:9 aspect ratio
            overflow: 'hidden',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ) : (
        <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
          Invalid YouTube URL
        </Typography>
      )}
    </Box>
  )
}

// Enhanced component for video and blog tabs with side-by-side layout
const VideoBlogTabs = ({ question }: { question: any }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          borderBottom: '1px solid #E5E7EB',
          mb: 3,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            minHeight: '48px',
            px: 3,
            '&.Mui-selected': {
              color: '#6A42AB',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#6A42AB',
            height: '3px',
            borderRadius: '2px'
          }
        }}
      >
        <Tab label="📹 Video Content" />
        <Tab label="📝 Blog Content" />
      </Tabs>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 3,
        minHeight: '400px',
        '& > *': {
          flex: 1
        }
      }}>
        {/* Video Section */}
        <Box sx={{ 
          display: tabValue === 0 ? 'block' : 'none',
          opacity: tabValue === 0 ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <VideoTemplate question={question} />
        </Box>
        
        {/* Blog Section */}
        <Box sx={{ 
          display: tabValue === 1 ? 'block' : 'none',
          opacity: tabValue === 1 ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          <BlogTemplate question={question} />
        </Box>
      </Box>
    </Box>
  );
};

const getQuestionTemplate = (type: string, question: any) => {
  switch (type) {
    case "mcq":
      return <McqTemplate question={question} />;
    case "single_choice":
      return <McqTemplate question={question} />;
    case "fill_up":
      return <FillUpTemplate question={question} />;
    case "subjective":
      return <SubjectiveTemplate question={question} />;
    case "blog":
      return <BlogTemplate question={question} />;
    case "video":
      return <VideoTemplate question={question} />;
    case "video_blog":
      return <VideoBlogTabs question={question} />;
    default:
      return null;
  }
}



const MainContent: React.FC<any> = ({ data }: { data: any }) => {
  console.log(data);
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Box
      sx={{
        marginLeft: "289px",
        marginTop: "64px",
        padding: "32px",
        paddingBottom: "120px", // Extra padding to prevent content from being hidden behind bottom navbar
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
          color: "white",
          p: 3,
          borderRadius: "16px",
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: "28px",
            position: "relative",
            zIndex: 1,
          }}
          dangerouslySetInnerHTML={{ __html: data[0]?.unit?.title }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative", zIndex: 1 }}>
          <Chip
            label={`${data?.length || 0} Questions`}
            sx={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 500,
            }}
          />
          <Chip
            label="Practice Mode"
            sx={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 500,
            }}
          />
        </Box>
      </Paper>

      {/* Question List - Unified Layout */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "20px",
          background: "white",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((question: any, idx: number) => (
              <Box key={question.content.id || idx}>
                {/* Question Header */}
                <Box
                  sx={{
                    background: idx === 0 ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" : "transparent",
                    p: 3,
                    borderBottom: idx < data.length - 1 ? "1px solid #E5E7EB" : "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#0F172A",
                        fontWeight: 700,
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "14px",
                        }}
                      >
                        {idx + 1}
                      </Box>
                      Practice Question {idx + 1}
                    </Typography>
                    <Chip
                      label={question.contentType?.replace('_', ' ').toUpperCase() || 'QUESTION'}
                      size="small"
                      sx={{
                        background: "#6A42AB",
                        color: "white",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                </Box>

                {/* Question Content */}
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      mb: 3,
                      color: "#374151",
                      lineHeight: 1.6,
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: question.text }} />
                  </Typography>
                  
                  {idx < data.length - 1 && <Divider sx={{ mb: 3, opacity: 0.3 }} />}
                  
                  {getQuestionTemplate(question.contentType, question)}
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography sx={{ color: "#6B7280", fontSize: "18px", fontWeight: 500 }}>
                📚 No questions found for this unit
              </Typography>
              <Typography sx={{ color: "#9CA3AF", fontSize: "14px", mt: 1 }}>
                Please check back later or contact your instructor
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: "289px",
          right: 0,
          background: "white",
          borderTop: "1px solid #E5E7EB",
          zIndex: 1000,
          p: 3,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img src={Scoresvg} alt="Score" style={{ width: "40px", height: "40px" }} />
            <Box>
              <Typography
                sx={{ color: "#6B7280", fontWeight: "500", fontSize: "14px" }}
              >
                Congratulations! Your score is:
              </Typography>
              <Typography
                sx={{ color: "#6A42AB", fontWeight: "700", fontSize: "24px" }}
              >
                25 / 30
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button
              variant="outlined"
              onClick={() => setShowAnswers(true)}
              sx={{
                borderColor: "#6A42AB",
                color: "#6A42AB",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#2D8F5F",
                  background: "rgba(66, 178, 133, 0.05)",
                }
              }}
            >
              Check Answer
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(66, 178, 133, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2D8F5F 0%, #1F6B47 100%)",
                  boxShadow: "0 6px 16px rgba(66, 178, 133, 0.4)",
                }
              }}
            >
              Complete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;

