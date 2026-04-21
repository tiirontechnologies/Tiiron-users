import React, { useState, useEffect } from 'react';
import { Box, IconButton, Badge, Popover, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ENV } from '../../../config/env';
import { useAuth } from '../../../hooks/useAuth';

export interface AppNotification {
  title: string;
  message: string;
  timestamp: string;
}

const NotificationPanel = () => {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    // if (!isLoggedIn) return;

    // Fetch existing notifications first
    fetch(`${ENV.SERVER_URL}/notifications`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const pastNotifs = data.map((n: any) => ({
            title: n.title || 'Notification',
            message: n.message || '',
            timestamp: n.createdAt || n.timestamp || new Date().toISOString()
          }));
          setNotifications(pastNotifs);
        }
      })
      .catch(err => console.error("Failed to fetch past notifications", err));

    // Connect to SSE endpoint, sending cookies
    const evtSource = new EventSource(`${ENV.SERVER_URL}/notifications/subscribe`, { withCredentials: true });

    evtSource.onmessage = (event) => {
      try {
        console.log(event);
        const data = JSON.parse(event.data);
        const newNotif: AppNotification = {
          title: data.title || 'New Notification',
          message: data.message || '',
          timestamp: new Date().toISOString()
        };

        setNotifications((prev) => [newNotif, ...prev]);
        setUnreadCount((prev) => prev + 1);
      } catch (e) {
        console.error("Error parsing notification:", e);
      }
    };

    evtSource.onerror = (error) => {
      console.error("SSE connection error:", error);
    };

    return () => {
      evtSource.close();
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <>
      {console.log("hello")}
      <IconButton
        onClick={handleClick}
        sx={{
          color: "#000000",
          padding: "8px",
          flexShrink: 0,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#f3f4f6",
            transform: "scale(1.1)",
            "& svg": {
              color: "#fbbf24",
            },
          },
        }}
        aria-label="Notifications"
      >
        <Badge badgeContent={unreadCount} color="error" max={99} invisible={unreadCount === 0}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1, zIndex: 9999 }}
      >
        <Box sx={{ width: 320, maxHeight: 400, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc' }}>
            <Typography variant="subtitle1" fontWeight="600">
              Notifications
            </Typography>
          </Box>
          <Divider />
          <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              notifications.map((notif, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start" sx={{ '&:hover': { bgcolor: '#f1f5f9' }, cursor: 'pointer' }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight="500">
                          {notif.title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                            {notif.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                            {formatTime(notif.timestamp)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationPanel;
