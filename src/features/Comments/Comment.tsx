import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { commentTheme } from "./theme";
import type { SortOption, RawComment } from "./api/api";
import {
  useGetCourseCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "./api/api";
import CommentInput from "./Components/CommentInput";
import CommentCard from "./Components/CommentCard";
import CommentSkeleton from "./Components/CommentSkeleton";
import EmptyComment from "./Components/EmptyComment";

export interface ReplyWithMeta extends RawComment {
  replyingToUsername?: string;
}

export interface GroupedComment extends RawComment {
  replies: ReplyWithMeta[];
}

interface CommentProps {
  courseId: number;
  currentUserId?: number;
  currentUserAvatar?: string;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const PAGE_SIZE = 5;

const Comment: React.FC<CommentProps> = ({
  courseId,
  currentUserId,
  currentUserAvatar,
}) => {
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const sortOpen = Boolean(sortAnchor);
  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Newest";

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data: commentsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCourseCommentsQuery(courseId, { skip: !courseId });

  // 👇 yahi ek line direct data unwrap kar rahi hai
  const comments = commentsResponse?.data ?? [];

  const [likeComment] = useLikeCommentMutation();

  const handleLike = async (commentId: number) => {
    try {
      await likeComment({ commentId, courseId }).unwrap();
    } catch (error: any) {
      if (error?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const [createComment, { isLoading: isPosting }] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Flat API list (parentId based) -> top-level comment + flattened replies
  const groupedComments: GroupedComment[] = useMemo(() => {
    const raw = comments;
    if (!raw.length) return [];

    const byId = new Map<number, RawComment>();
    raw.forEach((c) => byId.set(c.id, c));

    const findRootId = (c: RawComment): number => {
      let cur = c;
      while (cur.parentId !== null) {
        const parent = byId.get(cur.parentId);
        if (!parent) break;
        cur = parent;
      }
      return cur.id;
    };

    const rootMap = new Map<number, GroupedComment>();
    const roots: GroupedComment[] = [];

    raw
      .filter((c) => c.parentId === null)
      .forEach((c) => {
        const node: GroupedComment = { ...c, replies: [] };
        rootMap.set(c.id, node);
        roots.push(node);
      });

    raw
      .filter((c) => c.parentId !== null)
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
      .forEach((c) => {
        const root = rootMap.get(findRootId(c));
        if (!root) return;
        const parent = byId.get(c.parentId as number);
        root.replies.push({ ...c, replyingToUsername: parent?.user?.username });
      });

    return roots;
  }, [comments]);

  const sortedComments = useMemo(() => {
    const list = [...groupedComments];
    list.sort((a, b) => {
      const diff = +new Date(a.createdAt) - +new Date(b.createdAt);
      return sort === "newest" ? -diff : diff;
    });
    return list;
  }, [groupedComments, sort]);

  const totalCount = useMemo(() => {
    return groupedComments.reduce((sum, c) => sum + 1 + c.replies.length, 0);
  }, [groupedComments]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [sort, courseId, comments.length]);

  const visibleComments = sortedComments.slice(0, visibleCount);
  const hasMore = visibleCount < sortedComments.length;

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
      { rootMargin: "150px" },
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
        mt: 3,
        maxWidth: 850,
        mx: "auto",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
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
            "&:hover": {
              borderColor: commentTheme.colors.primary,
              bgcolor: "transparent",
            },
          }}
        >
          {sortLabel}
        </Button>
        <Menu
          anchorEl={sortAnchor}
          open={sortOpen}
          onClose={() => setSortAnchor(null)}
        >
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

      <CommentInput
        avatarUrl={currentUserAvatar}
        loading={isPosting}
        onSubmit={handlePostComment}
      />

      <Divider sx={{ my: 2, borderColor: commentTheme.colors.border }} />

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
        <Box
          sx={{
            opacity: isFetching ? 0.6 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {visibleComments.map((comment, idx) => (
            <React.Fragment key={comment.id}>
              <CommentCard
                comment={comment}
                currentUserId={currentUserId}
                currentUserAvatar={currentUserAvatar}
                onReply={handleReply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
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