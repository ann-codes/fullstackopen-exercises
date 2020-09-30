import express from "express";
import calculateBmi from "./bmi";
import calculateExercises from "./exercise";

const app = express();

app.use(express.json()); // don't forget me!

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  try {
    const bmi = calculateBmi(height, weight);
    const payload = { height, weight, bmi };
    res.json(payload);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: e });
  }
});

app.post("/exercise", (req, res) => {
  const body = req.body;
  if (!body.daily_exercises || !body.target) {
    res.status(400).json({ error: "parameters missing" });
  }

  try {
    return res.json(calculateExercises(body.daily_exercises, body.target));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`[ Server running on port ${PORT} ]`);
});
