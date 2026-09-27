// import { useCallback, useMemo, useState } from "react";
// import { Box, Skeleton, Typography } from "@mui/material";
// import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
// import { useGetMyEnrollmentsQuery } from "../api/userApi";
// import ProfileCertificateCard, { type ProfileEnrollment } from "./ProfileCertificateCard";

// interface CourseCertificateStatus {
//   available: boolean;
//   earned: boolean;
// }

// /** Profile-only coordinator: each course card owns its certificate/progress APIs. */
// export default function CertificatesTab() {
//   const { data, isLoading, isError } = useGetMyEnrollmentsQuery({ page: 1, limit: 100 });
//   const [courseStatus, setCourseStatus] = useState<Record<number, CourseCertificateStatus>>({});
//   const enrollments: ProfileEnrollment[] = data?.data ?? [];
//   const visibleEnrollments = useMemo(() => {
//     return enrollments.filter((enrollment) => {
//       const status = courseStatus[enrollment.courseId];
//       return status ? status.available : true;
//     });
//   }, [courseStatus, enrollments]);
//   const earnedCount = Object.values(courseStatus).filter((status) => status.earned).length;
//   const onStatusResolved = useCallback((courseId: number, available: boolean, earned: boolean) => {
//     setCourseStatus((current) => {
//       const nextStatus = { available, earned };
//       const previousStatus = current[courseId];
//       if (previousStatus?.available === available && previousStatus?.earned === earned) {
//         return current;
//       }
//       return { ...current, [courseId]: nextStatus };
//     });
//   }, []);

//   if (isLoading) return <Box sx={{ p: 3, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}><Skeleton variant="rounded" height={190} /><Skeleton variant="rounded" height={190} /></Box>;
//   if (isError) return <Box sx={{ p: 5, textAlign: "center" }}><Typography fontWeight={700}>Certificates could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
//   if (!visibleEnrollments.length) return <Box sx={{ p: 6, textAlign: "center" }}><WorkspacePremiumRoundedIcon sx={{ fontSize: 40, color: "#818CF8" }} /><Typography fontWeight={800} mt={1}>No certificates available yet</Typography><Typography variant="body2" color="text.secondary" mt={.5}>Complete a course with a certificate template to see it here.</Typography></Box>;

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3 } }}>
//       <Box sx={{ mb: 2.5, p: 2, borderRadius: 2.5, bgcolor: "#F5F3FF", display: "flex", alignItems: "center", gap: 1.5 }}>
//         <WorkspacePremiumRoundedIcon sx={{ color: "#6D28D9" }} />
//         <Box><Typography fontWeight={800}>{earnedCount} certificate{earnedCount === 1 ? "" : "s"} earned</Typography><Typography variant="caption" color="text.secondary">Your certificate status and results are shown below.</Typography></Box>
//       </Box>
//       <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
//         {visibleEnrollments.map((enrollment) => <ProfileCertificateCard key={enrollment.id} enrollment={enrollment} onStatusResolved={onStatusResolved} />)}
//       </Box>
//     </Box>
//   );
// }


import { useCallback, useMemo, useRef, useState } from "react";
import { Box, Button, IconButton, Skeleton, Typography } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useGetMyEnrollmentsQuery } from "../api/userApi";
import ProfileCertificateCard, { type ProfileEnrollment } from "./ProfileCertificateCard";

interface CourseCertificateStatus {
  available: boolean;
  earned: boolean;
}

const VISIBLE_COUNT = 2;

/** Profile-only coordinator: each course card owns its certificate/progress APIs. */
export default function CertificatesTab() {
  const { data, isLoading, isError } = useGetMyEnrollmentsQuery({ page: 1, limit: 100 });
  const [courseStatus, setCourseStatus] = useState<Record<number, CourseCertificateStatus>>({});
  const [showAll, setShowAll] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const enrollments: ProfileEnrollment[] = data?.data ?? [];
  const visibleEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const status = courseStatus[enrollment.courseId];
      return status ? status.available : true;
    });
  }, [courseStatus, enrollments]);
  const earnedCount = Object.values(courseStatus).filter((status) => status.earned).length;
  const onStatusResolved = useCallback((courseId: number, available: boolean, earned: boolean) => {
    setCourseStatus((current) => {
      const nextStatus = { available, earned };
      const previousStatus = current[courseId];
      if (previousStatus?.available === available && previousStatus?.earned === earned) {
        return current;
      }
      return { ...current, [courseId]: nextStatus };
    });
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    const node = sliderRef.current;
    if (!node) return;
    const cardWidth = node.firstElementChild instanceof HTMLElement ? node.firstElementChild.offsetWidth + 16 : 280;
    node.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  if (isLoading) return <Box sx={{ p: 3, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}><Skeleton variant="rounded" height={190} /><Skeleton variant="rounded" height={190} /></Box>;
  if (isError) return <Box sx={{ p: 5, textAlign: "center" }}><Typography fontWeight={700}>Certificates could not be loaded</Typography><Typography variant="body2" color="text.secondary" mt={1}>Please refresh and try again.</Typography></Box>;
  if (!visibleEnrollments.length) return <Box sx={{ p: 6, textAlign: "center" }}><WorkspacePremiumRoundedIcon sx={{ fontSize: 40, color: "#818CF8" }} /><Typography fontWeight={800} mt={1}>No certificates available yet</Typography><Typography variant="body2" color="text.secondary" mt={.5}>Complete a course with a certificate template to see it here.</Typography></Box>;

  const hasMore = visibleEnrollments.length > VISIBLE_COUNT;
  const gridEnrollments = visibleEnrollments.slice(0, VISIBLE_COUNT);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 2.5, p: 2, borderRadius: 2.5, bgcolor: "#F5F3FF", display: "flex", alignItems: "center", gap: 1.5 }}>
        <WorkspacePremiumRoundedIcon sx={{ color: "#6D28D9" }} />
        <Box><Typography fontWeight={800}>{earnedCount} certificate{earnedCount === 1 ? "" : "s"} earned</Typography><Typography variant="caption" color="text.secondary">Your certificate status and results are shown below.</Typography></Box>
      </Box>

      {!showAll ? (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
            {gridEnrollments.map((enrollment) => (
              <ProfileCertificateCard key={enrollment.id} enrollment={enrollment} onStatusResolved={onStatusResolved} />
            ))}
          </Box>
          {hasMore && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Button
                variant="outlined"
                onClick={() => setShowAll(true)}
                sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
              >
                View More
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={800} color="text.secondary">
              All Certificates
            </Typography>
            <Button
              size="small"
              onClick={() => setShowAll(false)}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Show less
            </Button>
          </Box>

          <IconButton
            onClick={() => scrollSlider("left")}
            sx={{
              position: "absolute",
              left: -4,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "#fff",
              boxShadow: 2,
              display: { xs: "none", sm: "flex" },
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <Box
            ref={sliderRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 1,
              px: { xs: 0, sm: 4 },
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#CBD5E1", borderRadius: 3 },
            }}
          >
            {visibleEnrollments.map((enrollment) => (
              <Box
                key={enrollment.id}
                sx={{
                  flex: "0 0 auto",
                  width: { xs: "85%", sm: 320 },
                  scrollSnapAlign: "start",
                }}
              >
                <ProfileCertificateCard enrollment={enrollment} onStatusResolved={onStatusResolved} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => scrollSlider("right")}
            sx={{
              position: "absolute",
              right: -4,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "#fff",
              boxShadow: 2,
              display: { xs: "none", sm: "flex" },
              "&:hover": { bgcolor: "#F8FAFC" },
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}