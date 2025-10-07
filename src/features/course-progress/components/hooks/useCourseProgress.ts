import { useState, useCallback } from 'react';
import { useGetCourseForStudentQuery } from '../../../course-dashboard/api/courseApi';
import { useGetUnitsWithQuestionsQuery } from '../../../lesson-management/api/chapterApi';
import { useParams } from 'react-router-dom';

export const useCourseProgress = () => {
  const { courseId } = useParams();
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');

  const {
    data: courseData,
    isFetching: isCourseLoading,
    isError: isCourseError,
  } = useGetCourseForStudentQuery({ id: courseId! }, { skip: !courseId });

  const {
    data: unitsData,
    isFetching: isUnitsLoading,
    isError: isUnitsError,
  } = useGetUnitsWithQuestionsQuery(
    { unitId: selectedUnitId },
    { skip: !selectedUnitId }
  );

  const selectUnit = useCallback((unitId: string) => {
    setSelectedUnitId(unitId);
  }, []);

  const isLoading = isCourseLoading || isUnitsLoading;
  const hasError = isCourseError || isUnitsError;
  const hasData = Boolean(courseData?.data);
  const hasUnits = Boolean(unitsData?.data);

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
