import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="60vh">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" fontWeight={600}>
          404
        </Typography>
        <Typography color="text.secondary">Page not found</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Go Home</Button>
      </Stack>
    </Box>
  );
}


