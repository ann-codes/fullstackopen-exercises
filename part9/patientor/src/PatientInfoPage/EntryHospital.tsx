import React from "react";

import { HospitalEntry } from "../types";

const EntryHospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const discharge = entry?.discharge;

  return (
    <p>
      Discharge Date: {discharge.date} - {discharge.criteria}
    </p>
  );
};

export default EntryHospital;
