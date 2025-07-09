import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProgressBar from "@components/CustomProgress";
const navItems = [
  {
    label: "Course 1",
    children: [
      {
        label: "Lesson 1",
        onClick: () => alert("Clicked Lesson 1"),
      },
      {
        label: "Lesson 2",
        onClick: () => alert("Clicked Lesson 2"),
      },
    ],
  },
  {
    label: "Course 2",
    children: [
      {
        label: "Lesson 1",
        onClick: () => alert("Clicked Lesson 1"),
      },
      {
        label: "Lesson 2",
        onClick: () => alert("Clicked Lesson 2"),
      },
    ],
  },
  {
    label: "Course 3",
    children: [
      {
        label: "Lesson 1",
        onClick: () => alert("Clicked Lesson 1"),
      },
      {
        label: "Lesson 2",
        onClick: () => alert("Clicked Lesson 2"),
      },
    ],
  },
];
const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "289px",
        height: "100vh",
        bgcolor: "#ffffff",
        boxShadow: 1,
        borderRadius: "16px",
        p: "24px",
      }}
    >
      <Button
        variant="text"
        component={Link}
        to="/"
        startIcon={<KeyboardBackspaceIcon sx={{ color: "#000000" }} />}
        sx={{
          bgcolor: "#D9D9D9",
          borderRadius: "32px",
          padding: "4px 12px",
          color: "#000000",
        }}
      >
        Back
      </Button>
      <Typography
        sx={{
          fontSize: "26px",
          color: "#000000",
          fontWeight: 700,
          mt: "48px",
        }}
      >
        Trail
      </Typography>
      <ProgressBar progress={25} />
      <Typography sx={{ fontSize: "14px", color: "#000000", fontWeight: 400 }}>
        25% completed
      </Typography>
      <NavList items={navItems} />
    </Box>
  );
};

export default Sidebar;

// collaps item icon
interface NavItem {
  label: string;
  children?: NavItem[]; // For collapsible items
  onClick?: () => void;
}

interface NavListProps {
  items: NavItem[];
}

// ---------- Component ----------
const NavList: React.FC<NavListProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <List component="nav" sx={{ mt: "48px" }}>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openIndex === index;

        return (
          <React.Fragment key={item.label}>
            <ListItemButton
              onClick={() => {
                if (hasChildren) {
                  handleToggle(index);
                } else {
                  item.onClick?.();
                }
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{ color: "#1C1C1C", fontSize: "16px" }}
              />
              {hasChildren &&
                (isOpen ? (
                  <ExpandLess sx={{ color: "#1C1C1C" }} />
                ) : (
                  <ExpandMore sx={{ color: "#1C1C1C" }} />
                ))}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children &&
                    item.children.map((child) => (
                      <ListItemButton
                        key={child.label}
                        sx={{ pl: 4 }}
                        onClick={child.onClick}
                      >
                        <ListItemText
                          sx={{ color: "#1C1C1C", fontSize: "16px" }}
                          primary={child.label}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};
