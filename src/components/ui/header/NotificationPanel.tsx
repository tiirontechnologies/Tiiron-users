import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Popover,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { ENV } from "../../../config/env";
import { useAuth } from "../../../hooks/useAuth";

interface AppNotification {
  id: number | string;
  title: string;
  message: string;
  category: string;
  createdAt: string;
  readAt: string | null;
}

interface NotificationResponse {
  notifications: AppNotification[];
  unreadCount: number;
}

const PAGE_SIZE = 20;

const getDesktopPermission = (): NotificationPermission | "unsupported" =>
  typeof window !== "undefined" && "Notification" in window
    ? Notification.permission
    : "unsupported";

const normalizeNotification = (value: unknown): AppNotification | null => {
  if (!value || typeof value !== "object") return null;
  const notification = value as Record<string, unknown>;
  if (notification.id === undefined || notification.id === null) return null;

  return {
    id: notification.id as number | string,
    title: typeof notification.title === "string" ? notification.title : "Notification",
    message: typeof notification.message === "string" ? notification.message : "",
    category: typeof notification.category === "string" ? notification.category : "general",
    createdAt:
      typeof notification.createdAt === "string"
        ? notification.createdAt
        : new Date().toISOString(),
    readAt: typeof notification.readAt === "string" ? notification.readAt : null,
  };
};

const getNotificationResponse = (payload: unknown): NotificationResponse => {
  if (!payload || typeof payload !== "object") {
    return { notifications: [], unreadCount: 0 };
  }

  const response = payload as Record<string, unknown>;
  const body = response.data && typeof response.data === "object"
    ? response.data as Record<string, unknown>
    : response;
  const items = Array.isArray(body.notifications)
    ? body.notifications
    : Array.isArray(body.items)
      ? body.items
      : Array.isArray(response.data)
        ? response.data
        : Array.isArray(payload)
          ? payload
          : [];
  const unreadCount = Number(body.unreadCount ?? response.unreadCount ?? 0);

  return {
    notifications: items
      .map(normalizeNotification)
      .filter((item): item is AppNotification => item !== null),
    unreadCount: Number.isFinite(unreadCount) ? unreadCount : 0,
  };
};

const categoryDetails = (category: string) => {
  switch (category.toLowerCase()) {
    case "announcement":
      return { label: "Announcement", color: "#b45309", background: "#fff7ed", icon: <CampaignOutlinedIcon /> };
    case "content":
    case "notes":
      return { label: category === "notes" ? "Notes" : "Course update", color: "#047857", background: "#ecfdf5", icon: <MenuBookOutlinedIcon /> };
    case "assignment":
    case "practice":
      return { label: category === "practice" ? "Practice" : "Assignment", color: "#1d4ed8", background: "#eff6ff", icon: <AssignmentOutlinedIcon /> };
    case "comment":
    case "reply":
      return { label: "Discussion", color: "#7c3aed", background: "#f5f3ff", icon: <ForumOutlinedIcon /> };
    case "enrollment":
      return { label: "Enrollment", color: "#0f766e", background: "#f0fdfa", icon: <CheckCircleOutlineIcon /> };
    default:
      return { label: "Learning update", color: "#475569", background: "#f1f5f9", icon: <NotificationsOutlinedIcon /> };
  }
};

const formatTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isToday) return `Today · ${time}`;
  if (date.toDateString() === yesterday.toDateString()) return `Yesterday · ${time}`;
  return `${date.toLocaleDateString([], { month: "short", day: "numeric" })} · ${time}`;
};

