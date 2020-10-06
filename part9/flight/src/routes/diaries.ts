/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  // const { date, weather, visibility, comment } = req.body;
  // const newDiaryEntry = diaryService.addDiaryEntry({
  //   date,
  //   weather,
  //   visibility,
  //   comment,
  // });
  // res.json(newDiaryEntry);

  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiaryEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;