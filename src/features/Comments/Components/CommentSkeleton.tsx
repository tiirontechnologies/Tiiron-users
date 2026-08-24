import React from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { commentTheme } from "../theme";

const SkeletonRow: React.FC = () => (
  <Stack direction="row" spacing={1.5} sx={{ py: 2.5 }}>
    <Skeleton variant="circular" width={40} height={40} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width="30%" height={20} />
      <Skeleton variant="text" width="90%" height={18} sx={{ mt: 0.5 }} />
      <Skeleton variant="text" width="60%" height={18} />
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Skeleton variant="rounded" width={50} height={20} />
        <Skeleton variant="rounded" width={50} height={20} />
      </Stack>
    </Box>
  </Stack>
);

const CommentSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => (
  <Box
    sx={{
      bgcolor: commentTheme.colors.card,
      borderRadius: commentTheme.radius.card,
      border: `1px solid ${commentTheme.colors.border}`,
      p: { xs: 2, sm: 3 },
    }}
  >
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </Box>
);

export default CommentSkeleton;
