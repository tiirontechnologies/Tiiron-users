import ScoreSvg from "@icons/Score.svg";
import DummyCodeImage from "@images/main.jpg";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  AccordionDetails,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  styled,
  Typography,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { useState } from "react";

const AllQuestions = [
  {
    questionId: 1,
    question:
      "Lorem ipsum dolor sit amet consectetur. Eget morbi commodo ornare non. Ultricies mi integer.",
    answerOptions: (
      <>
        <img src={DummyCodeImage} />
      </>
    ),
  },
  {
    questionId: 2,
    question:
      "Lorem ipsum dolor sit amet consectetur. Eget morbi commodo ornare non. Ultricies mi integer.",
    answerOptions: <CheckExample />,
  },
  {
    questionId: 3,
    question:
      "Lorem ipsum dolor sit amet consectetur. Eget morbi commodo ornare non. Ultricies mi integer.",
    answerOptions: (
      <>
        <CheckExample />
      </>
    ),
  },
];

const MainContent: React.FC = () => {
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
      <Typography
        component="h1"
        sx={{ color: "#000", fontWeight: "500", fontSize: "22px" }}
      >
        Article 1
      </Typography>
      <Typography sx={{ color: "#000", fontWeight: "400", fontSize: "16px" }}>
        Lorem ipsum dolor sit amet consectetur. Porta consectetur integer sit
        tristique feugiat et. Ultricies congue ornare diam cras. Eu eget libero
        cras enim. Et tempus nullam nullam sagittis turpis. At sit neque enim
        nisl egestas nullam habitasse quis lectus. Pharetra massa et nulla elit
        diam amet. Felis ullamcorper id nec pulvinar a eu amet ultricies eget.
        Vulputate urna nisi sit quam quis suspendisse ornare. Lorem malesuada
        sed aliquam viverra non faucibus gravida enim. Id orci semper aliquet
        iaculis at massa. Nulla nullam aliquam condimentum venenatis elementum
        eu nunc sed habitant. Dolor nunc nunc at fusce sagittis facilisi. Donec
        ut varius ullamcorper amet nisi sed quam. Semper tellus cras malesuada
        maecenas proin id nunc blandit cursus. Sed arcu sit non sagittis.
        Commodo velit viverra duis interdum habitant ac maecenas volutpat. Orci
        pellentesque netus est consectetur ipsum. Cursus ac scelerisque vivamus
        imperdiet. Sapien iaculis vitae turpis imperdiet nibh eget mi.
      </Typography>
      <Box
        component="video"
        controls
        width="100%"
        sx={{
          display: "flex",
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: "640px",
          margin: "auto",
          my: "32px",
        }}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {AllQuestions.map((item) => (
          <Accordion>
            <AccordionSummary>
              <Typography
                sx={{ color: "#0F172A", fontWeight: "600", fontSize: "180x" }}
              >
                `{`Practice Question ${item.questionId}`}`
              </Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <Typography
                sx={{
                  color: "#000000",
                  fontsize: "16px",
                  fontWeight: "600",
                  mt: "16px",
                  mb: "24px",
                }}
              >
                Question -
                <Typography component="span" sx={{ fontWeight: "500" }}>
                  {item.question}
                </Typography>
              </Typography>
              <Box>{item.answerOptions}</Box>
            </StyledAccordionDetails>
          </Accordion>
        ))}
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
            <img src={ScoreSvg} alt="" />
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
          <Button variant="outlined">Check Answer</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({}) => ({
  borderRadius: "16px",
  backgroundColor: "transparent",
  overflow: "hidden",
  borderTop: "1px solid #F2F2F2",
  borderBottom: "1px solid #F2F2F2",

  // padding: "4px",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    bordeRadius: "16px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => {
  const { children, ...other } = props;
  return (
    <MuiAccordionSummary {...other} expandIcon={null}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
      >
        <ArrowForwardIosSharpIcon
          sx={{
            fontWeight: 600,
            color: "#0F172A",
            fontSize: "0.9rem",
            transition: "transform 0.3s",
            transform: props["aria-expanded"]
              ? "rotate(90deg)"
              : "rotate(90deg)",
          }}
          className="custom-expand-icon"
        />
        {children}
        <Typography sx={{ color: "#334155", ml: "auto" }}>
          Score : 10 points
        </Typography>
      </Box>
    </MuiAccordionSummary>
  );
})(({ theme }) => ({
  backgroundColor: "#fff",
  flexDirection: "row",
  borderRadius: "16px", // 👈 fully rounded corners
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  [`& .custom-expand-icon`]: {
    transition: "transform 0.3s",
  },
  [`&.Mui-expanded .custom-expand-icon`]: {
    transform: "rotate(-90deg)",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: "transparent", // match Accordion background or change as needed
  // padding: theme.spacing(2),
  padding: "0",
  paddingBottom: "15px",
  color: "#0F172A", // optional: text color
}));

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
