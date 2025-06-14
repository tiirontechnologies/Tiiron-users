import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = ({ routes, open }: any) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const isRouteActive = (route: any): boolean => {
    if (route.path) return location.pathname === route.path;

    if (route.children) {
      return route.children.some(
        (child: any) => child.path && location.pathname.startsWith(child.path)
      );
    }

    return false;
  };

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <List>
      {routes.map((route: any) => {
        const hasChildren = Array.isArray(route.children);

        return (
          <Box key={route.label}>
            <ListItemButton
              onClick={() => {
                if (hasChildren) {
                  toggleExpand(route.label);
                } else if (route.path) {
                  navigate(route.path);
                }
              }}
              sx={{
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: !open ? "min-content" : "35px",
                  color: isRouteActive(route)
                    ? "rgba(106, 66, 171, 1)"
                    : "rgba(28, 28, 28, 1)",
                  // "&.MuiListItemIcon-root": {
                  //   minWidth: "35px",
                  // },
                }}
              >
                {route.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={route.label}
                  sx={{
                    color: isRouteActive(route)
                      ? "rgba(106, 66, 171, 1)"
                      : "rgba(28, 28, 28, 1)",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                />
              )}
              {hasChildren &&
                open &&
                (expanded[route.label] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={expanded[route.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {route.children.map((child: any) => (
                    <ListItemButton
                      key={child.label}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(child.path)}
                    >
                      <ListItemIcon sx={{ color: "rgba(51, 51, 51, 1)" }}>
                        {child.icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={child.label}
                          sx={{
                            color:
                              location.pathname === child.path
                                ? "rgba(106, 66, 171, 1)"
                                : "rgba(28, 28, 28, 1)",
                          }}
                        />
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        );
      })}
    </List>
  );
};

export default SidebarMenu