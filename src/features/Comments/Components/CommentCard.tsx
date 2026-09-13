import React, { useState } from "react";
import { Box, Stack, Typography, Avatar, IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { commentTheme } from "../theme";
import type { GroupedComment } from "../Comment";
import CommentInput from "./CommentInput";
import ReplyCard from "./ReplyCard";
import { timeAgo } from "../utils/timeAgo";

interface CommentCardProps {
  comment: GroupedComment;
  currentUserId?: number;
  currentUserAvatar?: string;
  onReply: (targetId: number, text: string) => void;
  onEdit: (commentId: number, text: string) => void;
  onDelete: (commentId: number) => void;
  onLike: (commentId: number) => void;
}

const REPLIES_PREVIEW_COUNT = 2;

const fullNameOf = (firstName: string, lastName: string) =>
  `${firstName ?? ""} ${lastName ?? ""}`.trim();

const initialsOf = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "U";

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  currentUserId,
  currentUserAvatar,
  onReply,
  onEdit,
  onDelete,
  onLike,
}) => {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likesCount);

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const isOwner = comment.user.id === currentUserId || comment.userId === currentUserId;

  const fullName = fullNameOf(comment.user.firstName, comment.user.lastName);
  const avatarUrl = comment.user.profile?.picture || undefined;

  const visibleReplies = showAllReplies
    ? comment.replies
    : comment.replies.slice(0, REPLIES_PREVIEW_COUNT);
  const hiddenRepliesCount = comment.replies.length - visibleReplies.length;

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    onLike(comment.id);
  };

  const handleEditSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(comment.id, trimmed);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        py: 2.5,
        px: { xs: 1, sm: 1.5 },
        borderRadius: commentTheme.radius.card,
        borderLeft: `3px solid transparent`,
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          bgcolor: commentTheme.colors.background,
          borderLeft: `3px solid ${commentTheme.colors.primary}`,
        },
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <Avatar
          src={avatarUrl}
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            flexShrink: 0,
            bgcolor: commentTheme.colors.primary,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {!avatarUrl && initialsOf(fullName)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="baseline" spacing={0.8} flexWrap="wrap">
              <Typography sx={{ ...commentTheme.typography.name, fontWeight: 700 }}>
                {fullName}
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: commentTheme.colors.textSecondary }}>
                @{comment.user.username}
              </Typography>
              <Typography sx={{ ...commentTheme.typography.meta, color: commentTheme.colors.textSecondary }}>
                {timeAgo(comment.createdAt)}
              </Typography>
            </Stack>

            {isOwner && (
              <>
                <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <MoreVertIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
                  <MenuItem
                    onClick={() => {
                      setIsEditing(true);
                      setAnchorEl(null);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onDelete(comment.id);
                      setAnchorEl(null);
                    }}
                    sx={{ color: commentTheme.colors.error }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )}
          </Stack>

          {isEditing ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: commentTheme.radius.input,
                    bgcolor: commentTheme.colors.background,
                    fontSize: 14,
                  },
                }}
              />
              <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 1 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(comment.content);
                  }}
                  sx={{ textTransform: "none", borderRadius: commentTheme.radius.button }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEditSave}
                  sx={{
                    textTransform: "none",
                    borderRadius: commentTheme.radius.button,
                    background: commentTheme.gradient,
                    boxShadow: "none",
                  }}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          ) : (
            <Typography sx={{ ...commentTheme.typography.body, color: commentTheme.colors.textPrimary, mt: 0.4 }}>
              {comment.content}
            </Typography>
          )}

          <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mt: 1 }}>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                cursor: "pointer",
                color: liked ? commentTheme.colors.primary : commentTheme.colors.textSecondary,
              }}
              onClick={toggleLike}
            >
              {liked ? <ThumbUpAltIcon sx={{ fontSize: 17 }} /> : <ThumbUpAltOutlinedIcon sx={{ fontSize: 17 }} />}
              <Typography sx={{ fontSize: 13 }}>{likes}</Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: commentTheme.colors.primary,
                cursor: "pointer",
              }}
              onClick={() => setShowReplyBox((prev) => !prev)}
            >
              Reply
            </Typography>
          </Stack>

          {showReplyBox && (
            <Box sx={{ mt: 1.5 }}>
              <CommentInput
                avatarUrl={currentUserAvatar}
                placeholder="Write a reply..."
                submitLabel="Reply"
                size="compact"
                autoFocus
                showCancel
                onCancel={() => setShowReplyBox(false)}
                onSubmit={(text) => {
                  onReply(comment.id, text);
                  setShowReplyBox(false);
                }}
              />
            </Box>
          )}

          {visibleReplies.map((reply) => (
            <ReplyCard
              key={reply.id}
              reply={reply}
              currentUserAvatar={currentUserAvatar}
              onReply={onReply}
              onLike={onLike}
            />
          ))}

          {hiddenRepliesCount > 0 && (
            <Typography
              onClick={() => setShowAllReplies(true)}
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: commentTheme.colors.textSecondary,
                cursor: "pointer",
                pl: { xs: 3, sm: 6.5 },
                mt: 1,
                "&:hover": { color: commentTheme.colors.primary },
              }}
            >
              — View {hiddenRepliesCount} more {hiddenRepliesCount === 1 ? "reply" : "replies"}
            </Typography>
          )}

          {showAllReplies && comment.replies.length > REPLIES_PREVIEW_COUNT && (
            <Typography
              onClick={() => setShowAllReplies(false)}
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: commentTheme.colors.textSecondary,
                cursor: "pointer",
                pl: { xs: 3, sm: 6.5 },
                mt: 1,
                "&:hover": { color: commentTheme.colors.primary },
              }}
            >
              Hide replies
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentCard;