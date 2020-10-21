import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryHCheckForm, { EntryHCheckFormValues } from "./AddEntryHCheckForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryHCheckFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a New Health Check Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryHCheckForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
