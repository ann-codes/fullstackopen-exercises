import diagnoses from "../../data/diagnoses.json";

import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnosis = () => {
  return [];
};

export default {
  getDiagnoses,
  addDiagnosis,
};
