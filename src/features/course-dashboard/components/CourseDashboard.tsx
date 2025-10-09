import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  Divider,
  Avatar,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  Fab,
  useTheme,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel,
  Switch,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  StarRounded,
  SearchRounded,
  DownloadRounded,
  AddRounded,
  CampaignRounded,
  MoreVertRounded,
  ArrowOutwardRounded,
  CheckCircleOutline,
  CloseRounded,
} from "@mui/icons-material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { CourseHeader, KPI, Learner, Analytics, Enrollments, LearnerStatus } from '../types';
import { header, kpis, initialLearners, analytics, enrollments, STATUS_COLOR } from '../utils/mockData';
import { exportCSV } from '../utils/helpers';
// Modularized components
import Hero from "./sections/Hero";
import OverviewCard from "./sections/OverviewCard";
import AnalyticsCard from "./sections/AnalyticsCard";
import LearnersTable from "./sections/LearnersTable";
import RatingCard from "./sections/RatingCard";
import EnrollmentsCard from "./sections/EnrollmentsCard";
import FloatingActions from "./sections/FloatingActions";
import AddLearnerDialog from "./dialogs/AddLearnerDialog";
import AnnouncementDialog from "./dialogs/AnnouncementDialog";

/* ==============================
 * Small building blocks
 * ============================== */
function StatCard({ label, value, suffix }: KPI) {
  const theme = useTheme();
  return (
    <Card sx={{ height: "100%", borderRadius: 3, overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}05)`,
          pointerEvents: "none",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 0.5 }}>
          <Typography variant="h4" fontWeight={800}>
            {value}
          </Typography>
          {suffix && (
            <Typography variant="caption" color="text.secondary">
              {suffix}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function StatMini({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={800}>
        {value}
      </Typography>
    </Box>
  );
}

function KPIRing({ percent = 68 }: { percent?: number }) {
  const data = [
    { name: "Completed", value: percent },
    { name: "Remaining", value: Math.max(0, 100 - percent) },
  ];
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={85}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          <Cell fill={theme.palette.primary.main} />
          <Cell fill={theme.palette.action.hover} />
        </Pie>
        <ReTooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

function StatusChip({ status }: { status: LearnerStatus }) {
  return <Chip label={status} size="small" color={STATUS_COLOR[status]} /> as any;
}

/* ==============================
 * Main Page
 * ============================== */
export default function CourseDashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [query, setQuery] = React.useState<string>("");
  const [granularity, setGranularity] = React.useState<"Weekly" | "Monthly" | "Quarterly">("Weekly");
  const [learners, setLearners] = React.useState<Learner[]>(initialLearners);
  const [addOpen, setAddOpen] = React.useState(false);
  const [annOpen, setAnnOpen] = React.useState(false);
  const [snack, setSnack] = React.useState<string | null>(null);

  const filteredLearners = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter((l) =>
      l.name.toLowerCase().includes(q) || (l.email?.toLowerCase().includes(q) ?? false)
    );
  }, [query, learners]);

  const PIE_COLORS = [
    theme.palette.success.main,
    theme.palette.primary.main,
    theme.palette.error.main,
  ];

  const handleAdd = (l: Learner) => {
    setLearners((prev) => [l, ...prev]);
    setSnack("Learner added successfully");
  };

  return (
    <Box sx={{ bgcolor: (t) => t.palette.background.default, minHeight: "100vh", pb: 3 }}>
      <Hero />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* KPI Row */}
        <Grid container spacing={2}>
          {kpis.map((k) => (
            <Grid item xs={12} sm={6} md={3} key={k.label}>
              <StatCard {...k} />
            </Grid>
          ))}
        </Grid>

        {/* Overview + Analytics top */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Course Overview with ring */}
          <Grid item xs={12} md={7}>
            <OverviewCard />
          </Grid>

          {/* Small analytics card */}
          <Grid item xs={12} md={5}>
            <AnalyticsCard />
          </Grid>
        </Grid>

        {/* Learners + Drop-off */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Learners Table */}
          <Grid item xs={12} md={8}>
            <LearnersTable learners={learners} onAddOpen={() => setAddOpen(true)} />
          </Grid>

          {/* Drop-off + Rating */}
          <Grid item xs={12} md={4}>
            <RatingCard />
          </Grid>
        </Grid>

        {/* Enrollments Over Time */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <EnrollmentsCard granularity={granularity} setGranularity={setGranularity} />
          </Grid>
        </Grid>
      </Container>

      <FloatingActions onAnnounce={() => setAnnOpen(true)} onAdd={() => setAddOpen(true)} learners={learners} />

      {/* Dialogs */}
      <AddLearnerDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
      <AnnouncementDialog open={annOpen} onClose={() => setAnnOpen(false)} />

      <Snackbar open={!!snack} autoHideDuration={3000} onClose={() => setSnack(null)}>
        <Alert icon={<CheckCircleOutline />} onClose={() => setSnack(null)} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
