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

const Sidebar = ({ data, setQuery }: { data: any; setQuery: React.Dispatch<string> }) => {
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
      <NavList items={data?.data} setQuery={setQuery} />
    </Box>
  );
};

export default Sidebar;


// ---------- Component ----------
const NavList: React.FC<any> = ({ items, setQuery }: { items: any; setQuery: React.Dispatch<string> }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <List component="nav" sx={{ mt: "48px" }}>
      {items?.chapters?.map((item: any, index: number) => {
        const hasChildren = item?.units && item?.units?.length > 0;
        const isOpen = openIndex === index;

        return (
          <React.Fragment key={item?.id}>
            <ListItemButton
              onClick={() => {
                if (hasChildren) {
                  handleToggle(index);
                } else {
                  item?.onClick?.();
                }
              }}
            >
              <ListItemText
                primary={item?.title}
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
                  {item?.units &&
                    item?.units?.map((child: any) => (
                      <ListItemButton
                        key={child.title}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          setQuery(child.id)
                        }}
                      >
                        <ListItemText
                          sx={{ color: "#1C1C1C", fontSize: "16px" }}
                          primary={child.title}
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
