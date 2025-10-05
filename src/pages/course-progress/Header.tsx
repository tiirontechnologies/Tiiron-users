import { Box, Typography, Chip, Avatar } from "@mui/material";
import { School, Star } from "@mui/icons-material";

const Header = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "289px",
        right: 0,
        height: "84px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        color: "#1a202c",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "0 32px",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        zIndex: 1000,
      }}
    >
      {/* Left Section - Course Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
            width: 48,
            height: 48,
          }}
        >
          <School sx={{ color: "white", fontSize: 24 }} />
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#1a202c",
              lineHeight: 1.2,
            }}
          >
            Advanced React Development
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Typography
              component="span"
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              📚 Chapter 1 - Lesson 1
            </Typography>
            <Chip
              label="In Progress"
              size="small"
              sx={{
                background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
                color: "white",
                fontWeight: 600,
                fontSize: "12px",
                height: "20px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Section - Score */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          padding: "12px 20px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "linear-gradient(135deg, #6A42AB 0%, #8B5CF6 100%)",
            padding: "8px 16px",
            borderRadius: "12px",
            color: "white",
          }}
        >
          <Star sx={{ fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: 1,
            }}
          >
            25/30
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#64748b",
              textAlign: "right",
            }}
          >
            Points Earned
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#94a3b8",
              textAlign: "right",
            }}
          >
            83% Complete
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
