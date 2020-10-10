import express from "express";
import patientSvs from "../services/patientsService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientSvs.getPatients());
});

patientRouter.get("/:id", (req, res) => {
  res.send(patientSvs.getPatientById(req.params.id));
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientSvs.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default patientRouter;
