import React from 'react';
import {
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Checkbox,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';

function TaskTable() {
    const [task, setTask] = useState([])
    const [taskStatus, setTaskStatus] = useState("all")

    useEffect(() => {
        const getTask = async () => {
            if (localStorage.getItem('tasks')) {
                setTask(JSON.parse(localStorage.getItem('tasks')))
            }
            try {
                const res = await fetch("https://6491d0272f2c7ee6c2c8f42f.mockapi.io/tasks", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
                console.log("data", data)
                setTask(data)
                localStorage.setItem('tasks', JSON.stringify(data));
                console.log("task", task)

            }
            catch (e) {
                console.log(e);
            }
        }
        const getTaskStatus = async () => {
            const taskStatus = localStorage.getItem('task-status')
            if (taskStatus) {
                setTaskStatus(JSON.parse(taskStatus))
            }
        }
        getTask()
        getTaskStatus()

    }, [])

    useEffect(() => {
        const filterTask = () => {
            if (taskStatus !== "all") {
                const filteredTask = task.filter(task => task.task_status === taskStatus);
                setTask(filteredTask);
            } else {
                setTask(JSON.parse(localStorage.getItem('tasks')));
            }
        };

        filterTask();
    }, [taskStatus, task]);
    return (
        <TableContainer justify="center" mx="auto">
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Date</Th>
                        <Th>Task Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        task?.map(task => (
                            <Tr key={task.id}>
                                <Th>{task.id}</Th>
                                <Th>{task.title}</Th>
                                <Th>{task.description}</Th>
                                <Th>{task.date}</Th>
                                <Th justify="center">
                                    <Checkbox isDisabled defaultChecked={task.task_status === 'completed'} />
                                </Th>
                            </Tr>
                        ))
                    }


                </Tbody>
            </Table>
        </TableContainer>

    )

}

export default TaskTable