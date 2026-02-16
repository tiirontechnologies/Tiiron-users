import { useState, useEffect, useRef } from "react";

const BAR_HEIGHT = 40;
const INITIAL_HEIGHT = 280;
const MAX_HEIGHT = 480;

export function useSplitPanelResize(initialHeight = INITIAL_HEIGHT) {
  const [testCasePanelHeight, setTestCasePanelHeight] = useState(initialHeight);
  const [isResizingSplit, setIsResizingSplit] = useState(false);
  const splitDragStart = useRef({ y: 0, height: initialHeight });

  const handleSplitResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingSplit(true);
    splitDragStart.current = { y: e.clientY, height: testCasePanelHeight };
  };

  useEffect(() => {
    if (!isResizingSplit) return;
    const onMouseMove = (e: MouseEvent) => {
      const dy = splitDragStart.current.y - e.clientY;
      const newHeight = Math.min(
        MAX_HEIGHT,
        Math.max(BAR_HEIGHT, splitDragStart.current.height + dy)
      );
      setTestCasePanelHeight(newHeight);
    };
    const onMouseUp = () => setIsResizingSplit(false);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizingSplit]);

  return {
    testCasePanelHeight,
    setTestCasePanelHeight,
    handleSplitResizeStart,
  };
}
