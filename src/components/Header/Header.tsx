import { Box, Button } from "@mui/material";
import SearchBox from "./SearchBox";
import FilterButton from "./FilterButton";

const Header = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "24px", // move here so MUI handles box-sizing properly
        boxSizing: "border-box", // crucial to prevent overflow
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <SearchBox />
        <FilterButton />
      </Box>
      <Box>
        <Button
          sx={{
            background: "rgba(112, 45, 255, 1)",
            color: "#fff",
            padding: "12px 48px",
            borderRadius: "12px",
          }}
        >
          Upgrade
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
