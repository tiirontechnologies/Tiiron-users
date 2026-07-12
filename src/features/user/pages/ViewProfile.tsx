import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  InputAdornment,
  Switch,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
  Slide,
  Chip,
  Skeleton,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  useGetProfilesQuery,
  useUpdateProfileMutation,
  UpdateProfileRequest,
  useUploadProfileImageMutation,
  useRemoveProfileImageMutation,
} from "../api/userApi";
import RichTextEditor from "@components/ui/RichTextEditor";
import CustomTextField from "@components/ui/textfields/CustomTextField";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LanguageIcon from "@mui/icons-material/Language";
import LinkIcon from "@mui/icons-material/Link";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

/* ============ Design tokens ============ */
const ACCENT = "#4F39F6";
const ACCENT_DARK = "#3E2DC4";
const ACCENT_SOFT = "#EEF0FF";
const MINT = "#3E2DC4";
const MINT_SOFT = "#E7F8F1";
const INK = "#0F172A";
const SUBTLE = "#64748B";
const BORDER = "#ECEEF6";
const BG = "#F7F8FC";

const RING_SIZE = 108;
const RING_STROKE = 5;

const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "it-IT", label: "Italian" },
  { value: "pt-PT", label: "Portuguese" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "ja-JP", label: "Japanese" },
  { value: "ko-KR", label: "Korean" },
];

