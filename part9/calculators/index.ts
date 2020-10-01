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
    res.status(400).json({ error: "parameters missing"});
  }
  try {
    const bmi = calculateBmi(height, weight);
    const payload = { height, weight, bmi };
    res.json(payload);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: e.message  });
  }
});

interface exerciseInput {
  daily_exercises: Array<number>;
  target: number;
}

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: exerciseInput = req.body;
  const exercise: Array<number> = body.daily_exercises;
  const target: number = body.target;

  if (!exercise || !target) {
    res.status(400).json({ error: "parameters missing" });
  }

  try {
    return res.json(calculateExercises(exercise, target));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(400).json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`[ Server running on port ${PORT} ]`);
});
