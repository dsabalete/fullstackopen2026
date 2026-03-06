import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = async () => {
    const { data } = await axios.get<DiaryEntry[]>(baseUrl);

    return data;
};

const createDiaryEntry = async (object: NewDiaryEntry) => {
    const { data } = await axios.post<DiaryEntry>(baseUrl, object);

    return data;
};

export default {
    getAllDiaries, createDiaryEntry
}
