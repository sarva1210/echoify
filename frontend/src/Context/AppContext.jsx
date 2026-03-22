import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);
  const [history, setHistory] = useState([]);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem("saved")) || []);
    setHistory(JSON.parse(localStorage.getItem("history")) || []);
    setDownloads(JSON.parse(localStorage.getItem("downloads")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("downloads", JSON.stringify(downloads));
  }, [downloads]);

  const addToSaved = (file) =>
    setSaved((prev) => [file, ...prev]);

  const addToHistory = (file) =>
    setHistory((prev) => [file, ...prev]);

  const addToDownloads = (file) =>
    setDownloads((prev) => [file, ...prev]);

  return (
    <AppContext.Provider
      value={{
        saved,
        history,
        downloads,
        addToSaved,
        addToHistory,
        addToDownloads,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);