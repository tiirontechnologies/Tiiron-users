/** Language ID to Monaco editor language value mapping */
export const languageIdToMonacoMap: Record<number, string> = {
  50: "c",
  51: "csharp",
  54: "cpp",
  58: "java",
  60: "go",
  63: "javascript",
  68: "php",
  70: "python",
  71: "python",
  72: "ruby",
  73: "rust",
  74: "swift",
  76: "typescript",
  78: "kotlin",
  91: "java",
  105: "typescript",
};

export interface LanguageInfo {
  value: string;
  label: string;
  id: number;
}

export interface ApiLanguage {
  id: number;
  name: string;
  value?: string;
  label?: string;
}

export interface CodeTemplate {
  code: string;
  languageId: number;
}

/** Normalizes language value from API response to Monaco-compatible format */
export const normalizeLanguageValue = (name: string, value?: string): string => {
  if (value) return value.toLowerCase();
  const normalized = name.toLowerCase().replace(/\s+/g, "");
  const mapping: Record<string, string> = {
    "c++": "cpp",
    "c#": "csharp",
    csharp: "csharp",
    typescript: "typescript",
    javascript: "javascript",
    java: "java",
    python: "python",
    php: "php",
    ruby: "ruby",
  };
  return mapping[normalized] || normalized;
};

/** Gets available languages from question code object and API */
export const getAvailableLanguages = (
  codeTemplateArray?: CodeTemplate[],
  allowedLanguageIds?: number[],
  allLanguagesFromApi?: ApiLanguage[]
): LanguageInfo[] => {
  const languageMap = new Map<number, LanguageInfo>();

  if (allLanguagesFromApi?.length) {
    for (const lang of allLanguagesFromApi) {
      const value = normalizeLanguageValue(lang.name, lang.value);
      const label = lang.label || lang.name;
      languageMap.set(lang.id, { value, label, id: lang.id });
    }
  }

  const source = allowedLanguageIds?.length
    ? allowedLanguageIds
    : codeTemplateArray?.map((t) => t.languageId);

  if (!source?.length) return [];

  const languages: LanguageInfo[] = [];
  const seenValues = new Set<string>();

  for (const langId of source) {
    let langInfo = languageMap.get(langId);

    if (!langInfo) {
      const langValue = languageIdToMonacoMap[langId];
      if (langValue && !seenValues.has(langValue)) {
        seenValues.add(langValue);
        langInfo = {
          value: langValue,
          label: langValue.charAt(0).toUpperCase() + langValue.slice(1),
          id: langId,
        };
      }
    } else if (!seenValues.has(langInfo.value)) {
      seenValues.add(langInfo.value);
    } else {
      continue;
    }

    if (langInfo) languages.push(langInfo);
  }

  return languages;
};

/** Gets code template by language from codeTemplate array */
export const getCodeFromTemplateArray = (
  language: string,
  codeTemplateArray?: CodeTemplate[],
  allLanguagesFromApi?: ApiLanguage[]
): string | null => {
  if (!codeTemplateArray?.length) return null;

  const languageValueMap = new Map<number, string>();
  if (allLanguagesFromApi?.length) {
    for (const lang of allLanguagesFromApi) {
      languageValueMap.set(lang.id, normalizeLanguageValue(lang.name, lang.value));
    }
  }

  const template = codeTemplateArray.find((t) => {
    const mappedValue = languageValueMap.get(t.languageId);
    if (mappedValue === language) return true;
    return languageIdToMonacoMap[t.languageId] === language;
  });

  return template?.code ?? null;
};

const DEFAULT_TEMPLATES: Record<string, string> = {
  python: `# Write your solution here\ndef solve():\n    # Your code goes here\n    return`,
  javascript: `// Write your solution here\nfunction solve() {\n    // Your code goes here\n    return;\n}`,
  java: `// Write your solution here\npublic class Solution {\n    public void solve() {\n        // Your code goes here\n    }\n}`,
  cpp: `// Write your solution here\n#include <iostream>\nusing namespace std;\n\nvoid solve() {\n    // Your code goes here\n}`,
  c: `// Write your solution here\n#include <stdio.h>\n\nvoid solve() {\n    // Your code goes here\n}`,
  csharp: `// Write your solution here\nusing System;\n\npublic class Solution {\n    public void solve() {\n        // Your code goes here\n    }\n}`,
  php: `<?php\n// Write your solution here\nfunction solve() {\n    // Your code goes here\n}`,
  ruby: `# Write your solution here\ndef solve\n    # Your code goes here\nend`,
  go: `package main\n\n// Write your solution here\nfunc solve() {\n    // Your code goes here\n}`,
  rust: `// Write your solution here\nfn solve() {\n    // Your code goes here\n}`,
  swift: `// Write your solution here\nfunc solve() {\n    // Your code goes here\n}`,
  kotlin: `// Write your solution here\nfun solve() {\n    // Your code goes here\n}`,
  typescript: `// Write your solution here\nfunction solve(): void {\n    // Your code goes here\n}`,
};

/** Gets default code for a language (fallback when no template available) */
export const getDefaultCode = (
  language: string,
  codeTemplateArray?: CodeTemplate[],
  allLanguagesFromApi?: ApiLanguage[]
): string => {
  const templateCode = getCodeFromTemplateArray(language, codeTemplateArray, allLanguagesFromApi);
  if (templateCode) return templateCode;
  return DEFAULT_TEMPLATES[language] || DEFAULT_TEMPLATES.javascript;
};
