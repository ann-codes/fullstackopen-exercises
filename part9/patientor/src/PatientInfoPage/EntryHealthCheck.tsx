import React from "react";

import { HealthCheckEntry } from "../types";
import { Icon } from "semantic-ui-react";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const heart = (rating: number) => {
    const color =
      rating === 0
        ? "green"
        : rating === 1
        ? "yellow"
        : rating === 2
        ? "orange"
        : rating === 3
        ? "red"
        : "black";
    return <Icon name="heartbeat" size="large" color={color} />;
  };

  return <p>Health Rating: {heart(entry.healthCheckRating)}</p>;
};

export default EntryHealthCheck;
