import React, { Fragment } from "react";

import { OccupationalHealthcareEntry } from "../types";

const EntryOccHealth: React.FC<{ entry: OccupationalHealthcareEntry }> = ({
  entry,
}) => {
  const sickLeaveInfo = entry.sickLeave && (
    <p>
      Leave dates: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
    </p>
  );

  return (
    <Fragment>
      <p>Employer: {entry.employerName}</p>
      {sickLeaveInfo}
    </Fragment>
  );
};

export default EntryOccHealth;
