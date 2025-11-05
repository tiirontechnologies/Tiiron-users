import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  Typography,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useNavigate, NavigateFunction } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

const menuItems = [
  { text: "View Profile", icon: <PersonOutlineOutlinedIcon />, color: "#4CAF50" },
  {
    text: "My Courses",
    icon: <MenuBookOutlinedIcon />,
    color: "#2196F3",
    onClick: (navigate: NavigateFunction) => {
      navigate("/learner/my-courses");
    }
  },
  {
    text: "Browse Courses",
    icon: <ExploreOutlinedIcon />,
    color: "#9C27B0",
    onClick: (navigate: NavigateFunction) => {
      navigate("/learner/browse-courses");
    }
  },
  {
    text: "Tiiron Business",
    icon: <BusinessOutlinedIcon />,
    color: "#FF5722",
    onClick: (_navigate: NavigateFunction) => {
      window.location.href = "https://tiiron-for-busines";
    }
  },
  { text: "Publish The Course", icon: <PublishOutlinedIcon />, color: "#00BCD4" },
  {
    text: "Notification Settings",
    icon: <NotificationsNoneOutlinedIcon />,
    color: "#FFC107",
  },
];

const ProfileCenterPopup = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getListItemStyles = (color: string, isSelected: boolean) => ({
    "&.MuiListItemButton-root": {
      borderRadius: 2,
      padding: "10px 16px",
      marginBottom: 0.5,
      "&:hover": {
        backgroundColor: `${color}14`,
      },
      ...(isSelected && {
        backgroundColor: `${color}1A`,
      }),
    },
    "& .MuiListItemIcon-root": {
      minWidth: 40,
      "& svg": {
        color: color,
      },
    },
  });

  return (
    <>
      {/* Trigger Avatar */}
      <Avatar
        src=""
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          width: 42,
          height: 42,
          bgcolor: theme.palette.primary.main,
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        RS
      </Avatar>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 340,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            p: 3,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 2,
            }}
          >
            <Avatar
              src=""
              sx={{
                width: 70,
                height: 70,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                fontSize: "1.5rem",
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              RS
            </Avatar>

            <Typography variant="h6" fontWeight={600}>
              Rishabh Singh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              example@gmail.com
            </Typography>
            <Typography variant="caption" color="text.secondary">
              User ID: 1234567890
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Menu Items */}
          <List sx={{ width: "100%", padding: 0 }}>
            {menuItems.map((item, index) => {
              const isSelected = index === 2;
              return (
                <ListItemButton
                  key={item.text}
                  disableRipple
                  sx={getListItemStyles(item.color, isSelected)}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick(navigate);
                      handleClose();
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ mt: 2, mb: 2 }} />

          {/* Sign Out Button */}
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            sx={{
              width: "100%",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              borderRadius: 2,
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCenterPopup;