const DEFAULT_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAADsCAMAAADU6xPUAAAAh1BMVEX///8UFBQAAAASEhL8/PwODg5BQUFISEgWFhYPDw8jIyPu7u42NjYdHR0tLS1SUlLv7+/V1dXHx8coKCjn5+eZmZn19fWOjo6+vr7f399ycnJZWVmqqqq3t7dNTU1eXl5/f3+hoaFkZGR9fX1tbW2Hh4fZ2dksLCyMjIywsLA8PDzOzs7ExMSwgRZmAAANnUlEQVR4nN1da3uiOhCGSaKgUq0i1lpta29b6///fScTUCEEK5AhnM7z7IfddiEvmcwtc/G8Lmg8/14+bgZ3oyhaTIb71fd8hv/MO3k5DW2noEiEDCkU6m/R2zZxvbI2lCxHIJiPxLI/khDb4/z/vFvJ0wBAIWIsgxYw+ReA4db12toQP25SXBoJmN7Ln/Ke71l8f3z9eNw/byQ9798fX5av2/n9Z8y9+40INFws8H2AZb+lRnJ8O0RgpGBxmO6j0mYxtV2bpMe4+P3TM0AYqKPDTotOT1MohADmG2ExuFPSsL/I4keA8un5jWAx6+/Z4vi54319WAyG8v/2FpXnzb7fRX1UPry5XvwV+nyDJhwoCba9PFdyTT97KSwaYZKScDFzjcBI8kABMyjaWzdr5RqAiZYKU2NU0nwau4aQJyX51sPGvJfbrP6cLI6ovhvKiMJugdcfTYza88VkuNYF5cODayx5SjYmW6g2KB/2/dDEyiBIBu25LwUGqdvvGhlyX3KwwH4piWj/FPfgbKU7ZQsVCwHEfu4alIQ1tQcKcQUSGHrHDhHJP4/W2O+CDNDM4M4YkXuvlgRFkUJ49Bwer3kbw6+a5G59uILEvfGXsHmoLqAeluzH2V49kvCfVMfPHo9dHayjfUmREoNXZ7qYL+q78jeiCmHtBhaXDhURKEmwccJ/0qig4j9f2e+O4u9yq6g4UJI4ODlXXJpsG7rd8uGpex7k3no7JpPsSGLi6M7uiRAUY3DsHBCqyLFVa70ES6ri7omT8p+zSFpsIVhxlaS86J4+CPWVr1TW3oE3ErWNav4Oq2tInvdD41pdQAUMPjvGhFYgC2jPlQ/fHaPyvGmrC5DbUC07R3UHH6T6ClG9dw0qXhzvaYWgRLXrHFXsbalZUEw6BoV65Jsc1aJrVByNW2IOFHcdo0KiRzX4i6icWO3k0gJeHKAiCweeUb06QHVProW794Y9LyH1GhGVk2wZYg4UIxegvIGghMUcpaG9UbIgC5x4+B7RReMZFri5Hv6hPFjSwXdz10N5f5AmrTqhIeH1AXNiWSB9UIakHQkL7j2Qouo6wnSiMR0qxsDNnQhX6T5UqGDqLItkRWfgOktw52i2U5ErYSE5MJmIgAYUw9wER9kJ6ymZgQtL7ibvbD0AMjUsZeAg7h6S3KkITxWZ0cRg4mKvXsk9fBdxC1up0ZXkxBmmDjGdMsE7JfLbbonqp3NU6w72qvvQ2ZpaWPguCkfiP7lXnPxe2HcRjyFH5STnZ0CS9l1A1T0o6pQfR7dyW/LbAxdVqeSi3U1FIHUmk5t4zDvtwXJyrGjzbn0naUxIpNYF82HtpgZrRxhn98XBCSiqSrmMHDGgYkGiwBlGY5wEYzBYRygFVWmjC1QeYezW3ZWIpAadb24jV1ul6LN1VwsTMV9Ebk5VRkuKkyVFxdZtOT4FDzLnrc+y5hZ2DN20l5hwpqpy9AEQMmvmOwMYdR8GNND6Y2TpcoTJfdpseQ86d6gTkHzZkIWS+6KZ14O2HRklBxubJbfqrlcdSHdWRCETg77sk6JnO6hg6hpIgewUOTKsj+sRrWyg6l0bQTvBwdDJpWk1WSpbcpLsXU2xH1podebUqzIQn1hQWExMeiXYuRXR7qZKvZow3mSBAx2lZFXTj4W7BEzJ6hfxUdjaG4GhaxQlslCJ4KDs+Tdqz4Kho7z8q/TVSrZL9kXDone45q2kIPOF7/UQlffe6mSFMO8hKO7xQZvdclZB8RvNWuS3O8xf/43ixmKQMach6Ks0a9x2JYx61Ru7QM1RsWDcP1GRUQtUrL97NW5sCvYcVUNY/Ub1Fzlw5v9FVOPGPlavUTVOQ+s3qj/JgY3N256j+pMc+EdRNQMlbf2/iCqM+jl8CKk5B/YZVdwCVX858M+iagbKD0e95sC/iYo1KSFmvjj0Kn0kjTaMsybxLw0PFiYEqkFa659+hDoxkSqZZHfv41GjYDvLxqJIVNCDMT0pJdNzRsFDo5MFBzUJVX6gGPox24tjPuclT3FZ1xlRaY7nq/s1CAnLPQ9iS3OWKwCrO4+IpbWmGZBPCEQvdutDSoj8XJ3awfb8Hfcc8HbEfS7JEvNT8/lHfFgPVjoXKqNv3GnhWGRkGQms0Bz5dljIq/KD8Mvj1OgVFjqowM/TNh0yLnaXA646Gt18trQiA9WOK5Dy495h7m3WcZSFXwXTgO9vhKUUVX752X0lE5G71It7cZpzr7eieLzJyMjOY26fd2nXloDBl6sLrXUkTuejlNXyD5g+Ud0ASh9JlozO2i7TzJ3TeHGSCqZpQU+ojq/gQj1VKnM+hwhwQMDQRTecZHLJG2GGIog5XG/WpHKxNJFwyW6QXOgkCXeYT4Yx1UutR2kJiRmTMiH0vThnrqUT5V+6wJEjTAjML1dMDJPfk2GVKJQsK8ppm6Xht51PYnsDlFQ5djJ6fehvmYAxGIwNjhQf5B0ZTALq1t1a6YM3pJFTXiTKDJPDJdUU90ybW9AHAQvCRReJuNk65hvQPfmqmqmfL8j/JksLdyoSvOeaqSU9f9h3YzwlDzsoK6OKlFnuzTb5s6KMxkXVQpflbDwGsJmTj0VNvg/IVKXDUtEOBblsledCeVY2lep1UtIF6ivA9Mgpz9fsdQLCbDNUmNm4lmN05qyU+yq+fGxInExFPAy29kFlX2q8yoriTLCqixG5F0sjXvEsg0lVNyJe2eWOqY8xeSLBFX/AlUI/dmVOhtyaf9K3RAfj7drSJle6Bsn/Gy0T23y4fvxl3FB1OwDVX/PoyyUv5tValRsZ8LJdAc6/XtmL8GLB/R4q9OnlvZUp9mnX0DWkZcDVqK4l+iuNIOU8vLR3ULI1zJ/hBi8QhhUrVv+a4IDv67UFNwQGmBQcj2uvlaRX/5Ur9fT7+66xIEfvWHkXVzLWb7x6kLjeW/U/w1jzdviLQ3H+isGVkjCeVgjKo1Ed6/u+NdgRomJuITWSp8NtmPz0XqPy47xAWo0uT0alAVQjhOMD7JooMPwvs+VXrZrt6o6Tq8uCMfpsVsFBnesUyYcHpcDqYJO/O1tFdevQq1ptvOY8XCaE+a50W7ciQ8Doteal1/gFjObeVQr9srzgp5jhiZgIjGupW5aWCvpVDVyxUrn1L9gMVhNXoywue4XMY5qIHEf1X8dQcGQK7BonKs3/+X6LKDe9BTZlUIbqVPw1fRXbhlfKZwVWCUv9IDUjmr2BBSUWXAflw8kMB/AdgmbNnVAxX/UsJaqfZ2h4Y50uV1dH8Z3xuJTCm7NRi0o79CwfqlnwuAFoiihdrVZxnlRYQaX4YbOb1/RZ6nkwrNDvx5tMo6sktFuESsGmF2a27k6AHvO6fLoS3KeWoFjRI+YY3q1Yw77w/iRqXUQt312ey84n7Qt+MYD3L//MyvJ8fauONmqopZwv8DVHJWilTY9ec74CvyTZWLmhvJ1RWqo7Vf791oYvapvAy0FpvBfQ5rbywE5jsbQ/3xnXLLLQ8kCRLtw+DZ+L6RZuu0LPy3O1sOTK1lbp7kh2f118N3r6BVQv1lrnstz1/2xkbS6I5hFznI+gBRC1wnT5K42LZsqUu/R6steQl5U8Yr3pfrmHgI3OBIanT+09lmnNdyWraZ1y9JPH7U4HO1/Lrm0OZjBMliiEz5H/NF0JtkQVkkjn0Vnu8IpxJG3Vn5D/ccmst9rd89J81U7jq+ypShlpsKYnewjja6VQnpVeTmcKs6Dj2CYDSNIb+3OelxflYQaNC1dNdO5U9WO3CWU5lFmwBvEGu/qnFkikAYSSnmxJpWvHwrktpKelDGgXVXbxbrthaKmOoNDCOGQaqoPtyWCKx/nIds9a3c8PCwdXE4Kf1gcNqBPQvLyo8rHFVJ1Y08L5lCeDndj+9ajmLRnMORKLgiLW+tVpkRj7w1RVBMtG16siaQN2Xoqo8letnGI0k0Dvzf60Ey3etyhe97JcgyJO0bJZLOSTN/ZRqYTV09r1McTFqxM7bUq1F+CntGxa+KnvdvYL9UhLwVchmQ2GqOwPOyn21ywJuXw0nmR0gvQaEvuDaRgL7y5ZPTqPsTC6oNqQoFoX3ASLDz6HD3i5O8Sl2CW26lqdn/+DbE/x4LNSKhuv7KKHacbHSNum9s3lTSRGJwb8LsWYcoLfvvxFkibTE83Ap7P4LtnOucv+Mc3MR+k32rfDkC4J+IbmqkzdH0vRTzS/SKoOovHvpyGma2HwCE6yxGZoIf/4Ze3atpsfnXryxus2Fd3i3oxoLpjkE5rvdb7zMd52ZHq4JEgskbQBdjQDClnm8+5Mnm74pVwVqsHz8O4NKPSg2izUtbHxEjHtF52QjcPZexOqmXfq8FSE0JWBS8WAvth4X1SoBJp7/8wrV4EmEhtQvXnnjaimLjKUgs9mCSsGCUpAmhf74cCLqJ6NLFhVlx9CjFmOVFxy8GgerB4+uXKH/4AMSMUlE0JUDNZVTiGDfwmN7FVPvyNFtaxKeWGw/6Ybo8oWhKiCcDGpCAsz9oWBaCoOHFHulV95i42Zqq3SwK6/eOSRcbc7YpFH98mckUQVkbG3M2K+N/prmJC8BflYewckbXbXSyAg6V+5XgIBeUMQdSms/vfQTCzE4Ye3krZEVl+eeR+7aZl2w2s0qKbDpIruTPS1GBkoKlHdvfoP0jLXqG/uykkAAAAASUVORK5CYII=";

