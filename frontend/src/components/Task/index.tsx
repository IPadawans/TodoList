import React, { useCallback } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Alert, CustomDialog } from 'react-st-modal';
import api from '../../services/api';
import ChangeStatusModal from '../ChangeStatusModal';

import { Container } from './styles';

interface TaskUserInfo {
  name: string;
  email: string;
}
interface TaskInfo {
  id: string;
  user: TaskUserInfo;
  description: string;
  status: string;
}

interface TaskProps {
  taskInfo: TaskInfo;
}

const Task: React.FC<TaskProps> = ({ taskInfo }) => {
  const handlePressButton = useCallback(async () => {
    if (taskInfo.status === 'TODO') {
      await api.put(`/tasks/${taskInfo.id}`, {
        status: 'CONCLUDED',
      });
      window.location.reload();
    } else {
      const result = await CustomDialog(<ChangeStatusModal />, {
        title: 'Inform supervisor password',
        showCloseIcon: true,
      });

      if (!result) {
        await Alert('Password is required to conclude this operation', 'Error');
        return;
      }
      try {
        await api.put(`/tasks/${taskInfo.id}`, {
          status: 'TODO',
          password: result,
        });
        window.location.reload();
      } catch (e) {
        await Alert(e.response.data.message, 'Error');
      }
    }
  }, [taskInfo.id, taskInfo.status]);

  return (
    <Container>
      <div id="userInfo">
        <p>Name: {taskInfo.user.name}</p>
        <p>E-mail: {taskInfo.user.email}</p>
      </div>

      <div id="taskDescription">
        <strong>Task description</strong>
        <p>{taskInfo.description}</p>
      </div>

      <button type="button" onClick={handlePressButton}>
        {taskInfo.status === 'TODO' ? (
          <div>
            <p>Send to CONCLUDED </p>
            <MdKeyboardArrowRight size={15} />
          </div>
        ) : (
          <div>
            <p>Send to TODO</p>
            <MdKeyboardArrowLeft size={15} />
          </div>
        )}
      </button>
    </Container>
  );
};

export default Task;
