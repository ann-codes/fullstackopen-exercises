import React, { Fragment } from "react";

import { Patient, Diagnosis } from "../types";
import { Header, Card, Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

const PatientInfo: React.FC<{
  patient: Patient;
  diagnosesCodes: Diagnosis[];
}> = ({ patient, diagnosesCodes }) => {
  const getDiagnosisDescription = (code: string): string => {
    if (diagnosesCodes) {
      const found = diagnosesCodes?.find((c) => c.code === code);
      if (found?.name) {
        return found.name;
      }
    }
    return "not found";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Hospital":
        return <Icon name="hospital" size="large" />;
      case "OccupationalHealthcare":
        return <Icon name="stethoscope" size="large" />;
      case "HealthCheck":
        return <Icon name="doctor" size="large" />;
      default:
        return <Icon name="question" size="large" />;
    }
  };

  const mapEntries = patient?.entries?.map((e) => {
    return (
      <Card fluid key={e.id} color="blue">
        <Card.Content>
          <Card.Header>
            {e.date} {getTypeIcon(e.type)}
          </Card.Header>
          <Card.Meta>{e.description}</Card.Meta>
          <Card.Description>
            <ul>
              {e.diagnosisCodes?.map((c) => (
                <li key={c}>
                  {c} - {getDiagnosisDescription(c)}
                </li>
              ))}
            </ul>
            <EntryDetails entry={e} />
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });

  const gender =
    patient?.gender === "female" ? (
      <Icon name="venus" />
    ) : patient?.gender === "male" ? (
      <Icon name="mars" />
    ) : (
      <Icon name="genderless" />
    );

  return (
    <Fragment>
      <Header as="h2">
        {patient?.name}
        {gender}
      </Header>
      <p>
        <strong>SSN: </strong>
        {patient?.ssn}
      </p>
      <p>
        <strong>Occupation: </strong>
        {patient?.occupation}
      </p>
      <Header as="h3">Entries</Header>
      <div>
        <Card.Group>{mapEntries}</Card.Group>
      </div>
    </Fragment>
  );
};

export default PatientInfo;
