import SearchIcon from "@icons/SearchIcon";
import { InputAdornment, TextField } from "@mui/material";

const SearchBox = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search your course here...."
      size="small"
      sx={{
        minWidth: { xs: "230px", sm: "200px", md: "200px", lg: "516px" },
        // background: "#fff",
        "& .MuiOutlinedInput-root": {
          background: "#fff",
          borderRadius: "12px",

          padding: "10px",
          "& fieldset": {
            border: "1px solid rgba(230, 230, 230, 1)", // your custom border
            borderRadius: "12px",
            overflow: "hidden",
          },
          "&:hover fieldset": {
            borderColor: "#bdbdbd", // optional: on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(106, 66, 171, 1)", // optional: on focus
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(158, 158, 158, 1)", // your custom placeholder color
            opacity: 1, // ensure full opacity
            fontSize: "14px",
          },
          "& .MuiInputAdornment-root svg": {
            color: "rgba(158, 158, 158, 1)", // your custom icon color
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
