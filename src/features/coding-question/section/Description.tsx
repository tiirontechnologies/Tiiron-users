import {
  Box,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { ApiQuestion } from "../types";

interface DescriptionProps {
  question: ApiQuestion | null;
}

const Description: React.FC<DescriptionProps> = ({ question }) => {
  if (!question) {
    return (
      <Typography variant="body1" sx={{ color: "#ffffff !important", opacity: 0.82, fontStyle: "italic" }}>
        No question data available.
      </Typography>
    );
  }
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.75, mb: 1.5 }}>
        {question.id != null && (
          <Typography variant="h5" sx={{ color: "#ffffff !important", opacity: 0.82, fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.35rem" } }}>
            {question.id}.
          </Typography>
        )}
        <Typography
          variant="h5"
          sx={{
            color: "#ffffff !important",
            fontWeight: 800,
            fontSize: { xs: "1.1rem", sm: "1.35rem" },
            lineHeight: 1.25,
            letterSpacing: 0,
          }}
        >
          {question.title || "Code Challenge"}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2.5 }} useFlexGap flexWrap="wrap">
        <Chip
          label={question.questiontypecon?.name || "Medium"}
          sx={{
            height: 28,
            color: "#ffffff",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "8px",
            fontWeight: 700,
          }}
        />
        {/* <Chip
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
        /> */}
      </Stack>
      {
        question.description && question.description.trim() ? (
          <Box
            sx={{
              color: "#ffffff",
              lineHeight: 1.8,
              mb: 2,
              wordBreak: "break-word",
              fontSize: "0.95rem",
              "& p": { mb: 2, color: "#ffffff", opacity: 0.92, "&:last-child": { mb: 0 } },
              "& strong, & b": { fontWeight: 800, color: "#fff" },
              "& h1, & h2, & h3, & h4, & h5, & h6": { fontWeight: 800, color: "#fff", mb: 1.5, mt: 3, "&:first-of-type": { mt: 0 } },
              "& ul, & ol": { pl: 3, mb: 2, "& li": { mb: 1, color: "#ffffff", opacity: 0.92 } },
              "& code": { backgroundColor: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "5px", fontSize: "14px", fontFamily: "monospace", color: "#fff" },
              "& pre": {
                backgroundColor: "#101114",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "monospace",
                overflow: "auto",
                mb: 2,
                "& code": { backgroundColor: "transparent", padding: 0 }
              },
              "& blockquote": { borderLeft: "4px solid #6366f1", pl: 2, ml: 0, fontStyle: "italic", color: "#fff", opacity: 0.82, mb: 2 },
              "& a": { color: "#6366f1", textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            }}
            dangerouslySetInnerHTML={{ __html: question.description }}
          />
        ) : (
          <Typography variant="body1" sx={{ color: "#ffffff !important", opacity: 0.82, fontStyle: "italic" }}>
            No description available for this challenge.
          </Typography>
        )
      }

      {/* <CustomAccordion title="Topics" icon={<LabelImportantIcon />}>
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
      </CustomAccordion> */}

    </>
  )
}

export default Description;
