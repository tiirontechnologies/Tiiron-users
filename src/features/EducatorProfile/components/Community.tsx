import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LaunchIcon from "@mui/icons-material/Launch";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { FaDiscord } from "react-icons/fa";

import { useGetCommunityByUserIdQuery } from "../api/profileApiSlice";

interface Props {
  educatorId: number;
}

export default function EducatorCommunity({ educatorId }: Props) {
  const { data, isLoading } = useGetCommunityByUserIdQuery(educatorId, {
    skip: !educatorId,
  });

  if (isLoading) {
    return (
      <Box py={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const communities = data
    ? [
        {
          label: "Telegram",
          value: data.telegram,
          icon: <TelegramIcon sx={{ color: "#229ED9" }} />,
          color: "#229ED9",
        },
        {
          label: "WhatsApp",
          value: data.whatsapp,
          icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
          color: "#25D366",
        },
        {
          label: "Discord",
          value: data.discord,
          icon: <FaDiscord color="#5865F2" size={22} />,
          color: "#5865F2",
        },
      ].filter((item) => item.value)
    : [];

  const handleRedirect = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Join Community
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Connect with this educator through their official community links.
            </Typography>
          </Box>

          {communities.length === 0 ? (
            <Box
              sx={{
                py: 5,
                px: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12), rgba(251,191,36,0.12))",
                border: "1px solid rgba(99,102,241,0.18)",
              }}
            >
              <Box
                sx={{
                  width: 82,
                  height: 82,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #4f46e5 0%, #8b5cf6 50%, #f59e0b 100%)",
                  boxShadow: "0 14px 32px rgba(99,102,241,0.28)",
                  mb: 2,
                }}
              >
                <Groups2RoundedIcon sx={{ fontSize: 38, color: "#fff" }} />
              </Box>

              <Chip
                icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
                label="Coming Soon"
                sx={{
                  mb: 1.5,
                  fontWeight: 700,
                  bgcolor: "rgba(79,70,229,0.12)",
                  color: "#4f46e5",
                  border: "1px solid rgba(79,70,229,0.22)",
                }}
              />

              <Typography variant="h6" fontWeight={800} gutterBottom>
                Community is on the way
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 420, lineHeight: 1.7 }}
              >
                This educator community space is being prepared. We will share updates and links here soon.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {communities.map((item) => (
                <Box
                  key={item.label}
                  onClick={() => handleRedirect(item.value!)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      borderColor: item.color,
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    {item.icon}

                    <Box flex={1}>
                      <Typography fontWeight={600}>
                        {item.label}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      >
                        {item.value}
                      </Typography>
                    </Box>

                    <LaunchIcon fontSize="small" />
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

// checked