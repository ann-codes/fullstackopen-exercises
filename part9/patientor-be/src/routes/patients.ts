import express from "express";
import patientSvs from "../services/patientsService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientSvs.getPatients());
});

export default patientRouter;
