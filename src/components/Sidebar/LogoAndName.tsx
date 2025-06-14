import { Box, IconButton, Typography } from "@mui/material";
import Logo from "@images/Logo.png";
import BackArrowIcon from "@icons/BackArrowIcon";

const LogoAndName = ({
  toggleMenu,
  open,
}: {
  toggleMenu: () => void;
  open: Boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        flexWrap: "wrap",
        columnGap: open ? 0 : 2, // Add gap when closed
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box>
          <img
            width="34px"
            // src="https://tse4.mm.bing.net/th?id=OIP.TnYFKDEPAjSaLeYiD4Np3QHaHa&pid=Api&P=0&h=180"
            src={Logo}
            alt="logo"
          />
        </Box>
        {open ? <Typography>Logo</Typography> : null}
      </Box>
      <IconButton
        onClick={toggleMenu}
        sx={{
          transform: open ? "rotate(0deg)" : "rotate(180deg)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <BackArrowIcon />
      </IconButton>
    </Box>
  );
};

export default LogoAndName;
