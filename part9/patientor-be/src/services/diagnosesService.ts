import diagnoses from "../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addDiagnosis = () => {
  return [];
};

export default {
  getDiagnoses,
  addDiagnosis,
};
