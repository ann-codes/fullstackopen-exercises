import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis } from "../types";
import { useStateValue, setDiagnosisList } from "../state";

import PatientInfo from "./PatientInfo";

const PatientInfoPage: React.FC = () => {
  const [, dispatch] = useStateValue();

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
        console.error("ERROR =====>", e.response.data);
      }
    };
    fetchPatientById();
  }, [id]);

  React.useEffect(() => {
    const getDiagnosesCode = async () => {
      try {
        const codes = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`);
        setDiagnosesCodes(codes.data); /// keeping original version, refactor later?
        dispatch(setDiagnosisList(codes.data));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    getDiagnosesCode();
  }, []);

  return (
    <div>
      {patient && diagnosesCodes && (
        <PatientInfo patient={patient} diagnosesCodes={diagnosesCodes} />
      )}
    </div>
  );
};

export default PatientInfoPage;
