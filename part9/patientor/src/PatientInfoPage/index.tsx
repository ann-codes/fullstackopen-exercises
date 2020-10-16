/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from "react";
import axios from "axios";

import { Header, Icon, Card } from "semantic-ui-react";
import { useStateValue } from "../state";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis } from "../types";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = React.useState<Patient>();
  const [diagnosesCodes, setDiagnosesCodes] = React.useState<Diagnosis[]>();

  React.useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const patientInfo = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientInfo.data);
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatientById();
  }, [id]);

  React.useEffect(() => {
    const getDiagnosesCode = async () => {
      try {
        const codes = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`);
        setDiagnosesCodes(codes.data);
      } catch (e) {
        console.error(e.response.data);
      }
    };
    getDiagnosesCode();
  }, []);

  const getDiagnosisDescription = (code: string): string => {
    if (diagnosesCodes) {
      const found = diagnosesCodes?.find((c) => c.code === code);
      if (found?.name) {
        return found.name;
      }
    }
    return "not found";
  };

  const mapEntries = patient?.entries?.map((e) => (
    <Card
      fluid
      key={e.id}
      color="blue"
      header={e.date}
      meta={e.description}
      description={
        <ul>
          {e.diagnosisCodes?.map((c) => (
            <li key={c}>
              {c} - {getDiagnosisDescription(c)}
            </li>
          ))}
        </ul>
      }
    />
  ));

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
      <div>{mapEntries}</div>
    </Fragment>
  );
};

export default PatientInfoPage;
