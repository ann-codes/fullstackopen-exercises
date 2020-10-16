import React, { Fragment } from "react";

import { HealthCheckEntry } from "../types";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  console.log(entry);

  return (
    <Fragment>
      <p>EntryHealthCheck</p>
    </Fragment>
  );
};

export default EntryHealthCheck;
