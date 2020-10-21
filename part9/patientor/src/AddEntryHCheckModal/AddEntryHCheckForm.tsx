import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../components/FormField";
import { HealthCheckEntry } from "../types";

export type EntryHCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryHCheckFormValues) => void;
  onCancel: () => void;
}

export const AddEntryHCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: -1,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required.";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
          errors.healthCheckRating =
            "Rating must be from 0 for healthy to 3 for critical.";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Today's Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Attending Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Health Rating (0 for Healthy to 3 for Critical)"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryHCheckForm;
