import { useState } from "react";
import diaryService from "../services/diaryService";
import { type DiaryEntry, Weather, Visibility } from "../types";
import axios from "axios";

interface NewEntryFormProps {
  onNewEntry: (entry: DiaryEntry) => void;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const NewEntryForm = ({ onNewEntry }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date || !weather || !visibility) {
      setError("Error: date, weather, or visibility missing");
      return;
    }

    const data = {
      date,
      weather,
      visibility,
      comment,
    };

    diaryService
      .createDiaryEntry(data)
      .then((response) => {
        onNewEntry(response);
        setError(null);
        resetForm();
      })
      .catch((error: unknown) => {
        if (
          axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
        ) {
          console.log(error.status);
          console.error(error.response);
          setError(
            error.response?.data?.message ||
              "An error occurred while adding the entry.",
          );
        } else {
          console.error(error);
          setError("An unknown error occurred." + JSON.stringify(error));
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

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
          <span>Weather:</span>
          {Object.values(Weather).map((v) => (
            <div key={v} style={{ paddingLeft: "1em" }}>
              <label>
                <input
                  type="radio"
                  name="weather"
                  value={v}
                  checked={weather === v}
                  onChange={() => setWeather(v)}
                />
                {v}
              </label>
            </div>
          ))}
        </div>
        <div>
          <span>Visibility:</span>
          {Object.values(Visibility).map((v) => (
            <div key={v} style={{ paddingLeft: "1em " }}>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value={v}
                  checked={visibility === v}
                  onChange={() => setVisibility(v)}
                />
                {v}
              </label>
            </div>
          ))}
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
