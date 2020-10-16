import React from "react";

import { Entry } from "../types";
import EntryHospital from "./EntryHospital";
import EntryOccHealth from "./EntryOccHealth";
import EntryHealthCheck from "./EntryHealthCheck";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (error: never): never => {
    throw new Error("Unexpected object: " + error);
  };

  switch (entry.type) {
    case "Hospital":
      return <EntryHospital entry={entry} />;
    case "OccupationalHealthcare":
      return <EntryHealthCheck entry={entry} />;
    case "HealthCheck":
      return <EntryOccHealth entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
