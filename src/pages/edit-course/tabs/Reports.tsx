import { CustomTabs } from "@components/CustomTabPanel";
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
} from "@mui/material";
import React from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FilterIcon from "@icons/FilterIcon";
import ListChecklistIcon from "@icons/ListChecklistIcon";
const Reports = () => {
  return (
    <>
      <CustomTabs
        tabs={["Overview", "Funnel"]}
        panels={[<Overview />, <Overview />]}
      />
      <Box sx={{ mt: "40px" }}>
        <CustomTabs tabs={["Average"]} panels={[<Average />]} />
      </Box>
      <Box sx={{ mt: "40px" }}>
        <CustomTabs
          tabs={["Lesson", "Users", "Spaces"]}
          panels={[<Lesson />]}
        />
      </Box>
    </>
  );
};

export default Reports;
const ReportsData = [
  {
    id: 1,
    value: 1,
    label: "Total Learner",
    icon: <ProfileIcon />,
    bgColor: "#EDE7FF",
  },
  {
    id: 2,
    value: 1,
    label: "Yet to Start",
    icon: <TimerIcon />,
    bgColor: "#FEECE1",
  },
  {
    id: 2,
    value: 2,
    label: "In Progress",
    icon: <SandTimerIcon />,
    bgColor: "#FFF3D0",
  },
  {
    id: 2,
    value: 3,
    label: "Completed",
    icon: <TickCircleIcon />,
    bgColor: "#DAFBEA",
  },
];
const ReportsAverageData = [
  {
    id: 1,
    value: "0%",
    label: "Average Progress",
    icon: <TimeProgressIcon />,
    bgColor: "#FFEDF3",
  },
  {
    id: 1,
    value: (
      <>
        0
        <Typography component="span" sx={{ color: "#666666" }}>
          Seconds
        </Typography>
      </>
    ),
    label: "Average Time Spent",
    icon: <ClockIcon />,
    bgColor: "#E5EAFF",
  },
];
const Overview = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-evenly",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {ReportsData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};

const Average = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-evenly",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {ReportsAverageData.map((item) => (
        <ReportsCard key={item.id} item={item} />
      ))}
    </Box>
  );
};
interface ReportsCardProps {
  item: {
    value: number | string | React.ReactElement;
    icon: React.ReactElement;
    label: string;
    bgColor: string;
  };
}
const ReportsCard: React.FC<ReportsCardProps> = ({ item }) => {
  return (
    <Box
      sx={{
        p: "32px",
        borderRadius: "16px",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width: "fit-content",
      }}
    >
      <Box
        sx={{
          height: "60px",
          width: "60px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: item.bgColor,
        }}
      >
        {item.icon}
      </Box>
      <Box>
        <Typography
          sx={{ color: "#000000", fontSize: "24px", fontWeight: "600" }}
        >
          {item.value}
        </Typography>
        <Typography sx={{ color: "#666666", fontSize: "16px" }}>
          {item.label}
        </Typography>
      </Box>
    </Box>
  );
};

const Lesson = () => {
  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: "16px" }}>
      <Box
        sx={{
          p: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          sx={{
            border: "1px solid #E6E6E6",
          }}
          startIcon={<ListChecklistIcon color="#666666" />}
          endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
        ></Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button
            variant="text"
            sx={{
              border: "1px solid #E6E6E6",
              color: "#666666",
            }}
            startIcon={<FilterIcon color="#666666" size={18} />}
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ color: "#666666" }} />}
          >
            All
          </Button>
          <Button>Export as CSV</Button>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: "#F7F7F8" }}>
            <TableRow>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                S.No
              </TableCell>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                Lessons
              </TableCell>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                Yet to Start
              </TableCell>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                in Progress
              </TableCell>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                Completed
              </TableCell>
              <TableCell
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "400" }}
              >
                Time Spent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "300px" }}></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
