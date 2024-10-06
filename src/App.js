import {
  Button,
  useDisclosure,
  Stack,
  Flex,
  Box,
  Text
} from '@chakra-ui/react'
import './App.css';

import TaskModal from './components/modal'
import TaskTable from './components/table';
import Filter from './components/filter';

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
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
              <Filter />
            </Box>
          </Flex>
        </Box>
        <Box mt={4}>
          <TaskTable />
        </Box>
        <TaskModal isOpen={isOpen} onClose={onClose} />

      </Box>

    </div>
  );
}

export default App;
