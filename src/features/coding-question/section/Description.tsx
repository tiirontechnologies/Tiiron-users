import {
  Paper,
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { COLORS } from "../../../config/env.ts";
import { PAGE } from "../constants";
import { ApiQuestion } from "../types";

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
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#18181b",
        color: "#fff",
        overflow: "hidden",
        border: "1px solid #27272a",
        borderRadius: PAGE.radiusLg,
        width: "100%",
      }}
    >
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
      {question.description && question.description.trim() ? (
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
      )}
      <Box sx={{ display: "flex", gap: 3, textAlign: "left", borderBottom: "1px solid #9b9a9a", padding: "20px 0", mb: 2 }}>
        <Typography variant="body2" sx={{ color: "#fff" }}>Accepted <strong>—</strong></Typography>
        <Typography variant="body2" sx={{ color: "#fff" }}>Submissions <strong>—</strong></Typography>
        <Typography variant="body2" sx={{ color: "#fff" }}>Acceptance Rate <strong>—</strong></Typography>
      </Box>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-topics" id="panel-topics-header">
          <LabelImportantIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Topics
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Array" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
            <Chip label="String" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
            <Chip label="Dynamic Programming" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
            <Chip label="Two Pointers" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
            <Chip label="Hash Table" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
            <Chip label="Stack" sx={{ color: "#ffffff", background: "#363636", mb: 0.5 }} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-companies" id="panel-companies-header">
          <BusinessCenterIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Companies
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#b0b0b0" }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Amazon" size="small" sx={{ color: "#fff", background: "#363636" }} />
            <Chip label="Google" size="small" sx={{ color: "#fff", background: "#363636" }} />
            <Chip label="Microsoft" size="small" sx={{ color: "#fff", background: "#363636" }} />
            <Chip label="Apple" size="small" sx={{ color: "#fff", background: "#363636" }} />
            <Chip label="Meta" size="small" sx={{ color: "#fff", background: "#363636" }} />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-hint1" id="panel-hint1-header">
          <EmojiObjectsIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Hint 1
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}>
          Try breaking the problem into smaller subproblems. Consider what happens when you process the input one element at a time.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-hint2" id="panel-hint2-header">
          <EmojiObjectsIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Hint 2
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#b0b0b0", fontSize: "0.875rem" }}>
          Think about using extra space to store intermediate results. A hash map or array could help you avoid redundant computations.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-similar" id="panel-similar-header">
          <DescriptionIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Similar Questions
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#b0b0b0" }}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, borderBottom: "1px solid #3f3f46" }}>
              <Typography component="span" sx={{ color: "#fff", fontSize: "0.875rem", "&:hover": { color: COLORS.primary }, cursor: "pointer" }}>Two Sum</Typography>
              <Chip label="Easy" size="small" sx={{ color: "#fff", background: "#22c55e" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, borderBottom: "1px solid #3f3f46" }}>
              <Typography component="span" sx={{ color: "#fff", fontSize: "0.875rem", "&:hover": { color: COLORS.primary }, cursor: "pointer" }}>Valid Anagram</Typography>
              <Chip label="Easy" size="small" sx={{ color: "#fff", background: "#22c55e" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5, borderBottom: "1px solid #3f3f46" }}>
              <Typography component="span" sx={{ color: "#fff", fontSize: "0.875rem", "&:hover": { color: COLORS.primary }, cursor: "pointer" }}>Group Anagrams</Typography>
              <Chip label="Medium" size="small" sx={{ color: "#fff", background: "#eab308" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5 }}>
              <Typography component="span" sx={{ color: "#fff", fontSize: "0.875rem", "&:hover": { color: COLORS.primary }, cursor: "pointer" }}>Longest Substring Without Repeating Characters</Typography>
              <Chip label="Medium" size="small" sx={{ color: "#fff", background: "#eab308" }} />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "#262626", color: "#fff", borderBottom: "1px solid #9b9a9a", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />} aria-controls="panel-discussions" id="panel-discussions-header">
          <ChatIcon sx={{ mr: 1, verticalAlign: "middle" }} /> Discussions (24)
        </AccordionSummary>
        <AccordionDetails sx={{ color: "#b0b0b0" }}>
          <Stack spacing={1.5}>
            <Box sx={{ p: 1.5, backgroundColor: "#1f1f23", borderRadius: 1, borderLeft: "3px solid #3f3f46" }}>
              <Typography sx={{ color: "#fff", fontSize: "0.8125rem", fontWeight: 600, mb: 0.5 }}>O(n) solution with single pass</Typography>
              <Typography sx={{ color: "#a1a1aa", fontSize: "0.8125rem" }}>You can solve this in one pass by maintaining a running count. No need for nested loops.</Typography>
            </Box>
            <Box sx={{ p: 1.5, backgroundColor: "#1f1f23", borderRadius: 1, borderLeft: "3px solid #3f3f46" }}>
              <Typography sx={{ color: "#fff", fontSize: "0.8125rem", fontWeight: 600, mb: 0.5 }}>Edge case: empty input</Typography>
              <Typography sx={{ color: "#a1a1aa", fontSize: "0.8125rem" }}>Don&apos;t forget to handle the case when the input array or string is empty. Return early with the appropriate value.</Typography>
            </Box>
            <Box sx={{ p: 1.5, backgroundColor: "#1f1f23", borderRadius: 1, borderLeft: "3px solid #3f3f46" }}>
              <Typography sx={{ color: "#fff", fontSize: "0.8125rem", fontWeight: 600, mb: 0.5 }}>Alternative approach using sorting</Typography>
              <Typography sx={{ color: "#a1a1aa", fontSize: "0.8125rem" }}>Sorting the input first might simplify the logic. Consider time complexity: O(n log n) for sort vs O(n) for single pass.</Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export default Description;