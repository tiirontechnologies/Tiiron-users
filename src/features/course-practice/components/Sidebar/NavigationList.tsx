import React, { useEffect, useState } from 'react';
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
  useEffect(() => {
    if (!selectedUnitId || !Array.isArray(chapters)) return;
    const activeChapterIndex = chapters.findIndex((chapter: any) =>
      chapter?.units?.some((unit: any) => String(unit.id) === String(selectedUnitId)),
    );
    if (activeChapterIndex >= 0) setOpenIndex(activeChapterIndex);
  }, [chapters, selectedUnitId]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const dispatch= useDispatch();

  return (
    <List component="nav" sx={{ mt: 0.75, px: 0.5 }}>
      {chapters?.map((chapter, index) => {
        const hasChildren = chapter?.units && chapter?.units?.length > 0;
        const isOpen = openIndex === index;
        const hasSelectedUnit = chapter?.units?.some(
          (unit: any) => String(unit.id) === String(selectedUnitId),
        );
        const isActiveChapter = isOpen || hasSelectedUnit;

        return (
          <React.Fragment key={chapter?.id}>
            <ListItemButton
              selected={isActiveChapter}
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
                background: isActiveChapter
                  ? "linear-gradient(135deg, rgba(79, 57, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)"
                  : COLORS.background.white,
                color: COLORS.text.primary,
                border: isActiveChapter
                  ? `2px solid ${COLORS.primary}`
                  : `1px solid ${COLORS.border.light}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActiveChapter
                  ? "0 2px 8px rgba(79, 57, 246, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
                  : "0 1px 2px rgba(0, 0, 0, 0.04)",
                position: "relative",
                overflow: "hidden",
                "&.Mui-selected, &.Mui-selected:hover": {
                  background: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)",
                  borderColor: COLORS.primary,
                },
                "&::before": isActiveChapter ? {
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
                  background: isActiveChapter
                    ? "linear-gradient(135deg, rgba(79, 57, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)"
                    : "linear-gradient(135deg, #FAFBFC 0%, #F5F7FA 100%)",
                  borderColor: isActiveChapter ? COLORS.primary : COLORS.primaryLight,
                  boxShadow: isActiveChapter
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
                    background: isActiveChapter
                      ? GRADIENTS.primary
                      : "linear-gradient(135deg, rgba(79, 57, 246, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
                    color: isActiveChapter ? "white" : COLORS.primary,
                    fontSize: "13px",
                    fontWeight: 700,
                    boxShadow: isActiveChapter
                      ? "0 2px 8px rgba(79, 57, 246, 0.3)"
                      : "0 1px 3px rgba(79, 57, 246, 0.15)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: isActiveChapter ? "none" : `1px solid rgba(79, 57, 246, 0.2)`,
                  }}
                >
                  {index + 1}
                </Box>
                <ListItemText
                  primary={chapter?.title}
                  sx={{
                    minWidth: 0,
                    color: isActiveChapter ? COLORS.text.primary : COLORS.text.secondary,
                    fontSize: "14px",
                    fontWeight: isActiveChapter ? 600 : 500,
                    letterSpacing: "-0.01em",
                    "& .MuiListItemText-primary": {
                      fontSize: "14px",
                      fontWeight: isActiveChapter ? 600 : 500,
                      color: isActiveChapter ? COLORS.text.primary : COLORS.text.secondary,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.4,
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
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
                      background: isActiveChapter
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
                    position: "relative",
                  }}
                >
                  {chapter?.units &&
                    chapter?.units?.map((unit, unitIndex) => {
                      const isSelected = String(selectedUnitId) === String(unit.id);
                      // Show as completed if this is the selected unit and practiceData indicates completion
                      const isCompleted = isSelected && practiceData?.isCompleted === true;

                      return (
                        <ListItemButton
                          key={unit.id ?? unit.title}
                          selected={isSelected}
                          sx={{
                            pl: 1.75,
                            py: 0.9,
                            borderRadius: "9px",
                            mb: 0.6,
                            background: isSelected
                              ? "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)"
                              : isCompleted
                                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)"
                                : COLORS.background.white,
                            border: isSelected
                              ? `2px solid ${COLORS.primary}`
                              : isCompleted
                                ? `1.5px solid rgba(16, 185, 129, 0.4)`
                                : `1px solid ${COLORS.border.light}`,
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: isSelected
                              ? "0 2px 8px rgba(79, 57, 246, 0.18)"
                              : isCompleted
                                ? "0 2px 6px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)"
                              : "0 1px 2px rgba(0, 0, 0, 0.03)",
                            position: "relative",
                            "&.Mui-selected, &.Mui-selected:hover": {
                              background: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)",
                              borderColor: COLORS.primary,
                            },
                            "&:hover": {
                              background: isSelected
                                ? "linear-gradient(135deg, #e4ddff 0%, #ede9fe 100%)"
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
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, width: "100%", minWidth: 0 }}>
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
                                minWidth: 0,
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
                                  whiteSpace: "normal",
                                  overflowWrap: "anywhere",
                                  wordBreak: "break-word",
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
