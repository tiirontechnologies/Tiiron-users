import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetCodeLanguagesQuery } from "../../course-practice/api/courseProgressApi";
import {
  getAvailableLanguages,
  getCodeFromTemplateArray,
  getDefaultCode,
  normalizeLanguageValue,
  languageIdToMonacoMap,
  type CodeTemplate,
} from "../utils/languageUtils";
import type { ApiQuestion } from "../types";

interface UseCodeAndLanguageParams {
  question: ApiQuestion | null;
}

export function useCodeAndLanguage({ question }: UseCodeAndLanguageParams) {
  const [searchParams] = useSearchParams();
  const { data: languagesData } = useGetCodeLanguagesQuery();
  const allLanguagesFromApi = languagesData?.data || [];

  const codeTemplateData = question?.code?.codeTemplate;
  const allowedLanguageIds = question?.code?.alllowedLanguage;

  const actualCodeTemplateArray = useMemo<CodeTemplate[] | undefined>(() => {
    if (Array.isArray(codeTemplateData)) return codeTemplateData;
    return undefined;
  }, [codeTemplateData]);

  const availableLanguages = useMemo(
    () => getAvailableLanguages(actualCodeTemplateArray, allowedLanguageIds, allLanguagesFromApi),
    [actualCodeTemplateArray, allowedLanguageIds, allLanguagesFromApi]
  );

  const initialLanguage = useMemo(() => {
    const urlLanguage = searchParams.get("language");
    if (urlLanguage && availableLanguages.some((l) => l.value === urlLanguage)) {
      return urlLanguage;
    }
    if (availableLanguages.length > 0) return availableLanguages[0].value;
    return "";
  }, [availableLanguages, searchParams]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);
  const [code, setCode] = useState<string>(() => {
    if (initialLanguage) {
      const templateCode = getCodeFromTemplateArray(
        initialLanguage,
        actualCodeTemplateArray,
        allLanguagesFromApi
      );
      if (templateCode) return templateCode;
    }
    return getDefaultCode(initialLanguage, actualCodeTemplateArray, allLanguagesFromApi);
  });

  useEffect(() => {
    if (selectedLanguage) {
      const templateCode = getCodeFromTemplateArray(
        selectedLanguage,
        actualCodeTemplateArray,
        allLanguagesFromApi
      );
      setCode(
        templateCode ??
          getDefaultCode(selectedLanguage, actualCodeTemplateArray, allLanguagesFromApi)
      );
    }
  }, [selectedLanguage, actualCodeTemplateArray, allLanguagesFromApi]);

  useEffect(() => {
    if (availableLanguages.length > 0) {
      const firstAllowed = availableLanguages[0].value;
      setSelectedLanguage((prev) => {
        const isCurrentAllowed = availableLanguages.some((l) => l.value === prev);
        return isCurrentAllowed ? prev : firstAllowed;
      });
    }
  }, [availableLanguages]);

  const getLanguageId = (): number => {
    const lang = availableLanguages.find((l) => l.value === selectedLanguage);
    if (lang) return lang.id;
    if (allLanguagesFromApi?.length) {
      const apiLang = allLanguagesFromApi.find((l) => {
        const value = normalizeLanguageValue(l.name, l.value);
        return value === selectedLanguage;
      });
      if (apiLang) return apiLang.id;
    }
    const entry = Object.entries(languageIdToMonacoMap).find(
      ([_, value]) => value === selectedLanguage
    );
    return entry ? parseInt(entry[0]) : 63;
  };

  return {
    availableLanguages,
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    getLanguageId,
  };
}
