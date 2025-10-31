import { useState, useCallback, useEffect } from "react";
import {
  useGetLessonAndTopicByCourseIdQuery,
  useGetContentByTopicIdQuery,
} from "../api/courseProgressApi";
import { useParams } from "react-router-dom";

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
    data: unitsData,
    isFetching: isUnitsLoading,
    isError: isUnitsError,
  } = useGetContentByTopicIdQuery(
    { unitId: selectedUnitId },
    { skip: !selectedUnitId }
  );

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
   * @param
   */
  const getPracticeStats = (data: any) => {
    const unitContent = (data as any)?.data ?? data;
    if (!unitContent || !Array.isArray(unitContent)) {
      return {
        totoalQuestions: 0,
        attemptedQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
      };
    }

    const allPractices: any[] = [];
    unitContent.forEach((unit: any) => {
      if (unit.practices && Array.isArray(unit.practices)) {
        allPractices.push(...unit.practices);
      }
    });

    const totalPractices = allPractices.length;
    const completedPractice = allPractices.filter(
      (p) => p.score !== null && p.score !== undefined
    ).length;
    const totalScore = allPractices.reduce((sum, p) => sum + (p.score || 0), 0);
    const averageScore =
      completedPractice > 0 ? Math.round(totalScore / completedPractice) : 0;

    return {
      totalSessions: totalPractices,
      completedSessions: completedPractice,
      averageScore: averageScore,
      progressPercent:
        totalPractices > 0
          ? Math.round((completedPractice / totalPractices) * 100)
          : 0,
    };
  };

  const practiceStats = getPracticeStats(unitsData);

  const isLoading = isCourseLoading || isUnitsLoading;
  const hasError = isCourseError || isUnitsError;
  const hasData = Boolean((courseData as any)?.data ?? courseData);
  const hasUnits = Boolean((unitsData as any)?.data ?? unitsData);

  return {
    courseId,
    courseData,
    unitsData,
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
  };
};
