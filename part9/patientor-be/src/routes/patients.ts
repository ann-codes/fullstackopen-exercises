import express from "express";
import patientSvs from "../services/patientsService";
import toNewPatient from "../utils";
import { Patient } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientSvs.getPatients());
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientSvs.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send(`Patient ID ${req.params.id} not found`);
  }
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body) as Patient;
    const addedEntry = patientSvs.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default patientRouter;
