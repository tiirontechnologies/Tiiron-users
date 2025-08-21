import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton,
    InputBase,
    Button,
    Chip,
    MenuItem,
    Select,
    Tabs,
    Tab,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
const LearnersTab = () => {
    return (
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

                    {/* Search Box */}
                    <Box
                        display="flex"
                        alignItems="center"
                        border="1px solid #E0E0E0"
                        borderRadius={4}
                        px={1.5}
                        py={0.75}
                        bgcolor="#fff"
                        width={{ xs: '100%', sm: 'auto' }}
                    >
                        <SearchIcon sx={{ color: '#999', mr: 1 }} />
                        <InputBase placeholder="Search" fullWidth />
                    </Box>
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
                            minWidth: 160,
                            '.MuiSelect-select': { py: 0.8, px: 2 },
                        }}
                        IconComponent={ArrowDropDownIcon}
                    >
                        <MenuItem value="direct">
                            <Box display="flex" alignItems="center" gap={1}>
                                <FilterAltIcon sx={{ fontSize: 18, color: '#666666' }} />
                                <Typography color="#666666">Direct Learner</Typography>
                            </Box>
                        </MenuItem>
                    </Select>

                    {/* Add Learners Button */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
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
                        Add Learners
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
                        <TableRow hover>
                            <TableCell>1</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={1.5}>
                                    <Avatar
                                        src="https://via.placeholder.com/40"
                                        sx={{ width: 36, height: 36 }}
                                    />
                                    <Box>
                                        <Typography fontWeight={600} fontSize="14px" color="#1a1a1a">
                                            Name of Learner
                                        </Typography>
                                        <Typography fontSize="13px" color="#664700">
                                            Admin
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={500}>Example@gmail.com</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={600}>90%</Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label="ONGOING"
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 167, 45, 0.15)', // soft orange bg
                                        color: '#FFA72D',                   // matching strong text
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        borderRadius: '8px',            // pill shape
                                        px: '12px',                        // wide left/right padding
                                        py: '4px',                         // vertical space
                                        height: 'auto',                   // allow vertical padding
                                        fontFamily: 'Inter, sans-serif',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Box>
        </Paper>
    );
};

export default function Learners() {
    const [value, setValue] = React.useState('users');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', display: "grid", gap: "12px" }}>
            <Box
                sx={{
                    borderRadius: 3,
                    p: "20px",
                    bgcolor: '#FFFFFF',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab
                        value="users"
                        label="Users"
                        sx={{
                            fontSize: '16px',
                            color: '#9499A1',
                            '&.Mui-selected': {
                                color: '#6A42AB',
                            },
                        }}
                    />
                    <Tab
                        value="spaces"
                        label="Spaces"
                        sx={{
                            fontSize: '16px',
                            color: '#9499A1',
                            '&.Mui-selected': {
                                color: '#6A42AB',
                            },
                        }}
                    />
                </Tabs>
            </Box>
            <LearnersTab />
        </Box>
    );
}