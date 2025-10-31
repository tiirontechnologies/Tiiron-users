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

import {
  CourseHeader,
  KPI,
  Learner,
  Analytics,
  Enrollments,
  LearnerStatus,
} from "../types";
import {
  header,
  kpis,
  initialLearners,
  analytics,
  enrollments,
  STATUS_COLOR,
} from "../utils/mockData";
import { exportCSV } from "../utils/helpers";

/* ==============================
 * Small building blocks
 * ============================== */
function StatCard({ label, value, suffix }: KPI) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
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
        <Stack
          direction="row"
          alignItems="baseline"
          spacing={1}
          sx={{ mt: 0.5 }}
        >
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
  return (
    <Chip label={status} size="small" color={STATUS_COLOR[status]} />
  ) as any;
}

/* ==============================
 * Dialogs
 * ============================== */
function AddLearnerDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (l: Learner) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<LearnerStatus>("Active");
  const [progress, setProgress] = React.useState<number>(0);

  const canAdd = name.trim().length > 1 && progress >= 0 && progress <= 100;

  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 10);
    onAdd({
      id: crypto.randomUUID(),
      name,
      email,
      enrolled: now,
      progress,
      status,
      lastActive: now,
    });
    setName("");
    setEmail("");
    setProgress(0);
    setStatus("Active");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Learner</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <TextField
            label="Progress (%)"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            type="number"
            inputProps={{ min: 0, max: 100 }}
          />
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as LearnerStatus)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseRounded />}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          disabled={!canAdd}
          variant="contained"
          startIcon={<AddRounded />}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function AnnouncementDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sendEmail, setSendEmail] = React.useState(true);
  const [message, setMessage] = React.useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Send Announcement</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Subject"
            fullWidth
            defaultValue={`Update for ${header.title}`}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <FormLabel>Also send email</FormLabel>
            <Switch
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<CampaignRounded />}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ==============================
 * Main Page
 * ============================== */
