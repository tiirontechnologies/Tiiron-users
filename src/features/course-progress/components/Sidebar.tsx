import { ExpandLess, ExpandMore, PlayArrow, CheckCircle, RadioButtonUnchecked, KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "@components/ui/CustomProgress";

export default function Sidebar({ data, setQuery }: { data: any; setQuery: React.Dispatch<string>; }) {
  const { courseId } = useParams();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "289px",
        height: "100vh",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
        borderRight: "1px solid #e2e8f0",
        p: "24px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#cbd5e1",
          borderRadius: "2px",
        },
      }}
    >
      {/* Back Button */}
      <Button
        variant="text"
        component={Link}
        to={`/course-glossary/${courseId}`}
        startIcon={<KeyboardBackspace sx={{ color: "#64748b" }} />}
        sx={{
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          borderRadius: "12px",
          padding: "8px 16px",
          color: "#475569",
          fontWeight: 600,
          fontSize: "14px",
          textTransform: "none",
          border: "1px solid #e2e8f0",
          "&:hover": {
            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        Back to Course
      </Button>

      {/* Course Progress Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
              width: 40,
              height: 40,
            }}
          >
            📚
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#1a202c",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Learning Trail
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
              Track your progress
            </Typography>
          </Box>
        </Box>

        {/* Progress Card */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>
              Course Progress
            </Typography>
            <Chip
              label="25%"
              size="small"
              sx={{
                background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: "12px",
              }}
            />
          </Box>
          <ProgressBar progress={25} />
          <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500, mt: 1 }}>
            3 of 12 lessons completed
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, opacity: 0.3 }} />

      {/* Navigation List */}
      <NavList items={data?.data} setQuery={setQuery} />
    </Box>
  );
}

// ---------- Component ----------
const NavList: React.FC<any> = ({ items, setQuery }: { items: any; setQuery: React.Dispatch<string> }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <List component="nav" sx={{ mt: 1 }}>
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
              sx={{
                borderRadius: "12px",
                mb: 1,
                background: isOpen 
                  ? "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)" 
                  : "transparent",
                color: isOpen ? "white" : "#475569",
                "&:hover": {
                  background: isOpen 
                    ? "linear-gradient(135deg, #5A2A9B 0%, #4C1D95 100%)" 
                    : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                  transform: "translateX(4px)",
                  transition: "all 0.2s ease",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: isOpen 
                      ? "rgba(255,255,255,0.2)" 
                      : "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                    color: isOpen ? "white" : "white",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Box>
                <ListItemText
                  primary={item?.title}
                  sx={{ 
                    color: isOpen ? "white" : "#475569", 
                    fontSize: "15px",
                    fontWeight: isOpen ? 600 : 500,
                    "& .MuiListItemText-primary": {
                      fontSize: "15px",
                      fontWeight: isOpen ? 600 : 500,
                    }
                  }}
                />
                {hasChildren && (
                  <Box sx={{ ml: "auto" }}>
                    {isOpen ? (
                      <ExpandLess sx={{ color: isOpen ? "white" : "#64748b", fontSize: 20 }} />
                    ) : (
                      <ExpandMore sx={{ color: isOpen ? "white" : "#64748b", fontSize: 20 }} />
                    )}
                  </Box>
                )}
              </Box>
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ ml: 2 }}>
                  {item?.units &&
                    item?.units?.map((child: any, childIndex: number) => (
                      <ListItemButton
                        key={child.title}
                        sx={{ 
                          pl: 3,
                          borderRadius: "8px",
                          mb: 0.5,
                          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                          border: "1px solid #e2e8f0",
                          "&:hover": {
                            background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                            transform: "translateX(4px)",
                            transition: "all 0.2s ease",
                          },
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => {
                          setQuery(child.id)
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 24,
                              height: 24,
                              borderRadius: "6px",
                              background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                              color: "white",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {childIndex + 1}
                          </Box>
                          <ListItemText
                            sx={{ 
                              color: "#475569", 
                              fontSize: "14px",
                              fontWeight: 500,
                              "& .MuiListItemText-primary": {
                                fontSize: "14px",
                                fontWeight: 500,
                              }
                            }}
                            primary={child.title}
                          />
                          <Box sx={{ ml: "auto" }}>
                            <PlayArrow sx={{ color: "#6A42AB", fontSize: 16 }} />
                          </Box>
                        </Box>
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
