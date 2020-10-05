import express from "express";
import diagnosesSvs from "../services/diagnosesService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnosesSvs.getDiagnoses());
});

diagnosesRouter.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default diagnosesRouter;
