import { useState, useCallback, useEffect, useMemo } from "react";
import {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
  useGetQuestionsByUnitIdQuery,
  useGetPracticeProgressQuery, 
} from "../api/courseProgressApi";
import { useParams } from "react-router-dom";
import { transformApiResponse } from "../utils/transformApiResponse";

export const useCourseProgress = () => {
  const params = useParams<{ courseId: string; id?: string }>();
  const courseId = params.courseId || params.id || "";
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  // 1. Course Structure Query
  const {
    data: courseData,
    isFetching: isCourseLoading,
    isError: isCourseError,
  } = useGetLessonAndTopicByCourseIdQuery(
    { id: courseId! },
    { skip: !courseId }
  );

  // 2. Unit Specific Content Query
  const {
    data: unitsDataRaw,
    isFetching: isUnitsLoading,
    isError: isUnitsError,
      error: unitsError,
    refetch: refetchContent,
  } = useGetContentByTopicIdQuery(
    { unitId: selectedUnitId, courseId: courseId! },
    { skip: !selectedUnitId || !courseId }
  );

  // This endpoint returns every question in the selected unit, including each
  // video as a separate question record.
  const { data: unitQuestionsResponse } = useGetQuestionsByUnitIdQuery(
    { unitId: selectedUnitId },
    { skip: !selectedUnitId }
  );

  // 3. Practice Progress Query (Fix: Pass both IDs if API expects them)
  const {
    data: practiceProgressData,
    isFetching: isPracticeLoading,
    isError: isPracticeError,
    refetch: refetchPractice,
  } = useGetPracticeProgressQuery(
    { courseId: courseId!}, 
    { skip: !courseId }
  );
  const unitsData = useMemo(() => {
    const practiceResponse = transformApiResponse(unitsDataRaw);
    const unitQuestions = Array.isArray(unitQuestionsResponse?.data)
      ? unitQuestionsResponse.data
      : Array.isArray(unitQuestionsResponse)
        ? unitQuestionsResponse
        : null;

    if (!unitQuestions) return practiceResponse;

    const groupedQuestions = new Map<number, any[]>();
    unitQuestions.forEach((question: any) => {
      const contentTypeId = Number(question.content?.contentTypeId ?? question.contentTypeId);
      if (!Number.isFinite(contentTypeId)) return;
      const questions = groupedQuestions.get(contentTypeId) ?? [];
      questions.push(question);
      groupedQuestions.set(contentTypeId, questions);
    });

    const existingContentTypes = practiceResponse?.contentTypes ?? [];
    const existingById = new Map(existingContentTypes.map((contentType: any) => [contentType.id, contentType]));
    const contentTypes = Array.from(groupedQuestions.entries()).map(([id, questions]) => {
      const existing: any = existingById.get(id);
      const isVideo = id === 1 || questions.some(
        (question) => question.questiontypecon?.name?.trim().toLowerCase() === "video"
      );
      return {
        ...(existing ?? {}),
        id,
        name: existing?.name ?? (isVideo ? "Video" : "Quiz"),
        icon: existing?.icon ?? "",
        order: existing?.order ?? id,
        questions,
        status: existing?.status ?? { isCompleted: false, totalScore: 0 },
      };
    });

    return {
      ...(practiceResponse ?? {}),
      contentTypes,
      unitStatus: practiceResponse?.unitStatus ?? { isCompleted: false },
    };
  }, [unitsDataRaw, unitQuestionsResponse]);

  // 4. Practice Data Logic (Handling API structure)
  const practiceData = useMemo(() => {
    const rawData = practiceProgressData?.data || practiceProgressData;
    // Agar API array bhej raha hai to selected unit filter karein
    if (Array.isArray(rawData)) {
      return rawData.find((item: any) => item.unitId === selectedUnitId) || {};
    }
    
    return rawData || { isCompleted: false, score: 0 };
  }, [practiceProgressData, selectedUnitId]);

  const unitInfo = {
    id: selectedUnitId,
    name: "Unit Details",
    progress: practiceData?.progress || 0,
    totalQuestions: practiceData?.totalQuestions || 0,
    completedQuestions: practiceData?.completedQuestions || 0,
    score: practiceData?.score || 0,
    isCompleted: !!practiceData?.isCompleted,
  };

  const course = (courseData as any)?.data ?? courseData;
  const hasData = !!courseData;
  const hasUnits = !!course?.chapters?.some(
    (chapter: any) => chapter?.units?.length > 0,
  );

  const selectUnit = useCallback((unitId: string) => {
    setSelectedUnitId(unitId);
  }, []);

  // Auto-select first unit logic
  useEffect(() => {
    if (!selectedUnitId && courseData) {
      const course = (courseData as any)?.data ?? courseData;
      const firstUnitId = course?.chapters?.[0]?.units?.[0]?.id;
      if (firstUnitId) {
        setSelectedUnitId(firstUnitId);
      }
    }
  }, [courseData, selectedUnitId]);

  const practiceStats = useMemo(() => {
  // Check if data exists
  if (!practiceData) {
    return { totalSessions: 0, completedSessions: 0, averageScore: 0, progressPercent: 0 };
  }

  return {
    totalSessions: practiceData?.progress?.totalUnits || 0,
    completedSessions: practiceData?.progress?.completedUnits || 0,
    averageScore: practiceData?.score?.totalScore || 0,
    progressPercent: practiceData?.progress?.percentage || 0,
  };
}, [practiceData]);

  return {
    courseId,
    courseData,
    unitsData,
    unitsError,
    practiceData, 
    unitInfo,
    selectedUnitId,
    selectUnit,
    isLoading: isCourseLoading || isUnitsLoading || isPracticeLoading,
    hasError: isCourseError || isUnitsError || isPracticeError,
    hasData,
    hasUnits,
    isCourseLoading,
    isUnitsLoading,
    isCourseError,
    isUnitsError,
    practiceStats,
    refetchContent,
    refetchPractice,
  };
};