const inputSx = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: ACCENT,
    borderWidth: "1.5px",
  },
};

const fieldLabelSx = {
  color: INK,
  fontWeight: 600,
  fontSize: "13px",
  mb: 0.75,
};

const cardSx = {
  p: { xs: 2.25, md: 3 },
  borderRadius: "20px",
  border: `1px solid ${BORDER}`,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
  backgroundColor: "#fff",
  height: "100%",
};

/* ============ Role helper ============
   Adjust this to match however role/roleId actually comes back on profileData.
   Handles common shapes: data.roleId === 1 (admin id), data.role === "admin",
   or data.role?.name === "Admin". Update ADMIN_ROLE_ID if your admin id differs. */
const ADMIN_ROLE_ID = 1;
const getIsAdmin = (data: any) => {
  if (!data) return false;
  const roleId = data.roleId ?? data.role?.id;
  const roleName = (data.role?.name || data.role || "")
    .toString()
    .toLowerCase();
  return roleId === ADMIN_ROLE_ID || roleName === "admin";
};

/* ============ Small reusable bits ============ */

const SectionHeading = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <Box mb={2.25} display="flex" alignItems="flex-start" gap={1.2}>
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: "9px",
        backgroundColor: ACCENT_SOFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: "14.5px", md: "15.5px" },
          color: INK,
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: "12.5px", color: SUBTLE, mt: 0.3 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

const SocialInput = ({
  icon,
  label,
  prefix,
  name,
  register,
}: {
  icon: React.ReactNode;
  label: string;
  prefix: string;
  name: keyof UpdateProfileRequest;
  register: any;
}) => (
  <Box>
    <Typography sx={fieldLabelSx}>{label}</Typography>
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="username"
      {...register(name)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box display="flex" alignItems="center" gap={0.7}>
              {icon}
              <Typography sx={{ color: "#94A3B8", fontSize: "12.5px" }}>
                {prefix}
              </Typography>
            </Box>
          </InputAdornment>
        ),
        sx: inputSx,
      }}
    />
  </Box>
);

