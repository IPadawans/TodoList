import React, { useCallback, useState } from 'react';
import { useDialog } from 'react-st-modal';
import { Container } from './styles';

const NewTaskModal: React.FC = () => {
  const dialog = useDialog();
  const [description, setDescription] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleButtonClick = useCallback(() => {
    const value = {
      description,
      name,
      email,
    };
    dialog.close(value);
  }, [dialog, description, name, email]);

  return (
    <Container>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        rows={10}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <button type="button" onClick={handleButtonClick}>
        Ok
      </button>
    </Container>
  );
};

export default NewTaskModal;
