import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);
  const [history, setHistory] = useState([]);

  // Load from localStorage on start
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("saved")) || [];
    const historyData = JSON.parse(localStorage.getItem("history")) || [];

    setSaved(savedData);
    setHistory(historyData);
  }, []);

  // Persist saved
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  // Persist history
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Add to saved
  const addToSaved = (file) => {
    setSaved((prev) => {
      if (prev.includes(file)) return prev;
      return [file, ...prev];
    });
  };

  // Add to history
  const addToHistory = (file) => {
    setHistory((prev) => [file, ...prev]);
  };

  // Remove from saved
  const removeFromSaved = (file) => {
    setSaved((prev) => prev.filter((f) => f !== file));
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        saved,
        history,
        addToSaved,
        addToHistory,
        removeFromSaved,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🎯 Custom hook
export const useApp = () => useContext(AppContext);