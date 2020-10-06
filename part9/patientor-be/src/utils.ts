/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NewPatient } from "./types";

// const isString = (text: any): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

const toNewPatient = (object: any): NewPatient => {
  console.log(object); ////
  return {
    name: "test!",
    dateOfBirth: "",
    ssn: "",
    gender: "",
    occupation: "",
  };
};

export default toNewPatient;
