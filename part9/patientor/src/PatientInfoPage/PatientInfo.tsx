import React, { Fragment } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Entry } from "../types";
import { Header, Card, Icon, Button } from "semantic-ui-react";

import EntryDetails from "./EntryDetails";
import AddEntryHospModal from "../AddEntryHospModal";
import AddEntryHCheckModal from "../AddEntryHCheckModal";
import AddEntryOHcModal from "../AddEntryOHcModal";

export type NewEntryFromForm = Omit<Entry, "id">;

const PatientInfo: React.FC<{
  patient: Patient;
  diagnosesCodes: Diagnosis[];
}> = ({ patient, diagnosesCodes }) => {
  const [entries, setEntries] = React.useState<Entry[] | undefined>([]);
  const [error, setError] = React.useState<string | undefined>();

  // Hospital
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // Health check
  const [modalHCOpen, setModalHCOpen] = React.useState<boolean>(false);
  const openHCModal = (): void => setModalHCOpen(true);
  const closeHCModal = (): void => {
    setModalHCOpen(false);
    setError(undefined);
  };

  // Occupational
  const [modalOHcOpen, setModalOHcOpen] = React.useState<boolean>(false);
  const openOHcModal = (): void => setModalOHcOpen(true);
  const closeOHcModal = (): void => {
    setModalOHcOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    setEntries(patient?.entries);
  }, []);

  const submitNewEntry = async (values: NewEntryFromForm) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient?.id}/entries`,
        values
      );
      setEntries(entries?.concat(newEntry));
      closeModal();
      closeHCModal();
      closeOHcModal();
    } catch (e) {
      console.error("ERROR ======>", e.response.data);
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

  const mapEntries = entries?.map((e) => {
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
        <AddEntryHCheckModal
          modalOpen={modalHCOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeHCModal}
        />
        <Button
          basic
          icon
          onClick={() => openHCModal()}
          labelPosition="right"
          color="blue"
        >
          New Health Check Entry <Icon name="doctor" />
        </Button>

        <AddEntryHospModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button
          basic
          icon
          onClick={() => openModal()}
          labelPosition="right"
          color="blue"
        >
          New Hospital Entry <Icon name="hospital" />
        </Button>

        <AddEntryOHcModal
          modalOpen={modalOHcOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeOHcModal}
        />
        <Button
          basic
          icon
          onClick={() => openOHcModal()}
          labelPosition="right"
          color="blue"
        >
          New Occupational Health Care Entry <Icon name="stethoscope" />
        </Button>
      </p>

      <div>
        <Card.Group>{mapEntries}</Card.Group>
      </div>
    </Fragment>
  );
};

export default PatientInfo;
