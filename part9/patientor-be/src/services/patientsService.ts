import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient, PublicPatient, Entry } from "../types";

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

const addEntry = (entry: Entry, patientId: string): Entry | void => {
  console.log(entry);
  // trying to error handle, WIP

  const foundPatient = getPatientById(patientId);
  if (typeof foundPatient === "object") {
    try {
      //===
      const newEntry = { ...entry, id: uuid() };
      patients.map((patient) => {
        if (patient.id === patientId) {
          patient.entries.push(newEntry);
        }
        return patient;
      });
      return newEntry;
      //===
    } catch (e) {
      throw new Error("SEOMTHEING WENT WRONG");
    }
  }
};

export default {
  getPatientById,
  getPatients,
  addPatient,
  addEntry,
};
