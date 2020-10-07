/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions*/

import { NewPatient, Gender } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringType = (element: any, typeName: string): string => {
  if (!element || !isString(element)) {
    throw new Error(`Incorrect or missing ${typeName}: ${element}`);
  }
  return element;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseStringType(object.name, "name"),
    dateOfBirth: parseStringType(object.dateOfBirth, "DOB"),
    ssn: parseStringType(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseStringType(object.occupation, "occupation"),
  };
};

export default toNewPatient;
