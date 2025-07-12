import { IOSSwitch } from "@components/ui/Switch/IOSswitch";
import SettingsIcon from "@icons/SettingsIcon";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Collapse, FormControl, FormControlLabel, IconButton, MenuItem, Modal, Paper, Radio, Select, Stack, TextField, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function SettingsTab({ icon, iconBgColor, title, subTitle, children }: {
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

export default function Settings() {
    const [selected, setSelected] = useState('free');

    return <>
        <Box display={"grid"} gap={"24px"}>
            <SettingsTab iconBgColor={"#FFF6F6"} icon={<SettingsIcon color="#DB5959" />} title="Course Name And Description" subTitle="Enter Course And Description" children={
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
            <SettingsTab iconBgColor={"#FFF4EC"} icon={<SettingsIcon color="#E07936" />} title="Expiration Time" subTitle="Specify date and time till which the course will remain active for the learners." children={
                <Box pl={"54px"}>
                    {/* Lesson Button */}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            displayEmpty
                        >
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value={10}>Never Expires</MenuItem>
                            <MenuItem value={20}>Three Days</MenuItem>
                            <MenuItem value={30}>Two Days</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            } />
            <SettingsTab iconBgColor={"#FFF7DB"} icon={<SettingsIcon color="#BF9500" />} title="Modify Button Text" subTitle="Customize the text on the lesson and course completion buttons." children={
                <Box
                    display="flex"
                    flexDirection="column"
                    p={3}
                    pl={"54px"}
                    borderRadius={3}
                    bgcolor="#f9f9fb"
                    gap={2}
                >

                    <Box
                        mt={1}
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)"
                        gap={2} // Adjust spacing between items
                    >
                        {/* Option 1: Hub Users */}
                        <Paper
                            elevation={0}
                            onClick={() => setSelected('hub')}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: selected === 'hub' ? '1.5px solid #7e22ce' : '1.5px solid transparent',
                            }}
                        >
                            <FormControlLabel
                                value="hub"
                                control={
                                    <Radio
                                        checked={selected === 'hub'}
                                        onChange={() => setSelected('hub')}
                                        sx={{
                                            color: '#7e22ce',
                                            '&.Mui-checked': {
                                                color: '#7e22ce',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography fontWeight={600} fontSize="16px" color="#4D4D4D">
                                            Hub Users
                                        </Typography>
                                        <Typography variant="body2" color="#666666" fontSize="14px">
                                            All hub users can access this course and enroll themselves
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Paper>

                        {/* Option 2: Added Learners Only */}
                        <Paper
                            elevation={0}
                            onClick={() => setSelected('added')}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: selected === 'added' ? '1.5px solid #7e22ce' : '1.5px solid transparent',
                            }}
                        >
                            <FormControlLabel
                                value="added"
                                control={
                                    <Radio
                                        checked={selected === 'added'}
                                        onChange={() => setSelected('added')}
                                        sx={{
                                            color: '#7e22ce',
                                            '&.Mui-checked': {
                                                color: '#7e22ce',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography fontWeight={600} fontSize="16px" color="#4D4D4D">
                                            Added Learners Only
                                        </Typography>
                                        <Typography variant="body2" color="#666666" fontSize="14px">
                                            All hub users can access this course and enroll themselves
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Paper>
                        <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "10px", fontSize: "14px" }}>
                            Needs Admin Approval
                            <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
                        </Typography>
                    </Box>
                </Box>
            } />
            <SettingsTab iconBgColor={"#EDF8E7"} icon={<SettingsIcon color="#4E9E22" />} title="Course Duration" subTitle="Specify the number of days or hours a learner will take to complete this course." children={
                <Box pl={"54px"} display={"flex"} gap={"32px"}>
                    {/* Lesson Button */}
                    <Box display="flex" gap={2}>
                        {/* Hours Selector */}
                        <Paper
                            elevation={0}
                            sx={{
                                px: 2,
                                borderRadius: 2,
                                border: '1px solid #D1D1D1',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <Typography color="#4D4D4D" fontSize={14}>
                                Hours
                            </Typography>
                            <Box display="flex" flexDirection="column">
                                <IconButton size="small" sx={{ p: "0.5px" }}>
                                    <ArrowDropUpIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ p: "0.5px" }}>
                                    <ArrowDropDownIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Paper>

                        {/* Minutes Selector */}
                        <Paper
                            elevation={0}
                            sx={{
                                px: 2,
                                borderRadius: 2,
                                border: '1px solid #D1D1D1',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            <Typography color="#4D4D4D" fontSize={14}>
                                Minutes
                            </Typography>
                            <Box display="flex" flexDirection="column">
                                <IconButton size="small" sx={{ p: "0.5px" }}>
                                    <ArrowDropUpIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ p: "0.5px" }}>
                                    <ArrowDropDownIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                    <Box display={"flex"} gap={2}>
                        <Box>
                            <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
                                Save
                            </Button>
                        </Box>
                        <Box>
                            <Button variant="contained" disabled sx={{ borderRadius: 2 }}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            } />
            <SettingsTab iconBgColor={"#E9F9FF"} icon={<SettingsIcon color="#1781A7" />} title="Course Navigation" subTitle="Determine how your learners will navigate through the course.." children={
                <Box
                    display="flex"
                    flexDirection="column"
                    p={3}
                    pl={"54px"}
                    borderRadius={3}
                    bgcolor="#f9f9fb"
                    gap={2}
                >

                    <Box
                        mt={1}
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)"
                        gap={2} // Adjust spacing between items
                    >
                        {/* Option 1: Hub Users */}
                        <Paper
                            elevation={0}
                            onClick={() => setSelected('hub')}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: selected === 'hub' ? '1.5px solid #7e22ce' : '1.5px solid transparent',
                            }}
                        >
                            <FormControlLabel
                                value="hub"
                                control={
                                    <Radio
                                        checked={selected === 'hub'}
                                        onChange={() => setSelected('hub')}
                                        sx={{
                                            color: '#7e22ce',
                                            '&.Mui-checked': {
                                                color: '#7e22ce',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography fontWeight={600} fontSize="16px" color="#4D4D4D">
                                            Free Flow
                                        </Typography>
                                        <Typography variant="body2" color="#666666" fontSize="14px">
                                            Learners can navigate the course in any order.
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Paper>

                        {/* Option 2: Added Learners Only */}
                        <Paper
                            elevation={0}
                            onClick={() => setSelected('added')}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                cursor: 'pointer',
                                border: selected === 'added' ? '1.5px solid #7e22ce' : '1.5px solid transparent',
                            }}
                        >
                            <FormControlLabel
                                value="added"
                                control={
                                    <Radio
                                        checked={selected === 'added'}
                                        onChange={() => setSelected('added')}
                                        sx={{
                                            color: '#7e22ce',
                                            '&.Mui-checked': {
                                                color: '#7e22ce',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography fontWeight={600} fontSize="16px" color="#4D4D4D">
                                            Restricted
                                        </Typography>
                                        <Typography variant="body2" color="#666666" fontSize="14px">
                                            Learners can navigate the course in a sequential order only.
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Paper>
                    </Box>
                </Box>
            } />
            <SettingsTab iconBgColor={"#F1F5FF"} icon={<SettingsIcon color="#2859C2" />} title="Course Completion" subTitle="Choose whether learners can mark the course as complete by themselves." children={
                <Box pl={"54px"}>
                    {/* Lesson Button */}
                    <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                        Allow the learners to mark the course as complete
                        <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
                    </Typography>
                </Box>
            } />
            <SettingsTab iconBgColor={"#F6F1FF"} icon={<SettingsIcon color="#7E51CF" />} title="Course Rating" subTitle="Choose whether learners can rate this course." children={
                <Box pl={"54px"}>
                    {/* Lesson Button */}
                    <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                        Allow the learners to rate this course
                        <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
                    </Typography>
                </Box>
            } />
            <SettingsTab iconBgColor={"#FEF3FF"} icon={<SettingsIcon color="#B84BC0" />} title="Certificates" subTitle="Reward your learners with custom course completion certificates." children={
                <Box pl={"54px"}>
                    {/* Lesson Button */}
                    <Button variant="contained" sx={{ borderRadius: 2, bgcolor: "#6A42AB", py: "10px", px: "20px", mt: "32px" }}>
                        Create Certificate
                    </Button>
                </Box>
            } />
            <SettingsTab iconBgColor={"#FFF6F6"} icon={<SettingsIcon color="#DB5959" />} title="Modify Button Text" subTitle="Customize the text on the lesson and course completion buttons." children={
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
            <SettingsTab iconBgColor={"#FFF4EC"} icon={<SettingsIcon color="#E07936" />} title="Read Acknowledgment" subTitle="Learners will be required to acknowledge reading after completing each
                  lesson in the course." children={
                    <Box pl={"54px"}>
                        {/* Lesson Button */}
                        <Typography display={"flex"} gap={"8px"} alignItems={"center"} sx={{ mt: "32px", fontSize: "14px" }}>
                            Enable read acknowledgement for this course
                            <IOSSwitch focusVisibleClassName=".Mui-focusVisible" />
                        </Typography>
                    </Box>
                } />
            <DeleteBox />
        </Box>
    </>
}