export default function CourseDashboard() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [query, setQuery] = React.useState<string>("");
  const [granularity, setGranularity] = React.useState<
    "Weekly" | "Monthly" | "Quarterly"
  >("Weekly");
  const [learners, setLearners] = React.useState<Learner[]>(initialLearners);
  const [addOpen, setAddOpen] = React.useState(false);
  const [annOpen, setAnnOpen] = React.useState(false);
  const [snack, setSnack] = React.useState<string | null>(null);

  const filteredLearners = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return learners;
    return learners.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.email?.toLowerCase().includes(q) ?? false)
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
    <Box
      sx={{
        bgcolor: (t) => t.palette.background.default,
        minHeight: "100vh",
        pb: 12,
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          py: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "saturate(180%) blur(6px)",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ md: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant={isMdUp ? "h4" : "h5"}
                fontWeight={900}
                letterSpacing={-0.5}
              >
                {header.title}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 0.5, flexWrap: "wrap" }}
              >
                <Chip size="small" label={`Course ID: ${header.id}`} />
                <Chip size="small" label={`Category: ${header.category}`} />
                <Chip size="small" label={`Instructor: ${header.instructor}`} />
              </Stack>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1}>
              <StarRounded sx={{ color: "#FFB400" }} />
              <Typography variant="h6" fontWeight={800}>
                {header.rating.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({header.reviews} reviews)
              </Typography>
              <Button
                endIcon={<ArrowOutwardRounded />}
                sx={{ ml: 1 }}
                variant="contained"
              >
                View Reviews
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

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
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader
                action={
                  <IconButton size="small">
                    <MoreVertRounded />
                  </IconButton>
                }
                title={
                  <Typography variant="h6" fontWeight={800}>
                    Overall Completion Rate
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary">
                    Live cohort performance
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <KPIRing percent={header.completionOverall} />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <StatMini title="Total Enrolled" value="245" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Completion Rate" value="68%" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Revenue Generated" value="$12,450" />
                      </Grid>
                      <Grid item xs={6}>
                        <StatMini title="Completed Learners" value="20" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Small analytics card */}
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3, height: "100%" }}>
              <CardHeader
                action={
                  <IconButton size="small">
                    <MoreVertRounded />
                  </IconButton>
                }
                title={
                  <Typography variant="h6" fontWeight={800}>
                    Analytics
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary">
                    Distribution & engagement
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StatMini
                      title="Average Progress"
                      value={`${analytics.avgProgress}%`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatMini
                      title="Active Learners"
                      value={analytics.active}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.distribution}
                        innerRadius={55}
                        outerRadius={85}
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={2}
                      >
                        {analytics.distribution.map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <ReTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Learners + Drop-off */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Learners Table */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={800}>
                    Learners ({learners.length})
                  </Typography>
                }
                action={
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <TextField
                      size="small"
                      placeholder="Search by name or email"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRounded />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<DownloadRounded />}
                      onClick={() => exportCSV(filteredLearners)}
                    >
                      Export
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddRounded />}
                      onClick={() => setAddOpen(true)}
                    >
                      Add Learner
                    </Button>
                  </Stack>
                }
              />
              <CardContent>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Learner</TableCell>
                        <TableCell>Enrolled Date</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredLearners.map((l) => (
                        <TableRow key={l.id} hover>
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Avatar sx={{ width: 28, height: 28 }}>
                                {l.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography fontWeight={600}>
                                  {l.name}
                                </Typography>
                                {l.email && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {l.email}
                                  </Typography>
                                )}
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>{l.enrolled}</TableCell>
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ minWidth: 160 }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={l.progress}
                                  sx={{ height: 8, borderRadius: 999 }}
                                />
                              </Box>
                              <Chip
                                label={`${l.progress}%`}
                                size="small"
                                color={l.progress === 100 ? "info" : "default"}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <StatusChip status={l.status} />
                          </TableCell>
                          <TableCell>{l.lastActive}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Drop-off + Rating */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={800}>
                    Course Rating & Feedback
                  </Typography>
                }
              />
              <CardContent>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <StarRounded sx={{ color: "#FFB400" }} />
                  <Typography variant="h5" fontWeight={900}>
                    {analytics.rating.value.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({analytics.rating.reviews} reviews)
                  </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Common Drop-off Points
                </Typography>
                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.dropoff} barCategoryGap={8}>
                      <XAxis dataKey="lesson" hide />
                      <YAxis hide />
                      <ReTooltip />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {analytics.dropoff.map((d) => (
                    <Stack
                      key={d.lesson}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="caption" color="text.secondary">
                        {d.lesson}
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {d.value}%
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Enrollments Over Time */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6" fontWeight={800}>
                    Enrollments Over Time
                  </Typography>
                }
                action={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FormControl size="small">
                      <Select
                        value={granularity}
                        onChange={(e) => setGranularity(e.target.value as any)}
                      >
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="outlined">Last 6 Weeks</Button>
                    <Button variant="outlined">Last 3 Months</Button>
                    <Button variant="outlined">Year to Date</Button>
                  </Stack>
                }
              />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={enrollments.series}
                      margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                    >
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ReTooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={theme.palette.primary.main}
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatMini
                      title="Total Enrollment"
                      value={enrollments.total.toLocaleString()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <StatMini
                      title="Unique Students"
                      value={enrollments.unique.toLocaleString()}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Quick Actions */}
      <Stack
        direction="column"
        spacing={1.5}
        sx={{ position: "fixed", right: 24, bottom: 24, zIndex: 100 }}
      >
        <Tooltip title="Send Announcement">
          <Fab color="primary" onClick={() => setAnnOpen(true)}>
            <CampaignRounded />
          </Fab>
        </Tooltip>
        <Tooltip title="Add Learner">
          <Fab color="secondary" onClick={() => setAddOpen(true)}>
            <AddRounded />
          </Fab>
        </Tooltip>
        <Tooltip title="Export Data">
          <Fab
            onClick={() => exportCSV(filteredLearners)}
            sx={{
              bgcolor: "success.main",
              color: "white",
              "&:hover": { bgcolor: "success.dark" },
            }}
          >
            <DownloadRounded />
          </Fab>
        </Tooltip>
      </Stack>

      {/* Dialogs */}
      <AddLearnerDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <AnnouncementDialog open={annOpen} onClose={() => setAnnOpen(false)} />

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
      >
        <Alert
          icon={<CheckCircleOutline />}
          onClose={() => setSnack(null)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
