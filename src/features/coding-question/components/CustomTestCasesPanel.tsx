import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CustomTestCase } from "../types";
import { CustomTextField } from "@components/ui";
const HEADER_HEIGHT = 44;
const TAB_HEIGHT = 40;


const styles = {
  root: (height: number) => ({
    height,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#18181b",
    borderBottom: "1px solid #27272a",
  }),

  tabs: {
    minHeight: TAB_HEIGHT,
    borderBottom: "1px solid #27272a",
  },

  subTabs: {
    minHeight: TAB_HEIGHT,
    backgroundColor: "#0f0f12",
    borderBottom: "1px solid #27272a",
  },

  editor: {
    border: "1px solid #27272a",
    backgroundColor: "#0f0f12",
  },

  editorHeader: {
    px: 1,
    py: 0.5,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #27272a",
  },
};

const generateId = () => crypto.randomUUID();

interface Props {
  testCases: CustomTestCase[];
  onTestCasesChange: (t: CustomTestCase[]) => void;
  height: number;
  onResizeStart: (e: React.MouseEvent) => void;
}


const TestCaseEditor = ({
  testCase,
  onChange,
  onDelete,
}: {
  testCase: CustomTestCase | null;
  onChange: any;
  onDelete: (id: string) => void;
}) => {
  if (!testCase)
    return <Typography sx={{ color: "#71717a" }}>Select a testcase</Typography>;

  return (
    <Box sx={styles.editor}>
      <Box sx={styles.editorHeader}>
        <Typography variant="caption">Testcases</Typography>

        <IconButton size="small" onClick={() => onDelete(testCase.id)}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      {Object.keys(testCase.input?.input ?? {}).map(key => {
        const val = testCase.input.input[key];
        const displayValue = typeof val === 'object' ? JSON.stringify(val) : val;
        return (
          <CustomTextField
            key={key}
            label={key}
            value={displayValue}
            onChange={v => onChange(testCase.id, "input", v, key)}
          />
        );
      })}
    </Box>
  );
};


const ResultView = () => (
  <Typography sx={{ color: "#a1a1aa" }}>
    Result view (backend se connect hoga)
  </Typography>
);



/* =====================================================
   MAIN CONTAINER (ONLY STATE + LAYOUT)
===================================================== */

export const CustomTestCasesPanel: React.FC<Props> = ({
  testCases,
  onTestCasesChange,
  height,
  onResizeStart,
}) => {
  console.log(testCases);
  const [tab, setTab] = React.useState<"testcase" | "result">("testcase");
  const [activeId, setActiveId] = React.useState<string | null>(
    testCases[0]?.id ?? null
  );

  /* ---------- sync active testcase ---------- */

  React.useEffect(() => {
    if (!testCases.length) return setActiveId(null);

    if (!activeId || !testCases.some(t => t.id === activeId)) {
      setActiveId(testCases[0].id);
    }
  }, [testCases, activeId]);

  /* ---------- actions ---------- */



  const addTestCase = () => {
    const id = generateId();
    // Get keys from first test case to maintain structure
    const templateInput = testCases.length > 0 ? testCases[0].input?.input || {} : {};
    const inputStructure = Object.keys(templateInput).reduce((acc, key) => {
      acc[key] = ""; // Initialize with empty string
      return acc;
    }, {} as Record<string, string>);

    onTestCasesChange([...testCases, { id, input: { input: inputStructure }, expectedOutput: "" }]);
    setActiveId(id);
  };

  const removeTestCase = (id: string) => {
    if (!window.confirm("Delete this testcase?")) return;
    onTestCasesChange(testCases.filter(t => t.id !== id));
  };

  const updateTestCase = (
    id: string,
    field: "input" | "expectedOutput",
    value: string,
    key?: string
  ) => {
    onTestCasesChange(
      testCases.map(tc => {
        if (tc.id !== id) return tc;

        if (field === "input" && key) {
          return {
            ...tc,
            input: {
              ...(tc.input ?? {}),
              input: {
                ...(tc.input?.input ?? {}),
                [key]: value,
              },
            },
          };
        }

        return { ...tc, [field]: value };
      })
    );
  };

  const contentHeight = height - HEADER_HEIGHT - TAB_HEIGHT * 2;

  const active = testCases.find(t => t.id === activeId) ?? null;

  /* ===================================================== */

  return (
    <Box
      sx={styles.root(height)}
      onMouseDown={onResizeStart}
    >
      {/* Top Tabs */}
      {/* <TopTabs value={tab} onChange={setTab} /> */}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={styles.tabs}>
        <Tab value="testcase" label="Testcase" />
        <Tab value="result" label="Result" />
      </Tabs>

      {/* TestCases Tabs */}
      <Tabs
        value={activeId}
        onChange={(_, v) => setActiveId(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={styles.subTabs}
      >
        {testCases.map((tc, i) => (
          <Tab key={tc.id} value={tc.id} label={`TC${i + 1}`} />
        ))}
        <Tab icon={<AddIcon />} onClick={addTestCase} />
      </Tabs>

      {tab === "testcase" && (
        <TestCaseEditor
          testCase={active}
          onChange={updateTestCase}
          onDelete={removeTestCase}
        />
      )
      }
      {
        tab == "result" && (
          <ResultView />
        )
      }
    </Box>
  );
};











