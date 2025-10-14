import { useState, useCallback, useEffect } from 'react';
import { useGetLessonAndTopicByCourseIdQuery, useGetContentByTopicIdQuery } from '../api/courseProgressApi';
import { useParams } from 'react-router-dom';

export const useCourseProgress = () => {
  const { courseId } = useParams();
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');

  const {
    data: courseData,
    isFetching: isCourseLoading,
    isError: isCourseError,
  } = useGetLessonAndTopicByCourseIdQuery({ id: courseId! }, { skip: !courseId });

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
  };
};