/* Read-only row for a social link — clickable when a value exists */
const SocialLinkRow = ({
  icon,
  label,
  href,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  href: string | null;
  value?: string;
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    gap={1.5}
    sx={{
      p: 1.5,
      borderRadius: "12px",
      border: `1px solid ${BORDER}`,
      backgroundColor: "#F9FAFC",
    }}
  >
    <Box display="flex" alignItems="center" gap={1.2} sx={{ minWidth: 0 }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "8px",
          backgroundColor: "#fff",
          border: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography fontSize="12.5px" fontWeight={700} color={INK}>
          {label}
        </Typography>
        <Typography fontSize="12px" color={SUBTLE} noWrap>
          {value ? value : "Not added"}
        </Typography>
      </Box>
    </Box>
    {href && (
      <IconButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{
          color: ACCENT,
          flexShrink: 0,
          "&:hover": { backgroundColor: ACCENT_SOFT },
        }}
      >
        <OpenInNewOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    )}
  </Box>
);

/* Read-only field row for Personal Info */
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <Box>
    <Typography
      sx={{ fontSize: "11.5px", color: SUBTLE, fontWeight: 600, mb: 0.4 }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: "14px", color: INK, fontWeight: 600 }}>
      {value || "—"}
    </Typography>
  </Box>
);

