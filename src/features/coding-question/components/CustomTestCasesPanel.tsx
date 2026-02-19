import React, { useEffect, useMemo, useState, memo } from "react";
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
    flex: 1,
    overflow: "auto",
  },

  editorHeader: {
    px: 1,
    py: 0.5,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #27272a",
  },

  resizeHandle: {
    height: 6,
    cursor: "row-resize",
    backgroundColor: "#27272a",
  },
};

const generateId = () => crypto.randomUUID();

interface Props {
  testCases: CustomTestCase[];
  onTestCasesChange: (t: CustomTestCase[]) => void;
  height: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

/* =====================================================
   TEST CASE EDITOR (Memoized)
===================================================== */

interface EditorProps {
  testCase: CustomTestCase | null;
  onChange: (
    id: string,
    value: string,
    key: string
  ) => void;
  onDelete: (id: string) => void;
}

const TestCaseEditor = memo(
  ({ testCase, onChange, onDelete }: EditorProps) => {
    if (!testCase) {
      return (
        <Typography sx={{ color: "#71717a", p: 2 }}>
          Select a testcase
        </Typography>
      );
    }

    const inputObject = testCase.input?.input ?? {};

    return (
      <Box sx={styles.editor}>
        <Box sx={styles.editorHeader}>
          <Typography variant="caption">Testcase</Typography>
          <IconButton
            size="small"
            onClick={() => onDelete(testCase.id)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.entries(inputObject).map(([key, val]) => {
            const displayValue =
              typeof val === "object"
                ? JSON.stringify(val)
                : String(val ?? "");

            return (
              <CustomTextField
                key={key}
                label={key}
                value={displayValue}
                onChange={(e) =>
                  onChange(
                    testCase.id,
                    e.target.value,
                    key
                  )
                }
              />
            );
          })}
        </Box>
      </Box>
    );
  }
);

/* =====================================================
   RESULT VIEW
===================================================== */

const ResultView = () => (
  <Box sx={{ p: 2 }}>
    <Typography sx={{ color: "#a1a1aa" }}>
      Result view (will connect to backend)
    </Typography>
  </Box>
);

/* =====================================================
   MAIN PANEL
===================================================== */

export const CustomTestCasesPanel: React.FC<Props> = ({
  testCases,
  onTestCasesChange,
  height,
  onResizeStart,
}) => {
  const [tab, setTab] = useState<"testcase" | "result">("testcase");
  const [activeId, setActiveId] = useState<string | null>(
    testCases[0]?.id ?? null
  );

  /* ---------- Sync Active TestCase ---------- */

  useEffect(() => {
    if (!testCases.length) {
      setActiveId(null);
      return;
    }

    if (!activeId || !testCases.some(t => t.id === activeId)) {
      setActiveId(testCases[0].id);
    }
  }, [testCases, activeId]);

  const activeTestCase = useMemo(
    () => testCases.find(t => t.id === activeId) ?? null,
    [testCases, activeId]
  );

  /* ---------- Actions ---------- */

  const addTestCase = () => {
    const id = generateId();

    const template =
      testCases.length > 0
        ? testCases[0].input?.input ?? {}
        : {};

    const newInput = Object.keys(template).reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, string>
    );

    const newTestCase: CustomTestCase = {
      id,
      input: { input: newInput },
    };

    onTestCasesChange([...testCases, newTestCase]);
    setActiveId(id);
  };

  const removeTestCase = (id: string) => {
    if (!window.confirm("Delete this testcase?")) return;

    const updated = testCases.filter(t => t.id !== id);
    onTestCasesChange(updated);
  };

  const updateTestCase = (
    id: string,
    value: string,
    key: string
  ) => {
    const updated = testCases.map(tc => {
      if (tc.id !== id) return tc;

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
    });

    onTestCasesChange(updated);
  };

  /* ===================================================== */

  return (
    <Box sx={styles.root(height)}>
      {/* Resize Handle */}
      <Box
        sx={styles.resizeHandle}
        onMouseDown={onResizeStart}
      />

      {/* Top Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={styles.tabs}
      >
        <Tab value="testcase" label="Testcase" />
        <Tab value="result" label="Result" />
      </Tabs>

      {/* TestCase Tabs */}
      <Tabs
        value={activeId ?? false}
        onChange={(_, v) => setActiveId(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={styles.subTabs}
      >
        {testCases.map((tc, i) => (
          <Tab
            key={tc.id}
            value={tc.id}
            label={`TC ${i + 1}`}
          />
        ))}

        <Tab
          icon={<AddIcon />}
          onClick={(e) => {
            e.stopPropagation();
            addTestCase();
          }}
        />
      </Tabs>

      {tab === "testcase" && (
        <TestCaseEditor
          testCase={activeTestCase}
          onChange={updateTestCase}
          onDelete={removeTestCase}
        />
      )}

      {tab === "result" && <ResultView />}
    </Box>
  );
};
