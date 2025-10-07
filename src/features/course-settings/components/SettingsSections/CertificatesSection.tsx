import { Box, Button } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";

export function CertificatesSection() {
  return (
    <SettingsTab
      iconBgColor="#FEF3FF"
      icon={<SettingsIcon color="#B84BC0" />}
      title="Certificates"
      subTitle="Reward your learners with custom course completion certificates."
    >
      <Box pl="54px">
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            bgcolor: "#6A42AB",
            py: "10px",
            px: "20px",
            mt: "32px",
          }}
        >
          Create Certificate
        </Button>
      </Box>
    </SettingsTab>
  );
}
