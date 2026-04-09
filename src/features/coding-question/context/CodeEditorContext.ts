import { createContext } from 'react';
import { ApiQuestion } from '../types';

interface CodeEditorContextType {
  questionOverride?: ApiQuestion | null;
  onClose?: () => void;
}

export const CodeEditorContext = createContext<CodeEditorContextType>({});
