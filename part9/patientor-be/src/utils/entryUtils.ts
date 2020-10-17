/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions*/

import { BaseEntry } from "../types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseStringType = (element: any, typeName: string): string => {
  if (!element || !isString(element)) {
    throw new Error(`Incorrect or missing ${typeName}: ${element}`);
  }
  return element;
};

const parseDiagnosisCodes = (codes: Array<string>) => {
  return codes;
};

const parseHealthCheckRating = (rating: number) => {
  if (rating >= 0 && rating <= 3) {
    return rating;
  } else {
    throw new Error("Rating must be numerical between 0-3");
  }
};

const parseDischarge = (discharge: { date: string; criteria: string }) => {
  if (isString(discharge.date) && isString(discharge.criteria)) {
    return discharge;
  } else {
    throw new Error(`Incorrect or missing ${discharge}`);
  }
};

const parseSickLeave = (dates: any) => {
  if (!isDate(dates.startDate) || !isDate(dates.endDate)) {
    throw new Error(`Incorrect or missing ${dates}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return dates;
};

const parseBaseEntry = (object: any): Omit<BaseEntry, "id"> => {
  const newEntry = {
    description: parseStringType(object.description, "description"),
    date: parseStringType(object.date, "date"),
    specialist: parseStringType(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  return newEntry;
};

const toNewEntry = (object: any) => {
  switch (object.type) {
    case "HealthCheck":
      return {
        ...parseBaseEntry(object),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "Hospital":
      return {
        ...parseBaseEntry(object),
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...parseBaseEntry(object),
        type: "OccupationalHealthcare",
        employerName: parseStringType(object.employerName, "employerName"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      throw new Error(`Wrong or missing entry: ${object}`);
  }
};

export default toNewEntry;
