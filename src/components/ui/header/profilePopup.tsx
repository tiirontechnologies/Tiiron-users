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
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import ProfileIcon from "@icons/ProfileIcon";
import NotificationIcon from "@icons/NotificationIcon";

const menuItems = [
  { text: "My Profile", icon: <ProfileIcon />, color: "#54B86F" },
  {
    text: "Notification Settings",
    icon: <NotificationIcon />,
    color: "#E2B93B",
  },
  // we dont have have hub icon in svg
  { text: "My Hub", icon: <HubOutlinedIcon />, color: "#7887E8" },
];

const ProfileCenterPopup = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getListItemStyles = (color, isSelected) => ({
    "&.MuiListItemButton-root": {
      borderRadius: 2,
      padding: "10px 16px",
      marginBottom: 1,
      "&:hover": {
        backgroundColor: `${color}1A`,
        "& .MuiListItemText-primary": {
          fontWeight: 600,
        },
        "& .MuiListItemIcon-root > div": {
          bgcolor: `${color}33`,
        },
      },
      ...(isSelected && {
        backgroundColor: `${color}1A`,
        "& .MuiListItemText-primary": {
          fontWeight: 600,
        },
      }),
    },
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      "& > div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 2,
        marginRight: 2,
        bgcolor: isSelected ? `${color}33` : "transparent",
        color: color,
      },
    },
  });

  return (
    <>
      <Avatar
        src=""
        onClick={handleOpen}
        sx={{ cursor: "pointer", width: 40, height: 40 }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
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
            boxShadow: 24,
            p: 3,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              pt: 2,
              pb: 3,
            }}
          >
            <Avatar src="" sx={{ width: 72, height: 72, mb: 1.5 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Nipun Kalra
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Example@gmail.com
            </Typography>
            <Typography variant="caption" color="text.secondary">
              User Id : 1234567890
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation List Items */}
          <List sx={{ width: "100%", padding: 0 }}>
            {menuItems.map((item, index) => {
              // hover is hardcoded on 3rd item :P
              const isSelected = index === 2;
              return (
                <ListItemButton
                  key={item.text}
                  disableRipple
                  sx={getListItemStyles(item.color, isSelected)}
                >
                  <ListItemIcon>
                    <Box>{item.icon}</Box>
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            sx={{
              width: "40%",
              mx: "auto",
              textTransform: "none",
              fontWeight: 600,
              borderColor: "error.main",
              color: "text.primary",
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
