import React, { useCallback, useState } from 'react';
import { useDialog } from 'react-st-modal';
import { Container } from './styles';

const ChangeStatusModal: React.FC = () => {
  const dialog = useDialog();
  const [value, setValue] = useState<string>();
  const handleButtonClick = useCallback(() => {
    dialog.close(value);
  }, [dialog, value]);

  return (
    <Container>
      <input
        type="password"
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />

      <button type="button" onClick={handleButtonClick}>
        Ok
      </button>
    </Container>
  );
};

export default ChangeStatusModal;
