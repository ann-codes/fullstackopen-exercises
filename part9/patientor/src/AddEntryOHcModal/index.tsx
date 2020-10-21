import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryOHcForm, { EntryOHcFormValues } from "./AddEntryOHcModal";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryOHcFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a New Occupational Health Care Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryOHcForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
