import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    ModalFooter,
    useToast
} from "@chakra-ui/react";

import { useState, useEffect } from 'react';

function TaskModal({ isOpen, onClose, onTaskAdded }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [task_status, setTaskStatus] = useState("in-completed")
    const [date, setDate] = useState("")

    const toast = useToast();

    const addTaskHandler = async () => {
        if (!title || !description || !date) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        } else {
            const newTask = {
                title: title,
                description: description,
                task_status: task_status,
                date: date
            }

            try {
                const res = await fetch("https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTask)
                })
                const data = await res.json()
                console.log(data)
                localStorage.setItem('tasks', JSON.stringify(data))
                onTaskAdded(data)

                setTitle("")
                setDescription("")
                setDate("")
                setTaskStatus("in-completed")
                onClose()
                toast({
                    title: "Task Created",
                    description: "Task has been created successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
            catch (err) {
                console.log(err)
                toast({
                    title: "Error",
                    description: "There was an error creating the task.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }


    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>End Date</FormLabel>
                        <Input
                            name="start-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </FormControl>

                    {/* Task Status  */}

                    <FormControl mt={4}>
                        <FormLabel>Task Status</FormLabel>
                        <Select
                            placeholder="Select Status"
                            value={task_status}
                            onChange={(e) => setTaskStatus(e.target.value)}
                        >
                            <option value="completed">Completed</option>
                            <option value="in-completed">In-Completed</option>
                        </Select>
                    </FormControl>


                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={addTaskHandler} >Create</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}

export default TaskModal;