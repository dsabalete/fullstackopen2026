import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { DiaryEntry } from "./types";

import NewEntryForm from "./components/NewEntryForm";
import DiaryEntries from "./components/DiaryEntries";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  const handleNewEntry = (entry: DiaryEntry) => {
    setDiaryEntries(diaryEntries.concat(entry));
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <NewEntryForm onNewEntry={handleNewEntry} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
