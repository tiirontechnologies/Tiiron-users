import {
  Box,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ChatIcon from "@mui/icons-material/Chat";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { COLORS } from "../../../config/env.ts";
import { ApiQuestion } from "../types";
import { CustomAccordion } from "@components/ui";

interface DescriptionProps {
  question: ApiQuestion | null;
}

const Description: React.FC<DescriptionProps> = ({ question }) => {
  if (!question) {
    return (
      <Typography variant="body1" sx={{ color: "#9b9a9a", fontStyle: "italic" }}>
        No question data available.
      </Typography>
    );
  }
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.5, mb: 2 }}>
        {question.id != null && (
          <Typography variant="h5" sx={{ color: "#fff" }}>{question.id}.</Typography>
        )}
        <Typography variant="h5" sx={{ color: "#fff" }}>{question.title || "Code Challenge"}</Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label={question.questiontypecon?.name || "Medium"}
          sx={{ color: "#ffffff", background: "#363636" }}
        />
        <Chip
          icon={<LabelImportantIcon sx={{ color: "#fff !important" }} />}
          label="Topics"
          sx={{ color: "#ffffff", background: "#363636" }}
        />
        <Chip
          icon={<LocalMallIcon sx={{ color: "#fff !important" }} />}
          label="Companies"
          sx={{ color: "#ffffff", background: "#363636" }}
        />
        <Chip
          icon={<EmojiObjectsIcon sx={{ color: "#fff !important" }} />}
          label="Hints"
          sx={{ color: "#ffffff", background: "#363636" }}
        />
      </Stack>
      {
        question.description && question.description.trim() ? (
          <Box
            sx={{
              color: "#fff",
              lineHeight: 1.8,
              mb: 2,
              wordBreak: "break-word",
              "& p": { mb: 2, color: "#fff", "&:last-child": { mb: 0 } },
              "& strong, & b": { fontWeight: 600, color: "#fff" },
              "& h1, & h2, & h3, & h4, & h5, & h6": { fontWeight: 600, color: "#fff", mb: 2, mt: 3, "&:first-of-type": { mt: 0 } },
              "& ul, & ol": { pl: 3, mb: 2, "& li": { mb: 1, color: "#fff" } },
              "& code": { backgroundColor: "#363636", padding: "2px 6px", borderRadius: "4px", fontSize: "14px", fontFamily: "monospace", color: "#fff" },
              "& pre": { backgroundColor: "#363636", padding: "12px", borderRadius: "8px", fontSize: "14px", fontFamily: "monospace", overflow: "auto", mb: 2, "& code": { backgroundColor: "transparent", padding: 0 } },
              "& blockquote": { borderLeft: "4px solid #6366f1", pl: 2, ml: 0, fontStyle: "italic", color: "#b0b0b0", mb: 2 },
              "& a": { color: "#6366f1", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            }}
            dangerouslySetInnerHTML={{ __html: question.description }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "#9b9a9a", fontStyle: "italic" }}>
            No description available for this challenge.
          </Typography>
        )
      }

      <CustomAccordion title="Topics" icon={<LabelImportantIcon />}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Array" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          <Chip label="String" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          <Chip label="Dynamic Programming" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          <Chip label="Two Pointers" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          <Chip label="Hash Table" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          <Chip label="Stack" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
        </Stack>
      </CustomAccordion>

      <CustomAccordion title="Companies" icon={<BusinessCenterIcon />}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Amazon" size="small" sx={{ color: "#fff", background: "#363636" }} />
          <Chip label="Google" size="small" sx={{ color: "#fff", background: "#363636" }} />
          <Chip label="Microsoft" size="small" sx={{ color: "#fff", background: "#363636" }} />
          <Chip label="Apple" size="small" sx={{ color: "#fff", background: "#363636" }} />
          <Chip label="Meta" size="small" sx={{ color: "#fff", background: "#363636" }} />
        </Stack>
      </CustomAccordion>

      <CustomAccordion title="Hint 1" icon={<EmojiObjectsIcon />}>
        <Typography sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}>
          Try breaking the problem into smaller subproblems. Consider what happens when you process the input one element at a time.
        </Typography>
      </CustomAccordion>

      <CustomAccordion title="Hint 2" icon={<EmojiObjectsIcon />}>
        <Typography sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}>
          Think about using extra space to store intermediate results. A hash map or array could help you avoid redundant computations.
        </Typography>
      </CustomAccordion>

    </>
  )
}

export default Description;