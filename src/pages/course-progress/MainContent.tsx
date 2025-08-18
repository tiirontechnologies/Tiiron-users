import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Scoresvg from "@icons/Score.svg";
const MainContent: React.FC<any> = ({ data }: { data: any }) => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <Box
      sx={{
        marginLeft: "289px",
        marginTop: "64px",
        padding: "24px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{ color: "#000", fontWeight: "400", fontSize: "16px" }}
        dangerouslySetInnerHTML={{ __html: data?.unit?.content }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Array.isArray(data?.unit?.questions) && data.unit.questions.length > 0 ? (
          data.unit.questions.map((question: any, idx: number) => (
            <Accordion
              key={question.id || idx}
              sx={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                mb: 2,
              }}
            >
              <AccordionSummary>
                <Typography
                  sx={{ color: "#0F172A", fontWeight: "600", fontSize: "18px" }}
                >
                  {`Practice Question ${idx + 1}`}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
                    <span dangerouslySetInnerHTML={{ __html: question.text }} />
                  </Typography>

                  <Typography sx={{ fontSize: "14px", color: "#666", mb: 2 }}>
                    Type: {question.type.replace("_", " ")}, Score: {question.score}
                  </Typography>

                  {/* Multiple Choice: Checkbox */}
                  {question.type === "multiple_choice" && Array.isArray(question.options) && (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                      {question.options.map((opt: any, oidx: number) => (
                        <Box
                          key={oidx}
                          sx={{
                            flex: 1,
                            minWidth: 180,
                            border: `1px solid ${showAnswers && opt.isCorrect ? "#42B285" : "#E6E6E6"}`,
                            p: "12px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            background: showAnswers && opt.isCorrect ? "#ECFDF8" : "#F9FAFA",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={showAnswers ? opt.isCorrect : false}
                            disabled
                            style={{
                              marginRight: 12,
                              accentColor: showAnswers && opt.isCorrect ? "#42B285" : "#E6E6E6",
                            }}
                          />
                          <Typography
                            sx={{ fontSize: "15px", color: "#222", fontWeight: 500 }}
                          >
                            {opt.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Single Choice: Radio */}
                  {question.type === "single_choice" && Array.isArray(question.options) && (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
                      {question.options.map((opt: any, oidx: number) => (
                        <Box
                          key={oidx}
                          sx={{
                            flex: 1,
                            minWidth: 180,
                            border: `1px solid ${showAnswers && opt.isCorrect ? "#42B285" : "#E6E6E6"}`,
                            p: "12px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            background: showAnswers && opt.isCorrect ? "#ECFDF8" : "#F9FAFA",
                          }}
                        >
                          <input
                            type="radio"
                            checked={showAnswers ? opt.isCorrect : false}
                            disabled
                            style={{
                              marginRight: 12,
                              accentColor: showAnswers && opt.isCorrect ? "#42B285" : "#E6E6E6",
                            }}
                          />
                          <Typography
                            sx={{ fontSize: "15px", color: "#222", fontWeight: 500 }}
                          >
                            {opt.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Fill Up: Input field */}
                  {question.type === "fill_up" && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: "8px",
                        background: "#F9FAFA",
                        border: "1px solid #E6E6E6",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#42B285",
                          fontWeight: 600,
                          mr: 2,
                        }}
                      >
                        Correct Answer:
                      </Typography>
                      <input
                        type="text"
                        value={showAnswers ? question.correctAnswer || "" : ""}
                        disabled
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid #42B285",
                          background: "#fff",
                          fontWeight: 500,
                          color: "#222",
                          minWidth: 120,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography sx={{ color: "#999", fontSize: "15px" }}>
            No questions found for this unit.
          </Typography>
        )}
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            height: "auto",
            alignItems: "flex-end",
            gap: "16px",
            pt: 5,
          }}
        >
          <Box
            sx={{ mr: 2, display: "flex", alignItems: "center", gap: "14px" }}
          >
            <img src={Scoresvg} alt="" />
            <Box>
              <Typography
                sx={{ color: "#000000", fontWeight: "500", fontSize: "16px" }}
              >
                Congratulation your score is :
              </Typography>
              <Typography
                sx={{ color: "#000000", fontWeight: "600", fontSize: "22px" }}
              >
                25 / 30
              </Typography>
            </Box>
          </Box>
          <Button>Complete</Button>
          <Button variant="outlined" onClick={() => setShowAnswers(true)}>Check Answer</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;

export function CheckExample() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${checked1 ? "#42B285" : "#cccccc"}`,
          p: "8px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={checked1}
              onChange={(e) => setChecked1(e.target.checked)}
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: "4px",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "#ffffff",
                  backgroundColor: "#42B285",
                },
              }}
            />
          }
          label={<Typography sx={{ color: "#000" }}>Answer 1</Typography>}
        />
      </Box>

      <Box
        sx={{
          border: `1px solid ${checked2 ? "#42B285" : "#cccccc"}`,
          p: "8px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={checked2}
              onChange={(e) => setChecked2(e.target.checked)}
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: "4px",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "#ffffff",
                  backgroundColor: "#42B285",
                },
              }}
            />
          }
          label={<Typography sx={{ color: "#000" }}>Answer 2</Typography>}
        />
      </Box>
    </>
  );
}
