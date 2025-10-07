import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: "10px" }}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
// Styled Tab with conditional styles for active/inactive state
const StyledTab = styled(Tab)<{ selectedtab: boolean }>(
  ({ selectedtab, theme }) => ({
    textTransform: "none",
    fontWeight: selectedtab ? "600" : "600",
    color: selectedtab ? theme.palette.text.primary : "#9499A1",
  })
);

// Reusable Tabs component
interface CustomTabsProps {
  tabs: string[];
  panels: React.ReactNode[];
}

export function CustomTabs({ tabs, panels }: CustomTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            background: "#fff",
            borderRadius: "16px",
            width: "fit-content",
            p: "20px",
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "24px",
            },
          }}
        >
          {tabs.map((label, index) => (
            <StyledTab
              key={index}
              label={label}
              selectedtab={value === index}
              id={`custom-tab-${index}`}
              aria-controls={`custom-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {panels.map((content, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
