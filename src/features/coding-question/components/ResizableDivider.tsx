import React from "react";
import { Box } from "@mui/material";

interface ResizableDividerProps {
  onResizeStart: (e: React.MouseEvent) => void;
}

export const ResizableDivider: React.FC<ResizableDividerProps> = ({ onResizeStart }) => {
  return (
    <Box
      onMouseDown={onResizeStart}
      sx={{
        flexShrink: 0,
        height: 8,
        cursor: "ns-resize",
        backgroundColor: "#27272a",
        borderTop: "1px solid #3f3f46",
        borderBottom: "1px solid #3f3f46",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": { backgroundColor: "#3f3f46" },
        "&::after": {
          content: '""',
          width: 40,
          height: 4,
          borderRadius: 2,
          backgroundColor: "#52525b",
        },
      }}
    />
  );
};
