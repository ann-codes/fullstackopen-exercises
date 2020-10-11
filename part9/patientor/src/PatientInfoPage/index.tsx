/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from "react";
import axios from "axios";

import { Header, Icon, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = React.useState<Patient>();

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
    </Fragment>
  );
};

export default PatientInfoPage;
