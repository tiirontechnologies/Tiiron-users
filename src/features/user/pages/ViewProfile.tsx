import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useGetProfileQuery, useUpdateProfileMutation, UpdateProfileRequest, useUploadProfileImageMutation ,useRemoveProfileImageMutation} from "../api/userApi";
import RichTextEditor from "@components/ui/RichTextEditor";
import CustomTextField from "@components/ui/textfields/CustomTextField";
import PageToolbarLayout from "@components/ui/PageToolbarLayout";
import { Switch, Divider } from "@mui/material";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

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

const ViewProfile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [headlineCount, setHeadlineCount] = useState(0);

  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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
  // profile tab states 
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  // upload handler for profile 
  
 const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setImageFile(file);

  // preview
  const imageUrl = URL.createObjectURL(file);
  setProfileImage(imageUrl);
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
  // upload api call 
  const [uploadImage] = useUploadProfileImageMutation();
  const [removeImage] = useRemoveProfileImageMutation();

const handleRemoveImage = async () => {
  try {
    await removeImage().unwrap(); 

    // UI update
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
  if (profileData?.user) {
    const data = profileData.user;

    reset({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      headline: data.headline || "",
      biography: data.biography || "",
      website: data.website || "",
      facebook: data.facebook || "",
      instagram: data.instagram || "",
      linkedin: data.linkedin || "",
      twitter: data.twitter || "",
      youtube: data.youtube || "",
      language: data.language || "en-US",
    });
  }
}, [profileData, reset]);
  const headlineValue = watch("headline");
  const DEFAULT_IMAGE =
    "data:image/png;base64,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";
    
  useEffect(() => {
    if (headlineValue) {
      setHeadlineCount(headlineValue.length);
    } else {
      setHeadlineCount(0);
    }
  }, [headlineValue]);

  useEffect(() => {
    const imageFromApi = profileData?.user?.picture;

    if (imageFromApi && imageFromApi.trim() !== "") {
      setProfileImage(imageFromApi);
    } else {
      setProfileImage(DEFAULT_IMAGE); 
    }
  }, [profileData]);


  const formValues = watch();

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data).unwrap();
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      refetch();
    } catch (error: any) {
      setSnackbarMessage(error?.data?.message || "Failed to update profile");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const PAGE_LAYOUT_SX = {
    width: "100%",
    maxWidth: "1440px",
    mx: "auto",
    px: { xs: 3, sm: 5, md: 10, lg: 15 },
    py: { xs: 3, md: 4 },
  };

  if (isLoading) {
    return (
      <Box sx={PAGE_LAYOUT_SX}>
        <PageToolbarLayout title="Profile & settings">
          <Typography>Loading...</Typography>
        </PageToolbarLayout>
      </Box>
    );
  }

  return (
    <Box sx={PAGE_LAYOUT_SX}>
      <PageToolbarLayout title="Profile & settings">

        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #E6E6E6",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                minHeight: 60,
                padding: "12px 24px",
                color: "#64748b",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#4F39F6",
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#4F39F6",
                height: 3,
              },
            }}
          >
            <Tab label="Tiiron Profile" />
            <Tab label="Profile Picture" />
            <Tab label="Privacy Settings" />
          </Tabs>
        </Paper>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 3,
              }}
            >
              {/* Left Column */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #E6E6E6",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: "#1a202c" }}
                  >
                    Personal Information
                  </Typography>

                  {/* First Name */}
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="First Name"
                        placeholder="Enter your first name"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Last Name */}
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="Last Name"
                        placeholder="Enter your last name"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Headline */}
                  <Box mb={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#0F172A", fontWeight: 500 }}
                      >
                        Headline
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: headlineCount > 60 ? "#ef4444" : "#64748b",
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
                          InputProps={{
                            sx: {
                              py: "10px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4F39F6",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  {/* Biography */}
                  <Box mb={3}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 1 }}
                    >
                      Biography
                    </Typography>
                    <Controller
                      name="biography"
                      control={control}
                      render={({ field }) => (
                        <Box
                          py={0.5}
                          sx={{
                            "& .custom-quill .ql-container": {
                              minHeight: "120px !important",
                            },
                            "& .custom-quill .ql-editor": {
                              minHeight: "100px !important",
                              padding: "12px !important",
                              fontSize: "14px !important",
                            },
                            "& .custom-quill .ql-editor.ql-blank::before": {
                              fontSize: "14px !important",
                            },
                          }}
                        >
                          <RichTextEditor
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted."
                          />
                        </Box>
                      )}
                    />
                  </Box>

                  {/* Language */}
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Box mb={2}>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                        >
                          Language
                        </Typography>
                        <TextField
                          {...field}
                          select
                          fullWidth
                          size="small"
                          variant="outlined"
                          InputProps={{
                            sx: {
                              py: "10px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E2E8F0",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4F39F6",
                              },
                            },
                          }}
                        >
                          {languages.map((lang) => (
                            <MenuItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    )}
                  />
                </Paper>
              </Box>

              {/* Right Column */}
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid #E6E6E6",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 3, color: "#1a202c" }}
                  >
                    Social Links
                  </Typography>

                  {/* Website */}
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        labelText="Website"
                        placeholder="URL"
                        inputSx={{ mb: 2 }}
                      />
                    )}
                  />

                  {/* Facebook */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      Facebook
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("facebook")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              facebook.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Instagram */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      Instagram
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("instagram")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              instagram.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* LinkedIn */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      LinkedIn
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Public profile URL"
                      {...control.register("linkedin")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              linkedin.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* X (Twitter) */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      X
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("twitter")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              x.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* YouTube */}
                  <Box mb={2}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#0F172A", fontWeight: 500, mb: 0.5 }}
                    >
                      YouTube
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Username"
                      {...control.register("youtube")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ color: "#64748b" }}>
                              youtube.com/
                            </Typography>
                          </InputAdornment>
                        ),
                        sx: {
                          py: "10px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E2E8F0",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#4F39F6",
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>

                {/* Save Button */}
                <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isUpdating}
                    sx={{
                      backgroundColor: "#4F39F6",
                      color: "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "8px",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#3E2DC4",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                </Box>
              </Box>
            </Box>


          </TabPanel>

          {/* profile code  */}
          <TabPanel value={tabValue} index={1}>
            <Box display="flex" gap={3} alignItems="flex-start">

              {/* ================= LEFT SIDE ================= */}
              <Box flex={1}>

                {/* 🔹 PROFILE CARD */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    mb: 3,
                  }}
                >
                  <Typography fontWeight={600} mb={2}>
                    Profile Picture
                  </Typography>

                  <Box display="flex" gap={3}>
                    {/* IMAGE */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <img
                        src={profileImage || DEFAULT_IMAGE}
                        alt="profile"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>

                    {/* TEXT */}
                    <Box>
                      <Typography fontWeight={600} mb={1}>
                        Image Requirements
                      </Typography>

                      <Typography variant="body2" color="#6B7280">
                        • Minimum size: 800 x 800px
                      </Typography>
                      <Typography variant="body2" color="#6B7280">
                        • Format: PNG, JPG, or WebP
                      </Typography>
                      <Typography variant="body2" color="#6B7280" mb={2}>
                        • Max file size: 5MB
                      </Typography>

                      <Box display="flex" gap={2}>
                        <Button
                          variant="contained"
                          component="label"
                          disableElevation
    //                 onClick={handleUploadImage}
    // disabled={!imageFile} 
                          sx={{
                            textTransform: "none",
                            color: "#fff",
                            borderRadius: "8px",
                            px: 3,
                          }}
                        >
                          Upload  Photo
                          <input type="file" hidden onChange={handleImageChange} />
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={handleRemoveImage}
                          sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            color: "#6B7280",
                            borderColor: "#E5E7EB",
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                {/* 🔹 LIVE PREVIEW CARD */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography fontWeight={600}>Live Preview</Typography>
                    <Typography fontSize="12px" color="#9CA3AF">
                      PUBLIC VIEW
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    {/* IMAGE */}
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          profileImage 
                        }
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>

                    {/* TEXT */}
                    <Box>
                      <Typography fontWeight={600}>
                        {formValues.firstName || "First Name"}{" "}
                        {formValues.lastName || ""}
                      </Typography>

                      <Typography fontSize="13px" color="#6B7280" mb={1}>
                        {formValues.headline || "Your headline will appear here"}
                      </Typography>

                      <Typography fontSize="12px" color="#9CA3AF">
                        {formValues.biography
                          ? formValues.biography.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                          : "Your bio will appear here"}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

              </Box>

              {/* ================= RIGHT SIDE ================= */}
              <Box width={280} display="flex" flexDirection="column" gap={2}>

                {/* 🔹 PRO TIP */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FFF7ED",
                  }}
                >
                  <Typography fontWeight={600} mb={1}>
                    💡 Pro Tip
                  </Typography>
                  <Typography fontSize="13px" color="#6B7280">
                    User with high-quality professional headshots receive up to{" "}
                    <span style={{ color: "#F97316", fontWeight: 600 }}>
                      40% more engagement
                    </span>
                    .
                  </Typography>
                </Box>

                {/* 🔹 CONTACT SUPPORT */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <Typography fontWeight={600} mb={1}>
                    Need help?
                  </Typography>

                  <Typography fontSize="13px" color="#6B7280" mb={2}>
                    If you're having trouble uploading your photo, our support team is here to assist.
                  </Typography>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: "none",
                      borderColor: "#F97316",
                      color: "#F97316",
                      "&:hover": {
                        borderColor: "#EA580C",
                        backgroundColor: "#FFF7ED",
                      },
                    }}
                  >
                    Contact Support
                  </Button>
                </Box>

              </Box>

            </Box>
          </TabPanel>

          {/* privacy page  */}
          <TabPanel value={tabValue} index={2}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
                maxWidth: "900px",
                mx: "auto",
              }}
            >
              {/* HEADER */}
              <Box px={4} py={3} borderBottom="1px solid #E5E7EB">
                <Typography fontSize="18px" fontWeight={600}>
                  Privacy Settings
                </Typography>
              </Box>

              {/* SECTION 1 */}
              <Box px={4} py={3}>
                <Typography fontWeight={600} mb={2}>
                  Profile Visibility
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: "8px",
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={500}>Public Profile</Typography>
                    <Typography fontSize="12px" color="#6B7280">
                      Allow anyone to see your creator profile, portfolio, and public posts.
                    </Typography>
                  </Box>

                  <Switch defaultChecked />
                </Box>
              </Box>

              {/* SECTION 2 */}
              <Box px={4} py={3}>
                <Typography fontWeight={600} mb={2}>
                  Search & Discovery
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: "8px",
                    backgroundColor: "#F9FAFB",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={500}>Search Engine Indexing</Typography>
                    <Typography fontSize="12px" color="#6B7280">
                      Let search engines like Google index your profile and courses.
                    </Typography>
                  </Box>

                  <Switch />
                </Box>
              </Box>

              {/* SECTION 3 */}
              <Box px={4} py={3}>
                <Typography fontWeight={600} mb={2}>
                  Your Data Rights
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
                  gap={2}
                >
                  {/* DOWNLOAD DATA */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      backgroundColor: "#F9FAFB",
                    }}
                  >
                    <Typography fontWeight={500} mb={0.5}>
                      Download Personal Data
                    </Typography>
                    <Typography fontSize="12px" color="#6B7280" mb={2}>
                      Request a copy of your data, including course content and history.
                    </Typography>

                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: "none" }}
                    >
                      Request Export
                    </Button>
                  </Box>

                  {/* DELETE ACCOUNT */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      backgroundColor: "#f5e6e6",
                      border: "1px solid #f0e2e2",
                    }}
                  >
                    <Typography fontWeight={500} mb={0.5} color="#DC2626">
                      Delete Account
                    </Typography>
                    <Typography fontSize="12px" color="#7F1D1D" mb={2}>
                      Permanently remove your account and all associated data.
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#DC2626 !important",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#f90606 !important",
                        },
                      }}
                    >
                      Delete Permanently
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* FOOTER */}
              <Box
                px={4}
                py={2}
                display="flex"
                justifyContent="flex-end"
                gap={2}
                borderTop="1px solid #E5E7EB"
              >
                {/* <Button sx={{ textTransform: "none" }}>Discard Changes</Button> */}
                <Button
                  variant="text"
                  disableRipple
                  sx={{
                    textTransform: "none",
                    color: "#57595b", // grey text
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#000001",
                    },
                  }}
                >
                  Discard Changes
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#F97316",
                    textTransform: "none",
                    px: 3,
                    "&:hover": { backgroundColor: "#EA580C" },
                  }}
                >
                  Save Preferences
                </Button>
              </Box>
            </Paper>
          </TabPanel>
        </form>

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
  );
};

export default ViewProfile;
