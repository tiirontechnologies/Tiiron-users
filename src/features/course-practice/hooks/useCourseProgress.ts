import { useState, useCallback, useEffect, useMemo } from "react";
import {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
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
    refetch: refetchContent,
  } = useGetContentByTopicIdQuery(
    { unitId: selectedUnitId, courseId: courseId! },
    { skip: !selectedUnitId || !courseId }
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
  const unitsData = useMemo(() => transformApiResponse(unitsDataRaw), [unitsDataRaw]);

  // 4. Practice Data Logic (Handling API structure)
  const practiceData = useMemo(() => {
    const rawData = practiceProgressData?.data || practiceProgressData;
    // Agar API array bhej raha hai to selected unit filter karein
    if (Array.isArray(rawData)) {
      return rawData.find((item: any) => item.unitId === selectedUnitId) || {};
    }
    
    return rawData || { isCompleted: false, score: 0 };
  }, [practiceProgressData, selectedUnitId]);

  // console.log("practiceData2",practiceData)

  const unitInfo = {
    id: selectedUnitId,
    name: "Unit Details",
    progress: practiceData?.progress || 0,
    totalQuestions: practiceData?.totalQuestions || 0,
    completedQuestions: practiceData?.completedQuestions || 0,
    score: practiceData?.score || 0,
    isCompleted: !!practiceData?.isCompleted,
  };

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
    practiceData, 
    unitInfo,
    selectedUnitId,
    selectUnit,
    isLoading: isCourseLoading || isUnitsLoading || isPracticeLoading,
    hasError: isCourseError || isUnitsError || isPracticeError,
    practiceStats,
    refetchContent,
    refetchPractice,
  };
};