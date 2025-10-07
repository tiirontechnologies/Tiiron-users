import { useState, useCallback } from 'react';

export const useTabState = (initialTab: number = 0) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  const resetTab = useCallback(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    resetTab,
  };
};
