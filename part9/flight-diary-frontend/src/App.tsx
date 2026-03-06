import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";

interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
            <th>Comment</th>
          </tr>
          {diaryEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.weather}</td>
              <td>{entry.visibility}</td>
              <td>{entry.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
