import { Box, Button, Collapse, MenuItem, Modal, Paper, Select, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import EditIcon from "@icons/EditIcon";
import ReportIcon from "@icons/ReportIcon";
import ProfileTwoUserIcon from "@icons/ProfileTwoUserIcon";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import SettingsIcon from "@icons/SettingsIcon";
import Lessons from "./tabs/Lessons";
import { DeleteOutline } from "@mui/icons-material";
import { IOSSwitch } from "@components/ui/Switch/IOSswitch";
const CourseMetaTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabdata = [
    {
      title: "Lessons",
      icon: <EditIcon />,
      content: <Lessons />,
    },
    {
      title: "Overview",
      icon: <InfoCircleIcon />,
      content: (
        <Box>
          <Typography variant="h6">Overview Section</Typography>
          <Typography variant="body2">
            More details about the course here...
          </Typography>
        </Box>
      ),
    },
    {
      title: "Report",
      icon: <ReportIcon />,
      content: <Typography>This is the Report tab content</Typography>,
    },
    {
      title: "Learners",
      icon: <ProfileTwoUserIcon />,
      content: <Typography>This is the Learners tab content</Typography>,
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      content: (
        <Box display={"grid"} gap={"24px"}>
          <SettingsTab1 iconBgColor={"#FFF6F6"} icon={<SettingsIcon color="#DB5959" />} title="Course Name And Description" subTitle="Enter Course And Description" children={
            <Box
              sx={{
                mt: 2,
                px: 1,
                py: 2,
                pl: "54px",
                display: "grid",
                gap: "32px"
              }}
            >
              {/* Replace this with your actual form/content */}
              <Box>
                <Typography fontWeight={600} mb={1}>
                  Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  InputProps={{
                    sx: {
                      bgcolor: '#f9fafb',
                      borderRadius: 2,
                      p: "5px"
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={600} mb={1}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  size="small"
                  placeholder="Description"
                  InputProps={{
                    sx: {
                      bgcolor: '#f9fafb',
                      borderRadius: 2,
                      '& .MuiInputBase-input': {
                        padding: '5px', // Adjust this value as needed
                      },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={600} mb={1}>
                  Course Permalink
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  InputProps={{
                    sx: {
                      bgcolor: '#f9fafb',
                      borderRadius: 2,
                      p: "5px"
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography sx={{ color: "#666666" }}>
                  http://learn.logo.in/portal/trial2558/course/
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
                  Save
                </Button>
              </Box>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#FFF6F6"} icon={<SettingsIcon color="#DB5959" />} title="Modify Button Text" subTitle="Customize the text on the lesson and course completion buttons." children={
            <Box display="flex" flexDirection="column" gap={3} pl={"54px"}>
              {/* Lesson Button */}
              <Box>
                <Typography fontWeight={600} mb={1}>
                  Lesson Completion Button
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Complete & Continue"
                  InputProps={{
                    sx: {
                      bgcolor: '#f9fafb',
                      borderRadius: 2,
                      p: "5px"
                    },
                  }}
                />
              </Box>

              {/* Course Button */}
              <Box>
                <Typography fontWeight={600} mb={1}>
                  Course Completion Button
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Complete & Continue"
                  InputProps={{
                    sx: {
                      bgcolor: '#f9fafb',
                      borderRadius: 2,
                      p: "5px"
                    },
                  }}
                />
              </Box>

              {/* Footer Actions */}
              <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
                  Reset All
                </Button>
                <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
                  Save
                </Button>
              </Stack>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#FEF3FF"} icon={<SettingsIcon color="#B84BC0" />} title="Certificates" subTitle="Reward your learners with custom course completion certificates." children={
            <Box pl={"54px"}>
              {/* Lesson Button */}
              <Button variant="contained" sx={{ borderRadius: 2, bgcolor: "#6A42AB", py: "10px", px: "20px", mt: "32px" }}>
                Create Certificate
              </Button>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#FEF3FF"} icon={<SettingsIcon color="#B84BC0" />} title="Expiration Time" subTitle="Specify date and time till which the course will remain active for the learners." children={
            <Box pl={"54px"}>
              {/* Lesson Button */}
              <Select
                value={"Never Expires"}
                onChange={() => { }}
                displayEmpty
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#666666',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#666666',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#666666',
                  },
                  color: value ? '#000' : '#666666',
                }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                <MenuItem value="option1" defaultChecked>Never Expires</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#F6F1FF"} icon={<SettingsIcon color="#B84BC0" />} title="Course Rating" subTitle="Choose whether learners can rate this course." children={
            <Box pl={"54px"}>
              {/* Lesson Button */}
              <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                Allow the learners to rate this course
                <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
              </Typography>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#FFF4EC"} icon={<SettingsIcon color="#E07936" />} title="Read Acknowledgment" subTitle="Learners will be required to acknowledge reading after completing each
                  lesson in the course." children={
              <Box pl={"54px"}>
                {/* Lesson Button */}
                <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                  Enable read acknowledgement for this course
                  <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
                </Typography>
              </Box>
            } />
          <SettingsTab1 iconBgColor={"#F1F5FF"} icon={<SettingsIcon color="#2859C2" />} title="Course Completion" subTitle="Choose whether learners can mark the course as complete by themselves." children={
            <Box pl={"54px"}>
              {/* Lesson Button */}
              <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                Allow the learners to mark the course as complete
                <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
              </Typography>
            </Box>
          } />
          <SettingsTab1 iconBgColor={"#F1F5FF"} icon={<SettingsIcon color="#2859C2" />} title="Course Completion" subTitle="Choose whether learners can mark the course as complete by themselves." children={
            <Box pl={"54px"}>
              {/* Lesson Button */}
              <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                Allow the learners to mark the course as complete
                <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
              </Typography>
            </Box>
          } />
          <DeleteBox />
        </Box>
      ),
    },
  ];
  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical Tabs"
        sx={{
          width: 112,
          backgroundColor: "#fff",
        }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {tabdata.map((tab, index) => (
          <Tab
            key={index}
            iconPosition="top"
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
            icon={
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ background: value === index ? "#FBF8FF" : "#fff" }}
              >
                {tab.icon}
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    mt: "6px",
                    color: "#000000",
                  }}
                >
                  {tab.title}
                </Typography>
              </Box>
            }
            sx={{
              minHeight: "90px",
              borderLeft:
                value === index ? "4px solid #6A42AB" : "4px solid transparent",
              justifyContent: "center",
              textTransform: "none",
              background: value === index ? "#FBF8FF" : "#fff",
              px: 0,
            }}
          />
        ))}
      </Tabs>

      {/* Right-side tab panels */}
      <Box sx={{ flexGrow: 1, mx: "24px", width: "600px" }}>
        {tabdata.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default CourseMetaTabs;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
}


function SettingsTab1({ icon, iconBgColor, title, subTitle, children }: {
  iconBgColor: string;
  icon: ReactNode; title: string; subTitle: string; children: ReactNode
}) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: '#f8fafc',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              bgcolor: iconBgColor,
              p: 1.2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
              {title}
            </Typography>
            <Typography sx={{ color: '#64748b', fontSize: '14px' }}>
              {subTitle}
            </Typography>
          </Box>
        </Box>

        <Button
          onClick={handleToggle}
          variant="outlined"
          size="small"
          sx={{
            borderColor: '#7c3aed',
            color: '#7c3aed',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '12px',
            borderRadius: 2,
            px: "20px",
            py: "10px",
            '&:hover': {
              borderColor: '#5b21b6',
              backgroundColor: '#f3e8ff',
            },
          }}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </Box>

      {/* Expandable Content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Paper>
  );
}

function DeleteBox() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <Paper
    elevation={0}
    sx={{
      borderRadius: 3,
      bgcolor: '#f8fafc',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        rowGap: 2,
      }}
    >
      {/* Left Side */}
      <Box display="flex" alignItems="flex-start" gap={2}>
        <Box
          sx={{
            p: 1.2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: '2px',
          }}
        >
          <DeleteOutline sx={{ color: '#dc2626' }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
            Delete Course
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: '14px' }}>
            Deleting a course will delete its contents which cannot be recovered.
          </Typography>
        </Box>
      </Box>

      {/* Right Side Button */}
    </Box>

    {/* Warning Note */}
    <Typography
      sx={{
        color: '#C54644',
        fontSize: '14px',
        display: "flex",
        justifyContent: "space-between",
        fontWeight: 500,
        ml: { sm: '52px' }, // align with text block under icon
      }}
    >
      Note: Learners cannot continue with this course.
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          bgcolor: '#C54644',
          color: '#fff',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '12px',
          px: 2.5,
          py: 1,
          borderRadius: 2,
          '&:hover': {
            bgcolor: '#b91c1c',
          },
        }}
      >
        Delete Course
      </Button>
    </Typography>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Course
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You are about to permanently delete this course. Are you sure you want to delete it?
        </Typography>
        <Box display={"flex"} gap={"10px"} justifyContent={"end"} mt={2}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button color="error">Delete Course</Button>
        </Box>
      </Box>
    </Modal>
  </Paper>
}

