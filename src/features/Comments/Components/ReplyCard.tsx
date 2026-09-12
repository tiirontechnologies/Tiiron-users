import React, { useState } from "react";
import { Box, Stack, Typography, Avatar, Chip } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { commentTheme } from "../theme";
import type { ReplyWithMeta } from "../Comment";
import CommentInput from "./CommentInput";
import { timeAgo } from "../utils/timeAgo";

interface ReplyCardProps {
  reply: ReplyWithMeta;
  currentUserAvatar?: string;
  onReply: (targetId: number, text: string) => void;
  onLike: (replyId: number) => void;
}

const fullNameOf = (firstName: string, lastName: string) =>
  `${firstName ?? ""} ${lastName ?? ""}`.trim();

const initialsOf = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "U";

const ReplyCard: React.FC<ReplyCardProps> = ({ reply, currentUserAvatar, onReply, onLike }) => {
  const [liked, setLiked] = useState(reply.isLiked);
  const [likes, setLikes] = useState(reply.likesCount);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const isMentor = false;

  const fullName = fullNameOf(reply.user.firstName, reply.user.lastName);
  const avatarUrl = reply.user.profile?.picture || undefined;

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    onLike(reply.id);
  };

  return (
    <Box sx={{ pl: { xs: 3, sm: 6.5 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          pt: 2,
          ...(isMentor
            ? {
                bgcolor: commentTheme.colors.mentorBg,
                borderLeft: `3px solid ${commentTheme.colors.mentorBorder}`,
                borderRadius: "10px",
                py: 1.5,
                pr: 1.5,
              }
            : {}),
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            bgcolor: commentTheme.colors.primary,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {!avatarUrl && initialsOf(fullName)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="baseline" spacing={0.8} flexWrap="wrap">
            <Typography sx={{ ...commentTheme.typography.name, fontSize: 13.5, fontWeight: 700 }}>
              {fullName}
            </Typography>
            <Typography sx={{ fontSize: 12, color: commentTheme.colors.textSecondary }}>
              @{reply.user.username}
            </Typography>
            {isMentor && (
              <Chip
                label="Mentor"
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: commentTheme.colors.primary,
                  color: "#fff",
                }}
              />
            )}
            <Typography sx={{ ...commentTheme.typography.meta, color: commentTheme.colors.textSecondary }}>
              · {timeAgo(reply.createdAt)}
            </Typography>
          </Stack>

          <Typography sx={{ ...commentTheme.typography.body, color: commentTheme.colors.textPrimary, mt: 0.3 }}>
            {reply.replyingToUsername && (
              <Box
                component="span"
                sx={{ color: commentTheme.colors.primary, fontWeight: 600, mr: 0.5 }}
              >
                @{reply.replyingToUsername}
              </Box>
            )}
            {reply.content}
          </Typography>

          <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mt: 0.6 }}>
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
              {liked ? <ThumbUpAltIcon sx={{ fontSize: 14 }} /> : <ThumbUpAltOutlinedIcon sx={{ fontSize: 14 }} />}
              <Typography sx={{ fontSize: 12 }}>{likes}</Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: 12,
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
            <Box sx={{ mt: 1.2, mb: 1 }}>
              <CommentInput
                avatarUrl={currentUserAvatar}
                placeholder={`Reply to @${reply.user.username}...`}
                submitLabel="Reply"
                size="compact"
                autoFocus
                showCancel
                onCancel={() => setShowReplyBox(false)}
                onSubmit={(text) => {
                  onReply(reply.id, text);
                  setShowReplyBox(false);
                }}
              />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ReplyCard;