import { useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useGetQuestionByIdQuery } from "../../course-practice/api/courseProgressApi";
import { ApiQuestion } from "../types";
import { CodeEditorContext } from "../context/CodeEditorContext";

export function useQuestionData() {
  const { questionId, courseId } = useParams<{ questionId: string; courseId: string }>();
  const location = useLocation();
  const { questionOverride } = useContext(CodeEditorContext);

  const questionFromState = location.state?.question as ApiQuestion | undefined;

  const { data: questionFromApi, isLoading: isLoadingQuestion, isError: isQuestionError } =
    useGetQuestionByIdQuery(
      { questionId: questionId!, courseId: courseId! },
      { skip: !questionId || !courseId || !!questionFromState || !!questionOverride }
    );

  const question: ApiQuestion | null = questionOverride || questionFromState || questionFromApi || null;

  return {
    question,
    isLoadingQuestion,
    isQuestionError,
  };
}
