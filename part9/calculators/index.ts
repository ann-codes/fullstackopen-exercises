import express from "express";
import calculateBmi from "./bmi";

const app = express();

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
    res.json({ error: e });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`[ Server running on port ${PORT} ]`);
});
