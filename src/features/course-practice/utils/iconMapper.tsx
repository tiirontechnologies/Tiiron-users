import React from "react";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArticleIcon from "@mui/icons-material/Article";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BookIcon from "@mui/icons-material/Book";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";

// Map icon paths to Material UI icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  "@mui/icons-material/Quiz": QuizIcon,
  "@mui/icons-material/Assignment": AssignmentIcon,
  "@mui/icons-material/Article": ArticleIcon,
  "@mui/icons-material/VideoLibrary": VideoLibraryIcon,
  "@mui/icons-material/OndemandVideo": OndemandVideoIcon,
  "@mui/icons-material/Book": BookIcon,
  "@mui/icons-material/MenuBook": MenuBookIcon,
  "@mui/icons-material/Description": DescriptionIcon,
};

/**
 * Gets the icon component from an icon path string
 * @param iconPath - The icon path from API (e.g., "@mui/icons-material/Quiz")
 * @returns The Material UI icon component or null if not found
 */
export const getIconFromPath = (
  iconPath: string
): React.ComponentType<any> | null => {
  return iconMap[iconPath] || null;
};

/**
 * Renders an icon from an icon path string
 * @param iconPath - The icon path from API
 * @param props - Additional props to pass to the icon component
 * @returns JSX element with the icon or null
 */
export const renderIconFromPath = (
  iconPath: string,
  props?: any
): React.ReactElement | null => {
  const IconComponent = getIconFromPath(iconPath);
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
};
