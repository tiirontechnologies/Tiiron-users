import FilterIcon from "@icons/FilterIcon";
import GridViewIcon from "@icons/GridViewIcon";
import ListViewIcon from "@icons/ListViewIcon";
import SortIcon from "@icons/SortIcon";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface PageToolbarLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageToolbarLayout: React.FC<PageToolbarLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "1px solid #999999",
          paddingBottom: "12px",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "24px", md: "40px" },
            fontWeight: 700,
            m: 0, // resets margin
            lineHeight: 1, // tightens vertical spacing
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <GridViewIcon />
          <ListViewIcon />
          <FilterIcon color="#4D4D4D" size={20} />
          <Divider orientation="vertical" flexItem />
          <Typography component="span" sx={{ color: "#C9C9C9" }}>
            Recent
          </Typography>
          <SortIcon />
        </Box>
      </Box>
      {/* <Divider /> */}
      <Box>{children}</Box>
    </Box>
  );
};

export default PageToolbarLayout;