const NotificationPanel = () => {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [markingId, setMarkingId] = useState<number | string | null>(null);
  const [desktopPermission, setDesktopPermission] = useState(getDesktopPermission);
  const [error, setError] = useState("");

  const fetchNotifications = useCallback(async (includeRead = showHistory) => {
    setIsLoading(true);
    setError("");
    try {
      const query = new URLSearchParams({ page: "1", limit: String(PAGE_SIZE) });
      if (includeRead) query.set("includeRead", "true");
      const response = await fetch(`${ENV.SERVER_URL}/notifications?${query}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Could not load notifications.");

      const result = getNotificationResponse(await response.json());
      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Could not load notifications.");
    } finally {
      setIsLoading(false);
    }
  }, [showHistory]);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    let isActive = true;
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/service-worker.js").catch(() => {
        // The in-app inbox remains available if service workers are unavailable.
      });
    }
    const loadNotifications = async () => {
      try {
        const response = await fetch(`${ENV.SERVER_URL}/notifications?page=1&limit=${PAGE_SIZE}`, {
          credentials: "include",
        });
        if (!response.ok) return;
        const result = getNotificationResponse(await response.json());
        if (isActive) {
          setNotifications(result.notifications);
          setUnreadCount(result.unreadCount);
        }
      } catch {
        // Keep the panel available; it can retry when opened.
      }
    };

    void loadNotifications();
    const eventSource = new EventSource(`${ENV.SERVER_URL}/notifications/subscribe`, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as Record<string, unknown>;
        const notification = normalizeNotification(payload.notification ?? payload.data ?? payload);
        if (!notification || !isActive) return;
        setNotifications((current) => [
          notification,
          ...current.filter((item) => item.id !== notification.id),
        ].slice(0, PAGE_SIZE));
        if (!notification.readAt) setUnreadCount((count) => count + 1);
        if (
          !notification.readAt &&
          document.visibilityState === "hidden" &&
          getDesktopPermission() === "granted" &&
          "serviceWorker" in navigator
        ) {
          void navigator.serviceWorker.ready.then((registration) =>
            registration.showNotification(notification.title, {
              body: notification.message,
              icon: "/Tiiron_Technologies_FavIcon.ico",
              tag: `notification-${notification.id}`,
              data: { url: window.location.pathname },
            }),
          ).catch(() => {
            // A failed system alert does not affect the persisted inbox.
          });
        }
      } catch {
        // Ignore malformed stream events; the next reconnect fetch restores the inbox.
      }
    };
    eventSource.onopen = () => {
      if (isActive) void loadNotifications();
    };

    return () => {
      isActive = false;
      eventSource.close();
    };
  }, [isLoggedIn]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    void fetchNotifications(showHistory);
  };

  const handleClose = () => setAnchorEl(null);

  const enableDesktopAlerts = async () => {
    if (getDesktopPermission() === "unsupported") {
      setError("Desktop notifications are not supported by this browser.");
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setDesktopPermission(permission);
      if (permission === "granted" && "serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/service-worker.js");
      }
    } catch {
      setError("Could not enable desktop notifications.");
    }
  };

  const markAsRead = async (notification: AppNotification) => {
    if (notification.readAt || markingId !== null) return;
    setMarkingId(notification.id);
    setError("");
    try {
      const response = await fetch(
        `${ENV.SERVER_URL}/notifications/${encodeURIComponent(notification.id)}/read`,
        { method: "PATCH", credentials: "include" },
      );
      if (!response.ok) throw new Error("Could not mark this notification as read.");
      setNotifications((current) => showHistory
        ? current.map((item) => item.id === notification.id
          ? { ...item, readAt: new Date().toISOString() }
          : item)
        : current.filter((item) => item.id !== notification.id));
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (markError) {
      setError(markError instanceof Error ? markError.message : "Could not update notification.");
    } finally {
      setMarkingId(null);
    }
  };

  const markAllAsRead = async () => {
    if (unreadCount === 0 || isMarkingAll) return;
    setIsMarkingAll(true);
    setError("");
    try {
      const response = await fetch(`${ENV.SERVER_URL}/notifications/read-all`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Could not mark notifications as read.");
      setNotifications((current) => showHistory
        ? current.map((item) => item.readAt ? item : { ...item, readAt: new Date().toISOString() })
        : []);
      setUnreadCount(0);
    } catch (markError) {
      setError(markError instanceof Error ? markError.message : "Could not update notifications.");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    const includeRead = value === 1;
    setShowHistory(includeRead);
    void fetchNotifications(includeRead);
  };

  if (!isLoggedIn) return null;

  const alertsDisabled =
    desktopPermission === "granted" ||
    desktopPermission === "denied" ||
    desktopPermission === "unsupported";

  const alertsTooltip =
    desktopPermission === "granted"
      ? "Desktop alerts on"
      : desktopPermission === "denied"
        ? "Alerts blocked in browser settings"
        : desktopPermission === "unsupported"
          ? "Desktop alerts not supported"
          : "Enable desktop alerts";

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleOpen}
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          aria-haspopup="dialog"
          sx={{
            color: "#334155",
            width: 40,
            height: 40,
            border: "1px solid transparent",
            "&:hover": { color: "#0f766e", backgroundColor: "#f0fdfa", borderColor: "#ccfbf1" },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            max={99}
            invisible={unreadCount === 0}
            sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 17, height: 17 } }}
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { role: "dialog", "aria-label": "Notifications" } }}
        sx={{ mt: 1, zIndex: 1400 }}
      >
        <Box sx={{ width: { xs: "calc(100vw - 24px)", sm: 390 }, maxWidth: 390 }}>
          <Box sx={{ px: 2.25, pt: 2, pb: 1.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
              <Box>
                <Typography sx={{ fontSize: 17, fontWeight: 700, color: "#172033" }}>
                  Your learning updates
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b" }}>
                  Course activity and account updates
                </Typography>
              </Box>
              <Stack direction="row" alignItems="center" gap={0.75}>
                <Tooltip title={alertsTooltip}>
                  <span>
                    <IconButton
                      aria-label={alertsTooltip}
                      onClick={() => void enableDesktopAlerts()}
                      disabled={alertsDisabled}
                      size="small"
                      sx={{
                        color: desktopPermission === "granted" ? "#0f766e" : "#64748b",
                        border: "1px solid #dbe7e5",
                        borderRadius: 1.5,
                        "&.Mui-disabled": {
                          color: desktopPermission === "granted" ? "#0f766e" : "#94a3b8",
                        },
                      }}
                    >
                      {desktopPermission === "granted" ? (
                        <NotificationsActiveOutlinedIcon fontSize="small" />
                      ) : desktopPermission === "denied" || desktopPermission === "unsupported" ? (
                        <NotificationsOffOutlinedIcon fontSize="small" />
                      ) : (
                        <AddAlertOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Mark all as read">
                  <span>
                    <IconButton
                      aria-label="Mark all notifications as read"
                      onClick={() => void markAllAsRead()}
                      disabled={unreadCount === 0 || isMarkingAll}
                      size="small"
                      sx={{ color: "#0f766e", border: "1px solid #dbe7e5", borderRadius: 1.5 }}
                    >
                      {isMarkingAll ? <CircularProgress size={17} /> : <DoneAllIcon fontSize="small" />}
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
          <Divider />
          <Tabs
            value={showHistory ? 1 : 0}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="Notification views"
            sx={{
              minHeight: 42,
              "& .MuiTab-root": { minHeight: 42, textTransform: "none", fontSize: 13, fontWeight: 600 },
              "& .MuiTabs-indicator": { backgroundColor: "#0f766e", height: 2 },
            }}
          >
            <Tab label={`Unread${unreadCount ? ` (${unreadCount})` : ""}`} />
            <Tab label="History" />
          </Tabs>
          <Divider />
          {error && <Alert severity="error" onClose={() => setError("")} sx={{ mx: 1.5, mt: 1.5 }}>{error}</Alert>}
          <List disablePadding sx={{ maxHeight: { xs: "min(60vh, 440px)", sm: 440 }, overflowY: "auto" }}>
            {isLoading && notifications.length === 0 ? (
              <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
                <CircularProgress size={24} sx={{ color: "#0f766e" }} />
              </Stack>
            ) : notifications.length === 0 ? (
              <Stack alignItems="center" spacing={0.75} sx={{ px: 3, py: 4.5, textAlign: "center" }}>
                <Avatar sx={{ width: 42, height: 42, bgcolor: "#f0fdfa", color: "#0f766e", mb: 0.5 }}>
                  <NotificationsOutlinedIcon />
                </Avatar>
                <Typography sx={{ fontWeight: 650, fontSize: 14, color: "#253047" }}>
                  {showHistory ? "No learning history yet" : "You're all caught up"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748b", maxWidth: 240 }}>
                  {showHistory ? "Read course and account updates will appear here." : "New course updates and activity will show up here."}
                </Typography>
              </Stack>
            ) : (
              notifications.map((notification, index) => {
                const category = categoryDetails(notification.category);
                const isUnread = !notification.readAt;
                return (
                  <Box key={notification.id}>
                    <Box
                      component="article"
                      onClick={() => void markAsRead(notification)}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.25,
                        px: 2,
                        py: 1.5,
                        cursor: isUnread ? "pointer" : "default",
                        backgroundColor: isUnread ? "#f7fbfa" : "#fff",
                        transition: "background-color 150ms ease",
                        "&:hover": { backgroundColor: isUnread ? "#eff8f6" : "#f8fafc" },
                      }}
                    >
                      <Avatar sx={{ width: 34, height: 34, bgcolor: category.background, color: category.color }}>
                        {category.icon}
                      </Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
                          <Typography sx={{ fontSize: 13.5, lineHeight: 1.45, fontWeight: isUnread ? 700 : 600, color: "#1e293b" }}>
                            {notification.title}
                          </Typography>
                          {isUnread && <Box aria-label="Unread" sx={{ width: 7, height: 7, mt: 0.7, flex: "0 0 auto", borderRadius: "50%", bgcolor: "#0f766e" }} />}
                        </Stack>
                        <Typography sx={{ mt: 0.35, fontSize: 12.5, lineHeight: 1.5, color: "#64748b", overflowWrap: "anywhere" }}>
                          {notification.message}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ mt: 1 }}>
                          <Stack direction="row" alignItems="center" gap={0.75}>
                            <Box component="span" sx={{ px: 0.8, py: 0.25, borderRadius: 0.75, bgcolor: category.background, color: category.color, fontSize: 10.5, fontWeight: 700 }}>
                              {category.label}
                            </Box>
                            <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: 10.5 }}>
                              {formatTime(notification.createdAt)}
                            </Typography>
                          </Stack>
                          {isUnread && (
                            <Tooltip title="Mark as read">
                              <IconButton
                                aria-label={`Mark ${notification.title} as read`}
                                size="small"
                                disabled={markingId !== null}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  void markAsRead(notification);
                                }}
                                sx={{ p: 0.4, color: "#64748b", "&:hover": { color: "#0f766e" } }}
                              >
                                {markingId === notification.id
                                  ? <CircularProgress size={15} />
                                  : <CheckCircleOutlineIcon sx={{ fontSize: 17 }} />}
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </Box>
                    </Box>
                    {index < notifications.length - 1 && <Divider component="li" />}
                  </Box>
                );
              })
            )}
          </List>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 1 }}>
            <Tooltip title="Refresh">
              <span>
                <IconButton
                  aria-label="Refresh notifications"
                  onClick={() => void fetchNotifications(showHistory)}
                  disabled={isLoading}
                  size="small"
                  sx={{
                    color: "#0f766e",
                    border: "1px solid #dbe7e5",
                    width: 34,
                    height: 34,
                    "&:hover": { backgroundColor: "#f0fdfa" },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={18} sx={{ color: "#0f766e" }} />
                  ) : (
                    <RefreshIcon fontSize="small" />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationPanel;