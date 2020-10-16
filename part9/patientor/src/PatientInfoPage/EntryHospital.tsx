import React, { Fragment } from "react";

import { HospitalEntry } from "../types";

const EntryHospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  console.log(entry);

  return (
    <Fragment>
      <p>EntryHospital</p>
    </Fragment>
  );
};

export default EntryHospital;
