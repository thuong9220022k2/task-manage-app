import {
  Button,
  useDisclosure,
  Stack,
  Flex,
  Box,
  Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import './App.css';
import TaskModal from './components/modal'
import TaskTable from './components/table';
import Filter from './components/filter';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [taskStatus, setTaskStatus] = useState("all");

  const handleTaskAdded = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskStatusChange = (status) => {
    setTaskStatus(status);
  };

  useEffect(() => {
    const filterTask = () => {
      if (taskStatus !== "all") {
        const filteredTask = tasks.filter((task) => task.task_status === taskStatus);
        setFilteredTasks(filteredTask);
      } else {
        setFilteredTasks(tasks);
      }
    };

    filterTask();
  }, [taskStatus, tasks]);


  return (
    <div className="App">
      <Box mt={4} w="80%" mx="auto">
        <Box mt={4}>
          <Text as="h1" fontSize="2xl">Task Management</Text>
        </Box>
        <Box mt={4}>
          <Flex justifyContent="" alignItems="center">
            <Box>
              <Button colorScheme="teal" onClick={onOpen}>Add Task</Button>
            </Box>
            <Box ml={4}>
              <Filter onStatusChange={handleTaskStatusChange} />
            </Box>
          </Flex>
        </Box>
        <Box mt={4}>
          <TaskTable tasks={filteredTasks} />
        </Box>
        <TaskModal isOpen={isOpen} onClose={onClose} onTaskAdded={handleTaskAdded} />

      </Box>

    </div>
  );
}

export default App;
