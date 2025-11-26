import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, PlayArrow, CheckCircle } from '@mui/icons-material';
import { Chapter } from '../../types';
import { COLORS, GRADIENTS } from '../../constants';

interface NavigationListProps {
  chapters: any;
  onUnitSelect: (unitId: string) => void;
  selectedUnitId?: string;
  practiceData?: {
    isCompleted: boolean;
    score: number;
  } | null;
}

const NavigationList: React.FC<NavigationListProps> = ({ 
  chapters, 
  onUnitSelect, 
  selectedUnitId,
  practiceData 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  console.log("NavigationList",chapters,onUnitSelect);
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <List component="nav" sx={{ mt: 1 }}>
      {chapters?.map((chapter, index) => {
        const hasChildren = chapter?.units && chapter?.units?.length > 0;
        const isOpen = openIndex === index;

        return (
          <React.Fragment key={chapter?.id}>
            <ListItemButton
              onClick={() => {
                if (hasChildren) {
                  handleToggle(index);
                } else {
                  chapter?.onClick?.();
                }
              }}
              sx={{
                borderRadius: "12px",
                mb: 1,
                background: isOpen 
                  ? GRADIENTS.primary 
                  : "transparent",
                color: isOpen ? "white" : COLORS.text.secondary,
                "&:hover": {
                  background: isOpen 
                    ? GRADIENTS.primaryHover 
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
                      : GRADIENTS.primary,
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Box>
                <ListItemText
                  primary={chapter?.title}
                  sx={{ 
                    color: isOpen ? "white" : COLORS.text.secondary, 
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
                      <ExpandLess sx={{ color: isOpen ? "white" : COLORS.text.muted, fontSize: 20 }} />
                    ) : (
                      <ExpandMore sx={{ color: isOpen ? "white" : COLORS.text.muted, fontSize: 20 }} />
                    )}
                  </Box>
                )}
              </Box>
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ ml: 2 }}>
                  {chapter?.units &&
                    chapter?.units?.map((unit, unitIndex) => {
                      const isSelected = selectedUnitId === unit.id.toString();
                      // Show as completed if this is the selected unit and practiceData indicates completion
                      const isCompleted = isSelected && practiceData?.isCompleted === true;
                      
                      return (
                        <ListItemButton
                          key={unit.title}
                          sx={{ 
                            pl: 3,
                            borderRadius: "8px",
                            mb: 0.5,
                            background: isCompleted 
                              ? "linear-gradient(135deg, #ECFDF8 0%, #D1FAE5 100%)"
                              : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                            border: isCompleted 
                              ? "2px solid #10B981" 
                              : "1px solid #e2e8f0",
                            "&:hover": {
                              background: isCompleted
                                ? "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)"
                                : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
                              transform: "translateX(4px)",
                              transition: "all 0.2s ease",
                            },
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => onUnitSelect(unit.id)}
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
                                background: isCompleted ? "#10B981" : GRADIENTS.primary,
                                color: "white",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {unitIndex + 1}
                            </Box>
                            <ListItemText
                              sx={{ 
                                color: isCompleted ? "#065F46" : COLORS.text.secondary, 
                                fontSize: "14px",
                                fontWeight: isCompleted ? 600 : 500,
                                "& .MuiListItemText-primary": {
                                  fontSize: "14px",
                                  fontWeight: isCompleted ? 600 : 500,
                                }
                              }}
                              primary={unit.title}
                            />
                            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
                              {isCompleted ? (
                                <CheckCircle sx={{ color: "#10B981", fontSize: 18 }} />
                              ) : (
                                <PlayArrow sx={{ color: COLORS.primary, fontSize: 16 }} />
                              )}
                            </Box>
                          </Box>
                        </ListItemButton>
                      );
                    })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default NavigationList;
