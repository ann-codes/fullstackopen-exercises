import patients from "../../data/patients.json";

import { Patient } from "../types";

const getPatients = (): Patient[] => {
  //   return patients.map(
  //     ({ id, name, dateOfBirth, gender, occupation }) => ({
  //       id,
  //       name,
  //       dateOfBirth,
  //       gender,
  //       occupation
  //     })
  //   );
  return patients;
};

const addPatient = () => {
  return [];
};

export default {
  getPatients,
  addPatient,
};
