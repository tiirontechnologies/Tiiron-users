import FilterIcon from "@icons/FilterIcon";
import { Button } from "@mui/material";

const FilterButton = () => {
  return (
    <Button
      sx={{
        minWidth: "0", // Prevents default Button text padding
        width: 56,
        height: 56,
        backgroundColor: "#fff",
        border: "1px solid #fff",
        borderRadius: "12px",
        padding: "14px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "rgba(106, 66, 171, 1)",
        },
      }}
    >
      {/* <FilterAltOutlinedIcon sx={{ color: "rgba(153, 153, 153, 1)" }} /> */}
      <FilterIcon />
    </Button>
  );
};

export default FilterButton;
