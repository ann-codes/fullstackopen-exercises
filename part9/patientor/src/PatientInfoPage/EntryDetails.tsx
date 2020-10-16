import React from "react";

import { Entry } from "../types";
import EntryHospital from "./EntryHospital";
import EntryOccHealth from "./EntryOccHealth";
import EntryHealthCheck from "./EntryHealthCheck";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (error: never): never => {
    throw new Error(`Unexpected object: ${error}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <EntryHospital key={entry.id} entry={entry} />;
    case "OccupationalHealthcare":
      return <EntryOccHealth key={entry.id} entry={entry} />;
    case "HealthCheck":
      return <EntryHealthCheck key={entry.id} entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
