import { useState, useCallback, useEffect } from "react";
import {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
} from "../api/courseProgressApi";
import { useParams } from "react-router-dom";
import { transformApiResponse } from "../utils/transformApiResponse";

export const useCourseProgress = () => {
  const params = useParams<{ courseId: string; id?: string }>();
  const courseId = params.courseId || params.id || "";
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  const {
    data: courseData,
    isFetching: isCourseLoading,
    isError: isCourseError,
  } = useGetLessonAndTopicByCourseIdQuery(
    { id: courseId! },
    { skip: !courseId }
  );

  const {
    data: unitsDataRaw,
    isFetching: isUnitsLoading,
    isError: isUnitsError,
    refetch: refetchContent,
  } = useGetContentByTopicIdQuery(
    { unitId: selectedUnitId, courseId: courseId! },
    { skip: !selectedUnitId }
  );

  // Transform API response to extract questions, practice, and unit data
  const transformedData = transformApiResponse(unitsDataRaw);
  const unitsData = transformedData;
  const practiceData = {
    isCompleted: false,
    score: 0,
  };

  const unitInfo = {
    id: "hardcoded-unit-id",
    name: "Hardcoded Unit Name",
    description: "Hardcoded unit description",
    image: "https://via.placeholder.com/400",
    progress: 0,
    totalQuestions: 10,
    completedQuestions: 0,
    score: 0,
    isCompleted: false,
    isStarted: false,
    isFinished: false,
    isSkipped: false,
    isPending: false,
    isError: false,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isFailed: false,
    isCancelled: false,
    isPaused: false,
    isResumed: false,
    isRestarted: false,
  };

  const selectUnit = useCallback((unitId: string) => {
    setSelectedUnitId(unitId);
  }, []);

  // Auto-select first unit when course data loads and no unit is selected yet
  useEffect(() => {
    if (!selectedUnitId && courseData) {
      const course = (courseData as any)?.data ?? courseData;
      const firstUnitId = course?.chapters?.[0]?.units?.[0]?.id;
      if (firstUnitId) {
        setSelectedUnitId(firstUnitId);
      }
    }
  }, [courseData, selectedUnitId]);

  /**
   * Calculate practice stats from the new API structure
   */
  const getPracticeStats = useCallback(() => {
    // Use practice data from API response if available
    if (practiceData) {
      return {
        totalSessions: 1, // Single practice session per unit
        completedSessions: practiceData.isCompleted ? 1 : 0,
        averageScore: practiceData.score || 0,
        progressPercent: practiceData.isCompleted ? 100 : 0,
      };
    }

    // Fallback: calculate from questions if practice data not available
    if (!unitsData || !Array.isArray(unitsData)) {
      return {
        totalSessions: 0,
        completedSessions: 0,
        averageScore: 0,
        progressPercent: 0,
      };
    }

    // If we have transformed questions but no practice data, return empty stats
    return {
      totalSessions: 0,
      completedSessions: 0,
      averageScore: 0,
      progressPercent: 0,
    };
  }, [practiceData, unitsData]);

  const practiceStats = getPracticeStats();

  const isLoading = isCourseLoading || isUnitsLoading;
  const hasError = isCourseError || isUnitsError;
  const hasData = Boolean((courseData as any)?.data ?? courseData);
  const hasUnits = Boolean(unitsData && Array.isArray(unitsData) && unitsData.length > 0);

  return {
    courseId,
    courseData,
    unitsData, // Now returns transformed questions array
    practiceData, // Practice info (isCompleted, score)
    unitInfo, // Unit information
    selectedUnitId,
    selectUnit,
    isLoading,
    hasError,
    hasData,
    hasUnits,
    isCourseLoading,
    isUnitsLoading,
    isCourseError,
    isUnitsError,
    practiceStats,
    refetchContent, // Refetch function for content/practice data
  };
};
