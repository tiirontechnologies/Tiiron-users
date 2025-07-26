import { Box, Button,  IconButton, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tooltip, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { ReactNode } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
export default function Reports() {
    return (
        <Box display={"grid"} gap={"40px"}>
            <Box display={"grid"} gap={"10px"}>
                <ReportStatistics tabList={["OverView", "Funnel"]} />
                <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                    <StatsCard iconBgColor="#EDE7FF" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#6644E0' }} />} numeric={1} title={"Yet to start"} />
                    <StatsCard iconBgColor="#FEECE1" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#E47934' }} />} numeric={1} title={"Yet to start"} />
                    <StatsCard iconBgColor="#FFF3D0" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#D99800' }} />} numeric={1} title={"Yet to start"} />
                    <StatsCard iconBgColor="#DAFBEA" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#1C9A5B' }} />} numeric={1} title={"Yet to start"} />
                </Box>
            </Box>
            <Box display={"grid"} gap={"10px"}>
                <ReportStatistics tabList={["Average"]} />
                <Box display={"grid"} gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                    <StatsCard iconBgColor="#FFEDF3" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#DA4C7F' }} />} numeric={"0%"} title={"Average Progress"} />
                    <StatsCard iconBgColor="#E5EAFF" icon={<AccessTimeIcon sx={{ fontSize: 60, color: '#3C55B8' }} />} numeric={"0 Seconds"} title={"Average Time Spent"} />
                </Box>
            </Box>
            <Box display={"grid"} gap={"10px"}>
                <ReportStatistics tabList={["Lesson", "User", "Spaces"]} />
            </Box>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    p: 2,
                    // bgcolor: '#f9f9fb',
                }}
            >
                {/* Top Filter/Search/Add Buttons Row */}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    justifyContent="space-between"
                    gap={2}
                    mb={2}
                >
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        gap={1}
                    >
                        {/* Filter Dropdown Icon */}
                        <IconButton
                            sx={{
                                border: '1px solid #E0E0E0',
                                borderRadius: 2,
                                p: 1,
                                minWidth: 40,
                            }}
                        >
                            <FilterListIcon fontSize="small" />
                            <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
 
                    </Box>

                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        gap={1}
                    >
                        {/* Learner Type Dropdown */}
                        <Select
                            defaultValue="direct"
                            displayEmpty
                            size="small"
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#fff', 
                                '.MuiSelect-select': { py: 0.8, px: 2 },
                            }}
                            IconComponent={ArrowDropDownIcon}
                        >
                            <MenuItem value="direct">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <FilterAltIcon sx={{ fontSize: 18, color: '#666666' }} />
                                    <Typography color="#666666">All</Typography>
                                </Box>
                            </MenuItem>
                        </Select>

                        {/* Add Learners Button */}
                        <Button
                            variant="contained" 
                            sx={{
                                textTransform: 'none',
                                bgcolor: '#6A42AB',
                                borderRadius: 2,
                                px: 2.5,
                                py: 1,
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    bgcolor: '#6A42AB',
                                },
                            }}
                        >
                            Export as CSV
                        </Button>
                    </Box>
                </Box>

                {/* Responsive Table Wrapper */}
                <Box
                    sx={{
                        overflowX: 'auto',
                        borderRadius: 3,
                    }}
                >
                    <Table
                        sx={{
                            minWidth: '800px',
                            bgcolor: '#fff',
                            borderCollapse: 'collapse',
                            '& .MuiTableCell-root': {
                                borderBottom: 'none',
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F7F7F8' }}>
                                <TableCell>S.No</TableCell>
                                <TableCell>Learner</TableCell>
                                <TableCell>Email Address</TableCell>
                                <TableCell>Completion Percentage</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                    </Table>

                </Box>
            </Paper>
        </Box>
    )
}

export function ReportStatistics({ tabList }: { tabList: Array<string> }) {
    const [value, setValue] = React.useState<string>(tabList[0]?.toLowerCase());

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return <Box
        sx={{
            borderRadius: 3,
            p: "20px",
            bgcolor: '#FFFFFF',
            width: "fit-content",
        }}
    >
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            {tabList?.map((item, idx) => <Tab
                key={idx}
                value={item?.toLowerCase()}
                label={item[0].toUpperCase() + item?.slice(1)}
                sx={{
                    fontSize: '16px',
                    color: '#9499A1',
                    '&.Mui-selected': {
                        color: '#6A42AB',
                    },
                }}
            />)}
        </Tabs>
    </Box>
}

export function StatsCard({ numeric, title, icon, iconBgColor }: { numeric: ReactNode; title: ReactNode; icon: ReactNode; iconBgColor: string }) {
    return <Paper
        elevation={0}
        sx={{
            bgcolor: '#fff',
            borderRadius: 3,
            p: "32px",
            minWidth: "240px",
            width: "auto",
        }}
    >
        <Box display="flex" alignItems="center" gap={1.5}>
            {/* Icon Container */}
            <Box
                sx={{
                    bgcolor: iconBgColor,
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>

            {/* Text Section */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Tooltip title={numeric}>
                    <Typography fontWeight={600} fontSize="24px" color="#1a1a1a" noWrap>
                        {numeric}
                    </Typography>
                </Tooltip>
                <Tooltip title={title}>
                    <Typography
                        fontSize="16px"
                        color="#666"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                        }}
                    >
                        {title}
                    </Typography>
                </Tooltip>
            </Box>
        </Box>
    </Paper>

}