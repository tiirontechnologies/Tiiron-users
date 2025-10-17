import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { ReusablePopper } from "@components/ui/popper/ReusablePopper";
import SingleRadioButton from "@components/ui/SingleRadioButton";
import IOSSwitch from "@components/ui/popper/IOSSwitch";

const PublishButton = () => {
  const [_subscribe, setSubscribe] = useState("yes");
  return (
    <ReusablePopper
      content={
        <Box
          sx={{
            width: "fit-content",
            maxWidth: "547px",
          }}
        >
          <Typography
            sx={{ color: "#000000", fontSize: "20px", fontWeight: 600 }}
          >
            Publish Setting
          </Typography>
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid #CCCCCC",
              mt: "24px",
              p: "16px",
            }}
          >
            <SingleRadioButton
              label="Hub Users"
              value="yes"
              name="Publish Setting"
              checked={true}
              onChange={(e) => setSubscribe(e.target.value)}
              formStyles={{
                height: "28px",
              }}
            />
            <Box sx={{ ml: 4 }}>
              <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                All hub users can access this course and enroll themselves
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  mt: "16px",
                }}
              >
                <Typography sx={{ fontWeight: "500", color: "#333333" }}>
                  Needs Admin Approval{" "}
                </Typography>

                <IOSSwitch checked={false} onChange={() => {}} size="small" />
              </Box>
            </Box>
            <Box sx={{ mt: "32px" }}>
              <SingleRadioButton
                label="Added Learners Only"
                value="yes"
                name="Publish Setting"
                checked={true}
                onChange={(e) => setSubscribe(e.target.value)}
                formStyles={{
                  height: "28px",
                }}
              />
              <Typography sx={{ fontSize: "14px", color: "#666666", ml: 4 }}>
                All hub users can access this course and enroll themselves
              </Typography>
            </Box>
          </Box>
          <Button sx={{ mt: "24px" }}>Publish</Button>
        </Box>
      }
      trigger={
        <Button
          endIcon={<KeyboardArrowDownRoundedIcon />}
          sx={{
            padding: "12px 32px",
            height: "48px",
          }}
        >
          Publish
        </Button>
      }
    />
  );
};

export default PublishButton;
