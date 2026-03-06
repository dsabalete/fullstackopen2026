import type { DiaryEntry } from "../types";

const DiaryEntries = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>

      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>

          <div>visibility: {entry.visibility}</div>
          <div>weather: {entry.weather}</div>
          <div>{entry.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