/* Completeness ring that wraps the avatar — the page's one signature element */
const CompletenessRing = ({
  value,
  children,
}: {
  value: number;
  children: React.ReactNode;
}) => {
  const radius = (RING_SIZE - RING_STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const ringColor = value === 100 ? MINT : ACCENT;

  return (
    <Box
      position="relative"
      width={RING_SIZE}
      height={RING_SIZE}
      flexShrink={0}
    >
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)",
        }}
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          stroke="#EEF0F5"
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease",
          }}
        />
      </svg>
      <Box
        sx={{
          position: "absolute",
          inset: RING_STROKE + 3,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const SettingRow = ({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) => (
  <Box
    sx={{
      p: 1.75,
      borderRadius: "14px",
      backgroundColor: "#F9FAFC",
      border: `1px solid ${BORDER}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={700} fontSize="13.5px" color={INK}>
        {title}
      </Typography>
      <Typography fontSize="12px" color={SUBTLE} mt={0.2}>
        {description}
      </Typography>
    </Box>
    <Switch defaultChecked={defaultChecked} />
  </Box>
);

/* ============ Skeleton loading state — mirrors the real layout ============ */
const ProfileSkeleton = () => (
  <Box display="flex" flexDirection="column" gap={{ xs: 2, md: 2.5 }}>
    <Paper elevation={0} sx={{ ...cardSx, height: "auto" }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2.5}
      >
        <Skeleton variant="circular" width={RING_SIZE} height={RING_SIZE} />
        <Box flex={1} width="100%">
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="60%" height={20} />
          <Box display="flex" gap={1} mt={1}>
            <Skeleton
              variant="rounded"
              width={90}
              height={24}
              sx={{ borderRadius: "8px" }}
            />
            <Skeleton
              variant="rounded"
              width={90}
              height={24}
              sx={{ borderRadius: "8px" }}
            />
          </Box>
        </Box>
        <Skeleton
          variant="rounded"
          width={130}
          height={36}
          sx={{ borderRadius: "10px" }}
        />
      </Box>
    </Paper>

    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1.6fr 1fr" }}
      gap={{ xs: 2, md: 2.5 }}
    >
      <Box display="flex" flexDirection="column" gap={2.5}>
        <Paper elevation={0} sx={cardSx}>
          <Skeleton variant="text" width="30%" height={26} />
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={2}
            mt={2}
          >
            <Skeleton
              variant="rounded"
              height={44}
              sx={{ borderRadius: "10px" }}
            />
            <Skeleton
              variant="rounded"
              height={44}
              sx={{ borderRadius: "10px" }}
            />
          </Box>
          <Skeleton
            variant="rounded"
            height={44}
            sx={{ borderRadius: "10px", mt: 2.5 }}
          />
        </Paper>
        <Paper elevation={0} sx={cardSx}>
          <Skeleton variant="text" width="30%" height={26} />
          <Skeleton
            variant="rounded"
            height={140}
            sx={{ borderRadius: "10px", mt: 2 }}
          />
        </Paper>
      </Box>
      <Box display="flex" flexDirection="column" gap={2.5}>
        <Paper elevation={0} sx={cardSx}>
          <Skeleton variant="text" width="50%" height={26} />
          <Stack gap={1.5} mt={2}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={40}
                sx={{ borderRadius: "10px" }}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>

    {/* Full-width Privacy skeleton */}
    <Paper elevation={0} sx={{ ...cardSx, height: "auto" }}>
      <Skeleton variant="text" width="30%" height={26} />
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={2.5}
        mt={2}
      >
        <Stack gap={1.5}>
          <Skeleton
            variant="rounded"
            height={60}
            sx={{ borderRadius: "14px" }}
          />
          <Skeleton
            variant="rounded"
            height={60}
            sx={{ borderRadius: "14px" }}
          />
        </Stack>
        <Stack gap={1.5}>
          <Skeleton
            variant="rounded"
            height={90}
            sx={{ borderRadius: "14px" }}
          />
          <Skeleton
            variant="rounded"
            height={90}
            sx={{ borderRadius: "14px" }}
          />
        </Stack>
      </Box>
    </Paper>
  </Box>
);

/* ============ Main component ============ */

const ViewProfile: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const [headlineCount, setHeadlineCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: profileData, isLoading, refetch } = useGetProfilesQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();
  const [removeImage] = useRemoveProfileImageMutation();

  const isAdmin = getIsAdmin(profileData?.data);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { isDirty: formIsDirty },
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      headline: "",
      biography: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
      language: "en-US",
    },
  });

  useEffect(() => {
    setIsDirty(formIsDirty);
  }, [formIsDirty]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
     setIsDirty(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadImage(formData).unwrap();
      setSnackbarMessage("Image uploaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Image upload failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleRemoveImage = async () => {
    try {
      await removeImage().unwrap();
      setProfileImage(DEFAULT_IMAGE);
      setImageFile(null);
      setSnackbarMessage("Image removed successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to remove image");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (profileData?.data) {
      const data = profileData.data;
      reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        headline: data.profile?.headline || "",
        biography: data.profile?.biography || "",
        website: data.profile?.website || "",
        facebook: data.profile?.facebook || "",
        instagram: data.profile?.instagram || "",
        linkedin: data.profile?.linkedin || "",
        twitter: data.profile?.twitter || "",
        youtube: data.profile?.youtube || "",
        language: data.profile?.language || "en-US",
      });
    }
  }, [profileData, reset]);

  const headlineValue = watch("headline");

  useEffect(() => {
    setHeadlineCount(headlineValue ? headlineValue.length : 0);
  }, [headlineValue]);

  useEffect(() => {
    const imageFromApi = profileData?.data?.profile?.picture;
    setProfileImage(
      imageFromApi && imageFromApi.trim() !== "" ? imageFromApi : DEFAULT_IMAGE,
    );
  }, [profileData]);

  const formValues = watch();

  // Profile completeness score — purely cosmetic, based on filled fields
  const completeness = useMemo(() => {
    const fields = [
      formValues.firstName,
      formValues.lastName,
      formValues.headline,
      formValues.biography,
      formValues.website || formValues.linkedin || formValues.twitter,
      profileImage && profileImage !== DEFAULT_IMAGE,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [formValues, profileImage]);

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data).unwrap();
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsEditing(false);
      refetch();
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to update profile");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // Build clickable href for each social platform from the stored username/value
  const buildHref = (value: string | undefined, domain: string) => {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${domain}/${value.replace(/^@/, "")}`;
  };
  const websiteHref = formValues.website
    ? /^https?:\/\//i.test(formValues.website)
      ? formValues.website
      : `https://${formValues.website}`
    : null;

  const PAGE_LAYOUT_SX = {
    width: "100%",
    maxWidth: "1240px",
    mx: "auto",
    px: { xs: 2, sm: 3, md: 6 },
    py: { xs: 2.5, md: 4 },
    pb: { xs: 12, md: 8 }, // room for sticky save bar
  };

  return (
    <Box sx={{ backgroundColor: BG, minHeight: "100vh" }}>
      <Box sx={PAGE_LAYOUT_SX}>
        <PageToolbarLayout title="Profile & Settings">
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display="flex"
                flexDirection="column"
                gap={{ xs: 2, md: 2.5 }}
              >
                {/* ===== HERO ===== */}
                <Paper elevation={0} sx={{ ...cardSx, height: "auto" }}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    gap={2.5}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2.25}
                      sx={{ minWidth: 0 }}
                    >
                      <Box position="relative" flexShrink={0}>
                        <CompletenessRing value={completeness}>
                          <Avatar
                            src={profileImage || DEFAULT_IMAGE}
                            sx={{ width: "100%", height: "100%" }}
                          />
                        </CompletenessRing>
                        {isEditing && (
                          <IconButton
                            component="label"
                            size="small"
                            sx={{
                              position: "absolute",
                              bottom: 2,
                              right: 2,
                              backgroundColor: ACCENT,
                              width: 28,
                              height: 28,
                              border: "2.5px solid #fff",
                              "&:hover": { backgroundColor: ACCENT_DARK },
                            }}
                          >
                            <CameraAltIcon
                              sx={{ fontSize: 13, color: "#fff" }}
                            />
                            <input
                              type="file"
                              hidden
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </IconButton>
                        )}
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.8}
                          flexWrap="wrap"
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "18px", md: "21px" },
                              fontWeight: 800,
                              color: INK,
                              lineHeight: 1.2,
                              wordBreak: "break-word",
                            }}
                          >
                            {formValues.firstName || "First Name"}{" "}
                            {formValues.lastName || ""}
                          </Typography>
                          <Tooltip title="Instructor account">
                            <VerifiedOutlinedIcon
                              sx={{ fontSize: 18, color: ACCENT }}
                            />
                          </Tooltip>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "13.5px",
                            color: SUBTLE,
                            mt: 0.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {formValues.headline ||
                            "Add a headline to introduce yourself"}
                        </Typography>
                        <Box display="flex" gap={1} mt={1.2} flexWrap="wrap">
                          <Chip
                            label={`${completeness}% complete`}
                            size="small"
                            sx={{
                              height: 23,
                              fontSize: "11px",
                              fontWeight: 700,
                              backgroundColor:
                                completeness === 100 ? MINT_SOFT : ACCENT_SOFT,
                              color: completeness === 100 ? MINT : ACCENT,
                            }}
                          />
                          <Chip
                            icon={
                              <PublicOutlinedIcon
                                sx={{ fontSize: "14px !important" }}
                              />
                            }
                            label="Public profile"
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 23,
                              fontSize: "11px",
                              fontWeight: 700,
                              color: SUBTLE,
                              borderColor: BORDER,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Edit / Cancel toggle — the form only opens once this is clicked */}
                    <Box sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
                      {isEditing ? (
                        <Button
                          onClick={handleCancelEdit}
                          size="small"
                          variant="outlined"
                          startIcon={<CloseIcon sx={{ fontSize: 15 }} />}
                          sx={{
                            textTransform: "none",
                            borderColor: "#5757564f",
                            color: SUBTLE,
                            fontWeight: 600,
                            borderRadius: "10px",
                            fontSize: "13px",
                            "&:hover": {
                              borderColor: "#0765d7",
                              backgroundColor: "#F9FAFC",
                              color: "#0765d7",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setIsEditing(true)}
                          size="small"
                          variant="contained"
                          startIcon={<EditOutlinedIcon sx={{ fontSize: 15 }} />}
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "10px",
                            fontSize: "13px",
                            backgroundColor: ACCENT,
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: ACCENT_DARK,
                              boxShadow: "none",
                            },
                          }}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {isEditing && (
                    <Typography
                      sx={{ fontSize: "11.5px", color: "#94A3B8", mt: 2 }}
                    >
                      PNG, JPG or WebP · Minimum 800×800px · Max file size 5MB
                    </Typography>
                  )}
                </Paper>

                {/* ===== MAIN GRID — Personal Info / Bio (left) + Social Links (right) ===== */}
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", md: "1.6fr 1fr" }}
                  gap={{ xs: 2, md: 2.5 }}
                  alignItems="start"
                >
                  {/* Left column */}
                  <Box display="flex" flexDirection="column" gap={2.5}>
                    <Paper elevation={0} sx={cardSx}>
                      <SectionHeading
                        icon={
                          <PersonOutlineIcon
                            sx={{ color: ACCENT, fontSize: 18 }}
                          />
                        }
                        title="Personal Information"
                        subtitle="Visible on your public instructor profile."
                      />

                      {isEditing ? (
                        <>
                          <Box
                            display="grid"
                            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                            gap={2}
                          >
                            <Controller
                              name="firstName"
                              control={control}
                              render={({ field }) => (
                                <CustomTextField
                                  {...field}
                                  labelText="First Name"
                                  placeholder="Enter your first name"
                                />
                              )}
                            />
                            <Controller
                              name="lastName"
                              control={control}
                              render={({ field }) => (
                                <CustomTextField
                                  {...field}
                                  labelText="Last Name"
                                  placeholder="Enter your last name"
                                />
                              )}
                            />
                          </Box>

                          <Box mt={2.5}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={0.75}
                            >
                              <Typography sx={fieldLabelSx}>
                                Headline
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    headlineCount > 60 ? "#EF4444" : "#94A3B8",
                                }}
                              >
                                {headlineCount}/60
                              </Typography>
                            </Box>
                            <Controller
                              name="headline"
                              control={control}
                              rules={{ maxLength: 60 }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  size="small"
                                  placeholder="e.g., Instructor at Tiiron"
                                  variant="outlined"
                                  error={headlineCount > 60}
                                  InputProps={{ sx: inputSx }}
                                />
                              )}
                            />
                          </Box>

                          <Box mt={2.5} maxWidth={{ xs: "100%", sm: "60%" }}>
                            <Typography sx={fieldLabelSx}>
                              <LanguageIcon
                                sx={{
                                  fontSize: 15,
                                  mb: "-2px",
                                  mr: 0.5,
                                  color: "#64748B",
                                }}
                              />
                              Language
                            </Typography>
                            <Controller
                              name="language"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  select
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  InputProps={{ sx: inputSx }}
                                >
                                  {languages.map((lang) => (
                                    <MenuItem
                                      key={lang.value}
                                      value={lang.value}
                                    >
                                      {lang.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              )}
                            />
                          </Box>
                        </>
                      ) : (
                        <Box
                          display="grid"
                          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                          gap={2.5}
                        >
                          <InfoRow
                            label="First Name"
                            value={formValues.firstName}
                          />
                          <InfoRow
                            label="Last Name"
                            value={formValues.lastName}
                          />
                          <InfoRow
                            label="Headline"
                            value={formValues.headline}
                          />
                          <InfoRow
                            label="Language"
                            value={
                              languages.find(
                                (l) => l.value === formValues.language,
                              )?.label || formValues.language
                            }
                          />
                        </Box>
                      )}
                    </Paper>

                    <Paper elevation={0} sx={cardSx}>
                      <SectionHeading
                        icon={
                          <NotesOutlinedIcon
                            sx={{ color: ACCENT, fontSize: 18 }}
                          />
                        }
                        title="Biography"
                        subtitle={
                          isEditing
                            ? "At least 50 words builds more trust — no links or coupon codes."
                            : undefined
                        }
                      />
                      {isEditing ? (
                        <Controller
                          name="biography"
                          control={control}
                          render={({ field }) => (
                            <Box
                              sx={{
                                "& .custom-quill .ql-container": {
                                  minHeight: "150px !important",
                                  borderRadius: "0 0 10px 10px",
                                },
                                "& .custom-quill .ql-toolbar": {
                                  borderRadius: "10px 10px 0 0",
                                },
                                "& .custom-quill .ql-editor": {
                                  minHeight: "130px !important",
                                  padding: "12px !important",
                                  fontSize: "14px !important",
                                },
                              }}
                            >
                              <RichTextEditor
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Tell learners about your credibility, experience, and passion."
                              />
                            </Box>
                          )}
                        />
                      ) : formValues.biography ? (
                        <Box
                          sx={{
                            fontSize: "14px",
                            color: INK,
                            lineHeight: 1.7,
                            "& p": { m: 0, mb: 1 },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: formValues.biography,
                          }}
                        />
                      ) : (
                        <Typography fontSize="13.5px" color={SUBTLE}>
                          No biography added yet.
                        </Typography>
                      )}
                    </Paper>
                  </Box>

                  {/* Right column */}
                  <Box display="flex" flexDirection="column" gap={2.5}>
                    <Paper elevation={0} sx={cardSx}>
                      <SectionHeading
                        icon={<LinkIcon sx={{ color: ACCENT, fontSize: 18 }} />}
                        title="Social Links"
                        subtitle="Help learners find you elsewhere."
                      />
                      {isEditing ? (
                        <Stack gap={2}>
                          <Controller
                            name="website"
                            control={control}
                            render={({ field }) => (
                              <CustomTextField
                                {...field}
                                labelText="Website"
                                placeholder="https://yourdomain.com"
                              />
                            )}
                          />
                          <SocialInput
                            icon={
                              <FacebookIcon
                                sx={{ fontSize: 16, color: "#1877F2" }}
                              />
                            }
                            label="Facebook"
                            prefix="facebook.com/"
                            name="facebook"
                            register={register}
                          />
                          <SocialInput
                            icon={
                              <InstagramIcon
                                sx={{ fontSize: 16, color: "#E1306C" }}
                              />
                            }
                            label="Instagram"
                            prefix="instagram.com/"
                            name="instagram"
                            register={register}
                          />
                          <SocialInput
                            icon={
                              <LinkedInIcon
                                sx={{ fontSize: 16, color: "#0A66C2" }}
                              />
                            }
                            label="LinkedIn"
                            prefix="linkedin.com/"
                            name="linkedin"
                            register={register}
                          />
                          <SocialInput
                            icon={
                              <XIcon sx={{ fontSize: 14, color: "#0F172A" }} />
                            }
                            label="X"
                            prefix="x.com/"
                            name="twitter"
                            register={register}
                          />
                          {/* YouTube field only shown for admins */}
                          {isAdmin && (
                            <SocialInput
                              icon={
                                <YouTubeIcon
                                  sx={{ fontSize: 16, color: "#FF0000" }}
                                />
                              }
                              label="YouTube"
                              prefix="youtube.com/"
                              name="youtube"
                              register={register}
                            />
                          )}
                        </Stack>
                      ) : (
                        <Stack gap={1.25}>
                          <SocialLinkRow
                            icon={
                              <LaunchOutlinedIcon
                                sx={{ fontSize: 15, color: SUBTLE }}
                              />
                            }
                            label="Website"
                            value={formValues.website}
                            href={websiteHref}
                          />
                          <SocialLinkRow
                            icon={
                              <FacebookIcon
                                sx={{ fontSize: 16, color: "#1877F2" }}
                              />
                            }
                            label="Facebook"
                            value={formValues.facebook}
                            href={buildHref(
                              formValues.facebook,
                              "facebook.com",
                            )}
                          />
                          <SocialLinkRow
                            icon={
                              <InstagramIcon
                                sx={{ fontSize: 16, color: "#E1306C" }}
                              />
                            }
                            label="Instagram"
                            value={formValues.instagram}
                            href={buildHref(
                              formValues.instagram,
                              "instagram.com",
                            )}
                          />
                          <SocialLinkRow
                            icon={
                              <LinkedInIcon
                                sx={{ fontSize: 16, color: "#0A66C2" }}
                              />
                            }
                            label="LinkedIn"
                            value={formValues.linkedin}
                            href={buildHref(
                              formValues.linkedin,
                              "linkedin.com",
                            )}
                          />
                          <SocialLinkRow
                            icon={
                              <XIcon sx={{ fontSize: 14, color: "#0F172A" }} />
                            }
                            label="X"
                            value={formValues.twitter}
                            href={buildHref(formValues.twitter, "x.com")}
                          />
                          {/* YouTube only shown for admins */}
                          {isAdmin && (
                            <SocialLinkRow
                              icon={
                                <YouTubeIcon
                                  sx={{ fontSize: 16, color: "#FF0000" }}
                                />
                              }
                              label="YouTube"
                              value={formValues.youtube}
                              href={buildHref(
                                formValues.youtube,
                                "youtube.com",
                              )}
                            />
                          )}
                        </Stack>
                      )}
                    </Paper>
                  </Box>
                </Box>

                {/* ===== PRIVACY & SETTINGS — full width, own row, responsive internal grid ===== */}
                <Paper
                  elevation={0}
                  sx={{ ...cardSx, height: "auto", width: "100%" }}
                >
                  <SectionHeading
                    icon={
                      <ShieldOutlinedIcon
                        sx={{ color: ACCENT, fontSize: 18 }}
                      />
                    }
                    title="Privacy & Settings"
                    subtitle="Control visibility and data."
                  />

                  <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                    gap={{ xs: 2.5, md: 3 }}
                    alignItems="start"
                  >
                    {/* Visibility toggles */}
                    <Stack gap={1.5}>
                      <SettingRow
                        title="Public Profile"
                        description="Anyone can see your profile and public posts."
                        defaultChecked
                      />
                      <SettingRow
                        title="Search Engine Indexing"
                        description="Let Google index your profile and courses."
                      />
                    </Stack>

                    {/* Data rights */}
                    <Box>
                      <Typography
                        fontWeight={800}
                        fontSize="13.5px"
                        mb={1.5}
                        color={INK}
                      >
                        Your Data Rights
                      </Typography>

                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          xs: "1fr",
                          sm: "1fr 1fr",
                          md: "1fr 1fr",
                        }}
                        gap={1.5}
                      >
                        <Box
                          sx={{
                            p: 1.75,
                            borderRadius: "14px",
                            backgroundColor: "#F9FAFC",
                            border: `1px solid ${BORDER}`,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={0.5}
                          >
                            <DownloadOutlinedIcon
                              sx={{ fontSize: 16, color: "#475569" }}
                            />
                            <Typography fontWeight={700} fontSize="13px">
                              Download Personal Data
                            </Typography>
                          </Box>
                          <Typography
                            fontSize="11.5px"
                            color={SUBTLE}
                            mb={1.25}
                          >
                            Get a copy of your data, including course content
                            and history.
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              textTransform: "none",
                              borderRadius: "8px",
                              fontWeight: 600,
                              fontSize: "12px",
                            }}
                          >
                            Request Export
                          </Button>
                        </Box>

                        <Box
                          sx={{
                            p: 1.75,
                            borderRadius: "14px",
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FCE4E4",
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            mb={0.5}
                          >
                            <WarningAmberOutlinedIcon
                              sx={{ fontSize: 16, color: "#DC2626" }}
                            />
                            <Typography
                              fontWeight={700}
                              fontSize="13px"
                              color="#DC2626"
                            >
                              Delete Account
                            </Typography>
                          </Box>
                          <Typography
                            fontSize="11.5px"
                            color="#7F1D1D"
                            mb={1.25}
                          >
                            Permanently remove your account and all associated
                            data.
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              backgroundColor: "#e6caca08 !important",
                              color: "#DC2626",
                              border: "1px solid #DC2626 !important",
                              textTransform: "none",
                              borderRadius: "8px",
                              fontWeight: 600,
                              fontSize: "12px",
                              px: 2,
                              py: 0.75,
                              boxShadow: "none",
                              transition: "all 0.25s ease",

                              "&:hover": {
                                backgroundColor: "#f22424 !important",
                                color: "#fdfdfd !important",
                                border: "1px solid #DC2626 !important",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Delete Permanently
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* ===== STICKY SAVE BAR (shows only while editing and form is dirty) ===== */}
              <Slide
                direction="up"
                in={isEditing && isDirty}
                mountOnEnter
                unmountOnExit
              >
                <Paper
                  elevation={0}
                  sx={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1200,
                    borderTop: `1px solid ${BORDER}`,
                    backgroundColor: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 -8px 24px rgba(15,23,42,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "1240px",
                      mx: "auto",
                      px: { xs: 2, sm: 4, md: 6 },
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <AutoAwesomeOutlinedIcon
                        sx={{ fontSize: 16, color: ACCENT }}
                      />
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: SUBTLE,
                          fontWeight: 600,
                        }}
                      >
                        You have unsaved changes
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1.2}>
                   <Button
  onClick={handleCancelEdit}
  startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
  variant="outlined"
  sx={{
    textTransform: "none",
    color: "#DC2626",
    border: "1.5px solid #DC2626",
    borderRadius: "12px",
    px: 2.5,
    py: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
    backgroundColor: "#fff",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 8px rgba(220,38,38,0.08)",
    "& .MuiButton-startIcon": {
      color: "#DC2626",
    },
    "&:hover": {
      backgroundColor: "#DC2626",
      color: "#fff",
      borderColor: "#DC2626",
      boxShadow: "0 6px 16px rgba(220,38,38,0.25)",
      transform: "translateY(-1px)",
      "& .MuiButton-startIcon": {
        color: "#fff",
      },
    },
  }}
>
  Discard
</Button>
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        startIcon={<SaveOutlinedIcon sx={{ fontSize: 16 }} />}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: "10px",
                          px: 3,
                          backgroundColor: ACCENT,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: ACCENT_DARK,
                            boxShadow: "none",
                          },
                        }}
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Slide>
            </form>
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </PageToolbarLayout>
      </Box>
    </Box>
  );
};

export default ViewProfile;
