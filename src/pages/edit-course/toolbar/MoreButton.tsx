import { ReusablePopper } from "@components/popper/ReusablePopper";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import DeleteIcon from "@icons/DeleteIcon";
import DocumentCopyIcon from "@icons/DocumentCopyIcon";
import DocumentText from "@icons/DocumentText";
import NotificationIcon from "@icons/NotificationIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
const MoreButton = () => {
  type ClockItem = {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color?: string;
  };
  const items: ClockItem[] = [
    { id: 1, title: "Notification Settings", icon: <NotificationIcon /> },
    { id: 2, title: "Clone Course", icon: <DocumentCopyIcon /> },
    { id: 3, title: "Audit Log", icon: <DocumentText /> },
    { id: 4, title: "About", icon: <InfoCircleIcon color="#4d4d4d" /> },
    {
      id: 5,
      title: "Delete Course",
      icon: <DeleteIcon />,
      color: "#C54644",
    },
  ];
  const handleItemClick = (item: ClockItem) => {
    console.log("Clicked:", item.title);
  };
  return (
    <ReusablePopper
      trigger={
        <Button
          variant="outlined"
          sx={{
            width: "84px", // ✅ fixed width
            height: "48px", // ✅ match select/button height
            padding: "12px 0px", // center the icon vertically
            color: "white",
            border: "1px solid #6A42AB",
            borderRadius: "8px",
            minWidth: "unset", // removes MUI's default min width
            backgroundColor: "transparent",
            "&:hover": {
              border: "1px solid #6A42AB",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              border: "1px solid #6A42AB",
              boxShadow: "none",
            },
          }}
        >
          <MoreHorizIcon sx={{ color: "#6A42AB" }} />
        </Button>
      }
      content={
        <List
          sx={{
            width: "100%",
            p: 0,
            // display: "flex",
            // flexDirection: "column",
            // gap: "16px",
          }}
        >
          {items.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              sx={{
                cursor: "pointer",
                p: "12px",
                // px: 0,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: 2,
                },
              }}
            >
              <ListItemIcon
                sx={{ minWidth: 32, color: item.color, mr: "16px" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: "16px", color: item.color ?? "#4D4D4D" }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      }
      backgroundColor="#fff"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
export default MoreButton;
