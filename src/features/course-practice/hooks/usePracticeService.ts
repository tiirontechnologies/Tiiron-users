import { useState, useCallback, useEffect, useRef } from "react";
import {
  useSubmitPracticeBulkMutation, // ✨ NEW
  useSavePracticeSessionMutation,
  useSavePracticeProgressMutation,
  useStartPracticeSessionMutation,
  useGetPracticeHistoryQuery,
  useGetPracticeAnalyticsQuery,
} from "../api/practiceApi";
import { PracticeSessionData } from "../api/practiceApi";

interface UsePracticeServiceProps {
  courseId: string;
  unitId: string;
  questions: unknown[];
}

interface PracticeServiceState {
  sessionId: string | null;
  isAutoSaving: boolean;
  lastSavedAt: Date | null;
  hasUnsavedChanges: boolean;
}

// Development mode flag - set to false when backend is ready
const USE_DEV_MODE = true;

export const usePracticeService = ({
  courseId,
  unitId,
  questions,
}: UsePracticeServiceProps) => {
  // API mutations
  const [submitPracticeBulk] = useSubmitPracticeBulkMutation();
  const [savePracticeSession] = useSavePracticeSessionMutation();
  const [savePracticeProgress] = useSavePracticeProgressMutation();
  const [startPracticeSession] = useStartPracticeSessionMutation();

  // Queries
  const { data: practiceHistory, refetch: refetchHistory } =
    useGetPracticeHistoryQuery(
      { courseId, unitId },
      { skip: USE_DEV_MODE } // Skip API call in mock mode
    );
  const { data: practiceAnalytics, refetch: refetchAnalytics } =
    useGetPracticeAnalyticsQuery(
      { courseId, unitId },
      { skip: USE_DEV_MODE } // Skip API call in mock mode
    );

  // Local state
  const [serviceState, setServiceState] = useState<PracticeServiceState>({
    sessionId: null,
    isAutoSaving: false,
    lastSavedAt: null,
    hasUnsavedChanges: false,
  });

  // Auto-save interval ref
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start a new practice session
  const startSession = useCallback(async () => {
    if (USE_DEV_MODE) {
      // Mock implementation
      const mockSessionId = `mock-session-${Date.now()}`;
      setServiceState((prev) => ({
        ...prev,
        sessionId: mockSessionId,
        hasUnsavedChanges: false,
      }));
      console.log("🧪 Mock: Practice session started:", mockSessionId);
      return mockSessionId;
    }

    try {
      const result = await startPracticeSession({
        courseId,
        unitId,
      }).unwrap();

      setServiceState((prev) => ({
        ...prev,
        sessionId: result.sessionId,
        hasUnsavedChanges: false,
      }));

      console.log("✅ Practice session started:", result.sessionId);
      return result.sessionId;
    } catch (error) {
      console.error("❌ Failed to start practice session:", error);
      // Fallback to mock mode
      const mockSessionId = `fallback-session-${Date.now()}`;
      setServiceState((prev) => ({
        ...prev,
        sessionId: mockSessionId,
        hasUnsavedChanges: false,
      }));
      console.log("⚠️ Using fallback session ID:", mockSessionId);
      return mockSessionId;
    }
  }, [courseId, unitId, startPracticeSession]);

  // Save practice progress (auto-save)
  const saveProgress = useCallback(
    async (data: {
      currentQuestionIndex: number;
      userAnswers: Record<string, string | string[]>;
      timeSpent: number;
    }) => {
      if (!serviceState.sessionId) return;

      if (USE_DEV_MODE) {
        // Mock implementation
        console.log("🧪 Mock: Practice progress saved", data);
        setServiceState((prev) => ({
          ...prev,
          lastSavedAt: new Date(),
          hasUnsavedChanges: false,
        }));
        return;
      }

      try {
        setServiceState((prev) => ({ ...prev, isAutoSaving: true }));

        await savePracticeProgress({
          sessionId: serviceState.sessionId,
          courseId,
          unitId,
          ...data,
        }).unwrap();

        setServiceState((prev) => ({
          ...prev,
          lastSavedAt: new Date(),
          hasUnsavedChanges: false,
          isAutoSaving: false,
        }));

        console.log("💾 Practice progress saved");
      } catch (error) {
        console.error("❌ Failed to save practice progress:", error);
        setServiceState((prev) => ({ ...prev, isAutoSaving: false }));
      }
    },
    [serviceState.sessionId, courseId, unitId, savePracticeProgress]
  );

  // ✨ Submit final practice session (using bulk submit endpoint)
  const submitSession = useCallback(
    async (sessionData: PracticeSessionData, score: number) => {
      if (USE_DEV_MODE) {
        // Mock implementation
        console.log("🧪 Mock: Practice session submitted", {
          sessionData,
          score,
        });
        setServiceState((prev) => ({
          ...prev,
          hasUnsavedChanges: false,
          lastSavedAt: new Date(),
        }));
        return { success: true, sessionId: "mock-session-id" };
      }

      try {
        // Use bulk submit endpoint (matches your backend format)
        const result = await submitPracticeBulk(sessionData).unwrap();

        // Clear auto-save interval
        if (autoSaveIntervalRef.current) {
          clearInterval(autoSaveIntervalRef.current);
          autoSaveIntervalRef.current = null;
        }

        // Refresh analytics and history
        refetchHistory();
        refetchAnalytics();

        setServiceState((prev) => ({
          ...prev,
          hasUnsavedChanges: false,
          lastSavedAt: new Date(),
        }));

        console.log("🎉 Practice session submitted successfully");
        console.log("📊 Practice Data:", JSON.stringify(sessionData, null, 2));

        return result;
      } catch (error) {
        console.error("❌ Failed to submit practice session:", error);
        // Still log the data for debugging
        console.log(
          "📊 Practice Data (failed to submit):",
          JSON.stringify(sessionData, null, 2)
        );
        throw error;
      }
    },
    [submitPracticeBulk, refetchHistory, refetchAnalytics]
  );

  // Start auto-save interval
  const startAutoSave = useCallback(
    (
      getCurrentData: () => {
        currentQuestionIndex: number;
        userAnswers: Record<string, string | string[]>;
        timeSpent: number;
      }
    ) => {
      // Clear existing interval
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }

      // Start new interval (save every 30 seconds)
      autoSaveIntervalRef.current = setInterval(() => {
        const currentData = getCurrentData();
        saveProgress(currentData);
      }, 30000);

      console.log("🔄 Auto-save started (every 30 seconds)");
    },
    [saveProgress]
  );

  // Stop auto-save
  const stopAutoSave = useCallback(() => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
      autoSaveIntervalRef.current = null;
      console.log("⏹️ Auto-save stopped");
    }
  }, []);

  // Mark changes as unsaved
  const markAsChanged = useCallback(() => {
    setServiceState((prev) => ({ ...prev, hasUnsavedChanges: true }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, []);

  return {
    // State
    sessionId: serviceState.sessionId,
    isAutoSaving: serviceState.isAutoSaving,
    lastSavedAt: serviceState.lastSavedAt,
    hasUnsavedChanges: serviceState.hasUnsavedChanges,

    // Data
    practiceHistory: practiceHistory?.sessions || [],
    practiceAnalytics: practiceAnalytics || null,

    // Actions
    startSession,
    saveProgress,
    submitSession,
    startAutoSave,
    stopAutoSave,
    markAsChanged,

    // Utilities
    refetchHistory,
    refetchAnalytics,
  };
};
