import React, { useEffect, useState, useCallback } from 'react';

import { Alert, CustomDialog } from 'react-st-modal';
import api from '../../services/api';
import { Container } from './styles';
import Task from '../Task';
import NewTaskModal from '../NewTaskModal';

interface ListProps {
  name: string;
  useOutOfTasks?: boolean;
}
interface TaskUserProps {
  name: string;
  email: string;
}
interface TaskProps {
  id: string;
  user: TaskUserProps;
  description: string;
  status: string;
}

interface CreateTaskModalProps {
  name: string;
  email: string;
  description: string;
}

const List: React.FC<ListProps> = ({ name, useOutOfTasks }) => {
  const [tasks, setTasks] = useState([] as TaskProps[]);
  useEffect(() => {
    api
      .get('/tasks', {
        params: {
          status: name,
        },
      })
      .then((response) => {
        setTasks(response.data);
      });
  }, [name]);

  const handleOutOfTasks = useCallback(async () => {
    api
      .post('/outOfTasks', { name: 'Eu', email: 'eu@me.com' })
      .then((response) => {
        const dataOfResponse: TaskProps[] = response.data;
        setTasks([...tasks, ...dataOfResponse]);
      });
  }, [tasks]);

  const handleNewTask = useCallback(async () => {
    const result: CreateTaskModalProps | undefined = await CustomDialog(
      <NewTaskModal />,
      {
        title: 'Fill parameters to create a task',
        showCloseIcon: true,
      },
    );

    if (!result) {
      return;
    }

    if (!result.name || !result.email || !result.description) {
      await Alert('Fill all parameters correctly', 'Error');
      return;
    }

    try {
      const response = await api.post('/tasks', {
        name: result?.name,
        email: result?.email,
        description: result?.description,
      });

      setTasks([...tasks, response.data]);
    } catch (e) {
      await Alert(e.response.data.message, 'Error');
    }
  }, [tasks]);

  return (
    <Container>
      <header>
        <h2>{name}</h2>
        {useOutOfTasks ? (
          <div>
            <button type="button" onClick={handleNewTask}>
              NewTask
            </button>
            <button type="button" onClick={handleOutOfTasks}>
              Out of tasks
            </button>
          </div>
        ) : (
          ''
        )}
      </header>

      <ul>
        {tasks.map((task) => (
          <Task key={task.id} taskInfo={task} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
