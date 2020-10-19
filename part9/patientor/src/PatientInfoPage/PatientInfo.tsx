import React, { Fragment } from "react";
import axios from "axios";

import { Patient, Diagnosis } from "../types";
import { Header, Card, Icon, Button } from "semantic-ui-react";

import { Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientInfo: React.FC<{
  patient: Patient;
  diagnosesCodes: Diagnosis[];
}> = ({ patient, diagnosesCodes }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      ///////// Does not yet work
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients`,
        values
      );

      console.log(newEntry);
      ////// dispatch goes here
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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

      <p>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>
          Add New Entry for {patient?.name}
        </Button>
      </p>

      <div>
        <Card.Group>{mapEntries}</Card.Group>
      </div>
    </Fragment>
  );
};

export default PatientInfo;
