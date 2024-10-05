import {
  Button,
  useDisclosure,
  Stack,
  Flex,
  Box
} from '@chakra-ui/react'
import './App.css';

import TaskModal from './components/modal'
import TaskTable from './components/table';
import Filter from './components/filter';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div className="App">
      <Box mt={4}>
        <Flex>
          <Box w="50%">
            <Button colorScheme="teal" onClick={onOpen}>Add Task</Button>
          </Box>
          <Box w="50%">
            <Filter />
          </Box>
        </Flex>
        <TaskModal isOpen={isOpen} onClose={onClose} />
        <TaskTable />

      </Box>

    </div>
  );
}

export default App;
