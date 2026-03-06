import { useState } from "react";
import diaryService from "../services/diaryService";
import type { DiaryEntry } from "../types";

interface NewEntryFormProps {
  onNewEntry: (entry: DiaryEntry) => void;
}

const NewEntryForm = ({ onNewEntry }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("sunny");
  const [visibility, setVisibility] = useState("great");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      date,
      weather,
      visibility,
      comment,
    };
    diaryService.createDiaryEntry(data).then((response) => {
      onNewEntry(response);
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Weather:
            <select
              id="weather"
              name="weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            >
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rainy">Rainy</option>
              <option value="windy">Windy</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Visibility:
            <select
              id="visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="great">Great</option>
              <option value="good">Good</option>
              <option value="ok">Ok</option>
              <option value="poor">Poor</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Comment:
            <input
              type="text"
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
