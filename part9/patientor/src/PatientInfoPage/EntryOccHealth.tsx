import React, { Fragment } from "react";

import { HospitalEntry } from "../types";

const EntryOccHealth: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  console.log(entry);

  return (
    <Fragment>
      <p>EntryOccHealth</p>
    </Fragment>
  );
};

export default EntryOccHealth;
