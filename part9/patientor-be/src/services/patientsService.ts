import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";

const getPatientById = (id: string): Patient | string => {
  const foundPatient = patients.find((p) => p.id === id);
  if (foundPatient) {
    return foundPatient;
  } else {
    return `No patient with ID ${id}`;
  }
};

const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientById,
  getPatients,
  addPatient,
};
