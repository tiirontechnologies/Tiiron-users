import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  Link,
} from "@mui/material";

import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LaunchIcon from "@mui/icons-material/Launch";
import { FaDiscord } from "react-icons/fa";

import { useGetCommunityByUserIdQuery } from "../api/profileApiSlice";

interface Props {
  educatorId: number;
}

export default function EducatorCommunity({
  educatorId,
}: Props) {
  const { data, isLoading } =
    useGetCommunityByUserIdQuery(educatorId, {
      skip: !educatorId,
    });

  if (isLoading) {
    return (
      <Box py={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  const communities = [
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
  ].filter((item) => item.value);

  if (communities.length === 0) {
    return null;
  }

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

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Connect with this educator through their official community links.
            </Typography>
          </Box>

          <Stack spacing={2}>
            {communities.map((item) => (
              <Link
                key={item.label}
                href={item.value!}
                target="_blank"
                underline="none"
                color="inherit"
              >
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    transition: "0.2s",
                    cursor: "pointer",
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
              </Link>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}