import { CustomTabs } from "@components/ui/CustomTabPanel";
import ClockIcon from "@icons/ClockIcon";
import ProfileIcon from "@icons/ProfileIcon";
import SandTimerIcon from "@icons/SandTimerIcon";
import TickCircleIcon from "@icons/TickCircleIcon";
import TimeProgressIcon from "@icons/TimeProgressIcon";
import TimerIcon from "@icons/TimerIcon";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FilterIcon from "@icons/FilterIcon";
import ListChecklistIcon from "@icons/ListChecklistIcon";
import { ReportCardData, LessonReportData } from '../types';
import { reportsData, reportsAverageData, lessonReportData } from '../utils/mockData';

const Reports = () => {
  
  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 0 },
      '& > *': {
        width: '100%'
      }
    }}>
      <CustomTabs
        tabs={["Overview", "Funnel"]}
        panels={[<Overview />, <Overview />]}
      />
      <Box sx={{ mt: { xs: "24px", md: "40px" } }}>
        <CustomTabs tabs={["Average"]} panels={[<Average />]} />
      </Box>
      <Box sx={{ mt: { xs: "24px", md: "40px" } }}>
        <CustomTabs
          tabs={["Lesson", "Users", "Spaces"]}
          panels={[<Lesson />]}
        />
      </Box>
    </Box>
  );
};

export default Reports;

const Overview = () => {
  
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(auto-fit, minmax(250px, 1fr))'
        },
        gap: { xs: "16px", md: "24px" },
        alignItems: "stretch"
      }}
    >
      {reportsData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

const Average = () => {
  
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(auto-fit, minmax(250px, 1fr))'
        },
        gap: { xs: "16px", md: "24px" },
        alignItems: "stretch"
      }}
    >
      {reportsAverageData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

interface ReportsCardProps {
  item: ReportCardData;
}

const ReportsCard: React.FC<ReportsCardProps> = ({ item }) => {
  
  return (
    <Box
      sx={{
        p: { xs: "20px", md: "32px" },
        borderRadius: "16px",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: { xs: "12px", md: "16px" },
        width: "100%",
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        minHeight: { xs: 'auto', md: '120px' }
      }}
    >
      <Box
        sx={{
          height: { xs: "48px", md: "60px" },
          width: { xs: "48px", md: "60px" },
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: item.bgColor,
          flexShrink: 0,
          '& svg': {
            width: { xs: 20, md: 24 },
            height: { xs: 20, md: 24 }
          }
        }}
      >
        {item.icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{ 
            color: "#000000", 
            fontSize: { xs: "20px", md: "24px" }, 
            fontWeight: "600",
            lineHeight: 1.2
          }}
        >
          {item.value}
        </Typography>
        <Typography sx={{ 
          color: "#666666", 
          fontSize: { xs: "14px", md: "16px" },
          mt: 0.5
        }}>
          {item.label}
        </Typography>
      </Box>
    </Box>
  );
};

const Lesson = () => {
  
  return (
    <Box sx={{ 
      bgcolor: "#fff", 
      borderRadius: "16px",
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      <Box
        sx={{
          p: { xs: "12px", md: "16px" },
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Button
          variant="text"
          sx={{
            border: "1px solid #E6E6E6",
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'flex-start', sm: 'center' }
          }}
          startIcon={<ListChecklistIcon color="#666666" />}
          endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
        ></Button>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' }, 
          gap: { xs: 1, sm: 2 }
        }}>
          <Button
            variant="text"
            sx={{
              border: "1px solid #E6E6E6",
              color: "#666666",
              fontSize: { xs: '14px', sm: '16px' },
              px: { xs: 2, sm: 3 }
            }}
            startIcon={<FilterIcon color="#666666" size={18} />}
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
          >
            All
          </Button>
          <Button 
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              px: { xs: 2, sm: 3 }
            }}
          >
            Export as CSV
          </Button>
        </Box>
      </Box>
      
      {/* Responsive Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
            <TableHead sx={{ bgcolor: "#F7F7F8" }}>
              <TableRow>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  S.No
                </TableCell>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Lessons
                </TableCell>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Yet to Start
                </TableCell>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  In Progress
                </TableCell>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Completed
                </TableCell>
                <TableCell
                  sx={{ 
                    color: "#000000", 
                    fontSize: { xs: "14px", md: "16px" }, 
                    fontWeight: "600",
                    py: { xs: 1.5, md: 2 }
                  }}
                >
                  Time Spent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ 
              minHeight: { xs: "200px", md: "300px" }
            }}>
              {lessonReportData.length > 0 ? lessonReportData.map((lesson, index) => (
                <TableRow key={lesson.id}>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.lessonName}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.yetToStart}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.inProgress}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.completed}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '14px', md: '16px' } }}>
                    {lesson.timeSpent}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell 
                    colSpan={6} 
                    sx={{ 
                      textAlign: 'center', 
                      py: 4,
                      color: '#666666',
                      fontSize: { xs: '14px', md: '16px' }
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
