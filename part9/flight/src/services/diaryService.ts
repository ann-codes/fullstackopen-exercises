// import diaryData from "../../data/entries.json";
import diaries from "../../data/diaryEntries";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

// const diaries: Array<DiaryEntry> = diaryData;
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getNonSensitiveEntries,
  getEntries,
  addEntry,
};
