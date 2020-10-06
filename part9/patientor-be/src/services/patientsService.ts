import { v4 as uuid } from "uuid";
import patients from "../../data/patients.json";
import { Patient, NewPatient } from "../types";

// const findPatientById = (id: string): NewPatient | string => {
//   const foundPatient = patients.find((p) => p.id === id);
//   if (foundPatient) {
//     return foundPatient;
//   } else {
//     return `No patient with ID ${id}`;
//   }
// };

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
