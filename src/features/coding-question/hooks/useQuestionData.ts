import { useParams, useLocation } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../../course-practice/api/courseProgressApi";
import { ApiQuestion } from "../types";

export function useQuestionData() {
  const { questionId, courseId } = useParams<{ questionId: string; courseId: string }>();
  const location = useLocation();

  const questionFromState = location.state?.question as ApiQuestion | undefined;

  const { data: questionFromApi, isLoading: isLoadingQuestion, isError: isQuestionError } =
    useGetQuestionByIdQuery(
      { questionId: questionId!, courseId: courseId! },
      { skip: !questionId || !courseId || !!questionFromState }
    );

  const question: ApiQuestion | null = questionFromState || questionFromApi || null;

  return {
    question,
    isLoadingQuestion,
    isQuestionError,
  };
}
