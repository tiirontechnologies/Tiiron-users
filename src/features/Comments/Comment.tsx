import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography, Button, Menu, MenuItem, Divider, Alert, CircularProgress } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { commentTheme } from "./theme";
import type { SortOption } from "./api/api";
import {
  useGetCourseCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "./api/api";
import CommentInput from "./components/CommentInput";
import CommentCard from "./components/CommentCard";
import CommentSkeleton from "./components/CommentSkeleton";
import EmptyComment from "./components/EmptyComment";

interface CommentProps {
  courseId: number;
  currentUserId: number;
  currentUserAvatar: string;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const PAGE_SIZE = 5;

const Comment: React.FC<CommentProps> = ({ courseId, currentUserId, currentUserAvatar }) => {
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const sortOpen = Boolean(sortAnchor);
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Newest";

  // Instagram-style: pehle sirf 5 top-level comments dikhte hain, scroll karte hi aur load hote hain
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data: comments,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCourseCommentsQuery(courseId, { skip: !courseId });

  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const sortedComments = useMemo(() => {
    if (!comments) return [];
    const list = [...comments];
    list.sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sort === "newest" ? -diff : diff;
    });
    return list;
  }, [comments, sort]);

  const totalCount = useMemo(() => {
    if (!comments) return 0;
    return comments.reduce((sum, c) => sum + 1 + c.replies.length, 0);
  }, [comments]);

  // Sort/data badalne pe list wapas 5 pe reset ho jaye
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [sort, courseId, comments?.length]);

  const visibleComments = sortedComments.slice(0, visibleCount);
  const hasMore = visibleCount < sortedComments.length;

  // Scroll karke sentinel div dikhte hi aur 5 comment load ho jayenge
  useEffect(() => {
    if (!hasMore) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGE_SIZE);
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  const handlePostComment = async (text: string) => {
    try {
      await createComment({ courseId, text }).unwrap();
    } catch (error: any) {
      if (error?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleEdit = async (commentId: number, text: string) => {
    try {
      await updateComment({ commentId, courseId, text }).unwrap();
    } catch (error: any) {
      if (error?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleDelete = (commentId: number) => {
    deleteComment({ commentId, courseId });
  };

  // targetId: jis comment/reply pe reply diya ja raha hai — backend flat parentId chain handle karta hai,
  // api.ts normalization use root comment ke replies me flatten kar dega (Instagram jaisa @mention ke saath)
  const handleReply = async (targetId: number, text: string) => {
    try {
      await createComment({ courseId, text, parentId: targetId }).unwrap();
    } catch (error: any) {
      if (error?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <Box
      sx={{
        bgcolor: commentTheme.colors.card,
        borderRadius: commentTheme.radius.card,
        border: `1px solid ${commentTheme.colors.border}`,
        p: { xs: 2, sm: 3 },
        mt:3,
        maxWidth: 850,
        mx: "auto",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography sx={commentTheme.typography.heading}>
          Discussion {!isLoading && !isError ? `(${totalCount})` : ""}
        </Typography>

        <Button
          size="small"
          variant="outlined"
          startIcon={<SortIcon sx={{ fontSize: 16 }} />}
          onClick={(e) => setSortAnchor(e.currentTarget)}
          sx={{
            textTransform: "none",
            fontSize: { xs: 12, sm: 13 },
            color: commentTheme.colors.textSecondary,
            borderColor: commentTheme.colors.border,
            borderRadius: commentTheme.radius.button,
            px: { xs: 1.2, sm: 1.6 },
            "&:hover": { borderColor: commentTheme.colors.primary, bgcolor: "transparent" },
          }}
        >
          {sortLabel}
        </Button>
        <Menu anchorEl={sortAnchor} open={sortOpen} onClose={() => setSortAnchor(null)}>
          {SORT_OPTIONS.map((opt) => (
            <MenuItem
              key={opt.value}
              selected={opt.value === sort}
              onClick={() => {
                setSort(opt.value);
                setSortAnchor(null);
              }}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      {/* Add Comment */}
      <CommentInput
        avatarUrl={currentUserAvatar}
        loading={isPosting}
        onSubmit={handlePostComment}
      />

      <Divider sx={{ my: 2, borderColor: commentTheme.colors.border }} />

      {/* States */}
      {isLoading ? (
        <CommentSkeleton rows={3} />
      ) : isError ? (
        <Stack alignItems="center" spacing={1.5} sx={{ py: 5 }}>
          <Alert severity="error" sx={{ borderRadius: commentTheme.radius.button }}>
            Couldn&apos;t load discussions. Please try again.
          </Alert>
          <Button
            size="small"
            variant="outlined"
            onClick={() => refetch()}
            sx={{
              textTransform: "none",
              borderRadius: commentTheme.radius.button,
              borderColor: commentTheme.colors.primary,
              color: commentTheme.colors.primary,
            }}
          >
            Retry
          </Button>
        </Stack>
      ) : sortedComments.length === 0 ? (
        <EmptyComment />
      ) : (
        <Box sx={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s ease" }}>
          {visibleComments.map((comment, idx) => (
            <React.Fragment key={comment.id}>
              <CommentCard
                comment={comment}
                currentUserId={currentUserId}
                currentUserAvatar={currentUserAvatar}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {idx !== visibleComments.length - 1 && (
                <Divider sx={{ borderColor: commentTheme.colors.border }} />
              )}
            </React.Fragment>
          ))}

          {hasMore && (
            <Box ref={sentinelRef} sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={20} sx={{ color: commentTheme.colors.primary }} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Comment;