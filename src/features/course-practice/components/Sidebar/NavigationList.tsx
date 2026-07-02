import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, PlayArrow, CheckCircle } from '@mui/icons-material';
import { Chapter } from '../../types';
import { COLORS, GRADIENTS, SHADOWS } from '../../constants';
import {handleUnit} from '../../slice/practiceSlice';
import {useDispatch} from 'react-redux';

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
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const dispatch= useDispatch();

  return (
    <List component="nav" sx={{ mt: 0.75, px: 0.5 }}>
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
                borderRadius: "10px",
                mb: 1,
                py: 1,
                px: 1.25,
                background: isOpen
                  ? "linear-gradient(135deg, rgba(79, 57, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)"
                  : COLORS.background.white,
                color: COLORS.text.primary,
                border: isOpen
                  ? `1.5px solid ${COLORS.primary}`
                  : `1px solid ${COLORS.border.light}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isOpen
                  ? "0 2px 8px rgba(79, 57, 246, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
                  : "0 1px 2px rgba(0, 0, 0, 0.04)",
                position: "relative",
                overflow: "hidden",
                "&::before": isOpen ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  background: GRADIENTS.primary,
                  borderRadius: "0 4px 4px 0",
                } : {},
                "&:hover": {
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(79, 57, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)"
                    : "linear-gradient(135deg, #FAFBFC 0%, #F5F7FA 100%)",
                  borderColor: isOpen ? COLORS.primary : COLORS.primaryLight,
                  boxShadow: isOpen
                    ? "0 4px 12px rgba(79, 57, 246, 0.16), 0 2px 4px rgba(0, 0, 0, 0.08)"
                    : "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, width: "100%", position: "relative", zIndex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "8px",
                    background: isOpen
                      ? GRADIENTS.primary
                      : "linear-gradient(135deg, rgba(79, 57, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
                    color: isOpen ? "white" : COLORS.primary,
                    fontSize: "13px",
                    fontWeight: 700,
                    boxShadow: isOpen
                      ? "0 2px 8px rgba(79, 57, 246, 0.3)"
                      : "0 1px 3px rgba(79, 57, 246, 0.15)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: isOpen ? "none" : `1px solid rgba(79, 57, 246, 0.2)`,
                  }}
                >
                  {index + 1}
                </Box>
                <ListItemText
                  primary={chapter?.title}
                  sx={{
                    color: isOpen ? COLORS.text.primary : COLORS.text.secondary,
                    fontSize: "14px",
                    fontWeight: isOpen ? 600 : 500,
                    letterSpacing: "-0.01em",
                    "& .MuiListItemText-primary": {
                      fontSize: "14px",
                      fontWeight: isOpen ? 600 : 500,
                      color: isOpen ? COLORS.text.primary : COLORS.text.secondary,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.4,
                    }
                  }}
                />
                {hasChildren && (
                  <Box
                    sx={{
                      ml: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      borderRadius: "6px",
                      background: isOpen
                        ? "rgba(79, 57, 246, 0.1)"
                        : "transparent",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {isOpen ? (
                      <ExpandLess sx={{ color: COLORS.primary, fontSize: 20, fontWeight: 600 }} />
                    ) : (
                      <ExpandMore sx={{ color: COLORS.text.muted, fontSize: 20 }} />
                    )}
                  </Box>
                )}
              </Box>
            </ListItemButton>

            {hasChildren && (
              <Collapse
                in={isOpen}
                timeout={300}
                unmountOnExit
                sx={{
                  "& .MuiCollapse-wrapper": {
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }
                }}
              >
                <List
                  component="div"
                  disablePadding
                  sx={{
                    ml: 2,
                    mt: 0.5,
                    mb: 1,
                    pl: 1,
                    borderLeft: `2px solid ${COLORS.border.light}`,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: "-2px",
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      background: isOpen ? GRADIENTS.primary : "transparent",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }
                  }}
                >
                  {chapter?.units &&
                    chapter?.units?.map((unit, unitIndex) => {
                      const isSelected = selectedUnitId === unit.id.toString();
                      // Show as completed if this is the selected unit and practiceData indicates completion
                      const isCompleted = isSelected && practiceData?.isCompleted === true;

                      return (
                        <ListItemButton
                          key={unit.title}
                          sx={{
                            pl: 1.75,
                            py: 0.9,
                            borderRadius: "9px",
                            mb: 0.6,
                            background: isSelected
                              ? "linear-gradient(135deg, rgba(79, 57, 246, 0.1) 0%, rgba(139, 92, 246, 0.06) 100%)"
                              : isCompleted
                                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)"
                                : COLORS.background.white,
                            border: isSelected
                              ? `1.5px solid ${COLORS.primary}`
                              : isCompleted
                                ? `1.5px solid rgba(16, 185, 129, 0.4)`
                                : `1px solid ${COLORS.border.light}`,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: isSelected || isCompleted
                              ? "0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)"
                              : "0 1px 2px rgba(0, 0, 0, 0.03)",
                            position: "relative",
                            "&::before": isSelected ? {
                              content: '""',
                              position: "absolute",
                              left: "-13px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: COLORS.primary,
                              boxShadow: `0 0 0 3px ${COLORS.background.white}, 0 0 0 5px ${COLORS.primary}20`,
                            } : {},
                            "&:hover": {
                              background: isSelected
                                ? "linear-gradient(135deg, rgba(79, 57, 246, 0.14) 0%, rgba(139, 92, 246, 0.1) 100%)"
                                : isCompleted
                                  ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)"
                                  : "linear-gradient(135deg, #FAFBFC 0%, #F5F7FA 100%)",
                              borderColor: isSelected
                                ? COLORS.primary
                                : isCompleted
                                  ? "rgba(16, 185, 129, 0.5)"
                                  : COLORS.primaryLight,
                              boxShadow: isSelected || isCompleted
                                ? "0 4px 10px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)"
                                : "0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
                              transform: "translateX(2px) translateY(-1px)",
                            },
                            "&:active": {
                              transform: "translateX(2px) translateY(0px)",
                            },
                          }}
                          onClick={() =>{
                            dispatch(handleUnit(unit.id))
                            onUnitSelect(unit.id)
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, width: "100%" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 24,
                                height: 24,
                                borderRadius: "7px",
                                background: isSelected
                                  ? GRADIENTS.primary
                                  : isCompleted
                                    ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                                    : "linear-gradient(135deg, rgba(79, 57, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
                                color: isSelected || isCompleted ? "white" : COLORS.primary,
                                fontSize: "11px",
                                fontWeight: 700,
                                boxShadow: isSelected || isCompleted
                                  ? "0 2px 6px rgba(79, 57, 246, 0.25)"
                                  : "0 1px 2px rgba(79, 57, 246, 0.15)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                border: isSelected || isCompleted ? "none" : `1px solid rgba(79, 57, 246, 0.2)`,
                              }}
                            >
                              {unitIndex + 1}
                            </Box>
                            <ListItemText
                              sx={{
                                color: isSelected
                                  ? COLORS.text.primary
                                  : isCompleted
                                    ? "#065F46"
                                    : COLORS.text.secondary,
                                fontSize: "13px",
                                fontWeight: isSelected || isCompleted ? 600 : 500,
                                letterSpacing: "-0.01em",
                                "& .MuiListItemText-primary": {
                                  fontSize: "13px",
                                  fontWeight: isSelected || isCompleted ? 600 : 500,
                                  color: isSelected
                                    ? COLORS.text.primary
                                    : isCompleted
                                      ? "#065F46"
                                      : COLORS.text.secondary,
                                  letterSpacing: "-0.01em",
                                  lineHeight: 1.4,
                                }
                              }}
                              primary={unit.title}
                            />
                            <Box
                              sx={{
                                ml: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 24,
                                height: 24,
                                borderRadius: "6px",
                                background: isCompleted
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : isSelected
                                    ? "rgba(79, 57, 246, 0.1)"
                                    : "transparent",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            >
                              {isCompleted ? (
                                <CheckCircle sx={{ color: "#10B981", fontSize: 18, fontWeight: 600 }} />
                              ) : (
                                <PlayArrow sx={{ color: isSelected ? COLORS.primary : COLORS.text.muted, fontSize: 16 }} />
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
