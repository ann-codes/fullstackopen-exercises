import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfoPage from "./PatientInfoPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        // dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Divider hidden />
        <Divider />
        <Divider hidden />
        <Container>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider />
          <Header as="h1" icon textAlign="center">
            <Icon name="universal access" circular color="teal" />
            <Header.Content color="blue">Patientor App</Header.Content>
            <Header.Subheader>
              All your patient information at your fingertips.
            </Header.Subheader>
          </Header>

          <Divider />

          <Switch>
            <Route exact path="/" render={() => <PatientListPage />} />
            <Route exact path="/patients/:id" component={PatientInfoPage} />
          </Switch>
        </Container>
        <Divider hidden />
        <Divider hidden />
        <Divider />
        <Divider hidden />
      </Router>
    </div>
  );
};

export default App;
