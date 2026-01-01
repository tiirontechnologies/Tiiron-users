import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Paper } from '@mui/material';
import CodeTestSubmission from '../components/CodeTestSubmission';

const CodeTestPage: React.FC = () => {
  const [questionId, setQuestionId] = useState<number>(18);
  const [sourceCode, setSourceCode] = useState<string>(
    `function reverseString(str) {
  return str.split('').reverse().join('');
}

const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim();
console.log(reverseString(input));`
  );
  const [languageId, setLanguageId] = useState<number>(63);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Code Test Submission
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Question ID"
            type="number"
            value={questionId}
            onChange={(e) => setQuestionId(Number(e.target.value))}
            fullWidth
          />

          <TextField
            label="Language ID"
            type="number"
            value={languageId}
            onChange={(e) => setLanguageId(Number(e.target.value))}
            fullWidth
            helperText="63 = JavaScript, 71 = Python, 58 = Java, etc."
          />

          <TextField
            label="Source Code"
            multiline
            rows={10}
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>
      </Paper>

      <CodeTestSubmission
        questionId={questionId}
        sourceCode={sourceCode}
        languageId={languageId}
      />
    </Container>
  );
};

export default CodeTestPage;


