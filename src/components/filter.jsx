import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react';

function Filter() {
    const [taskStatus, setTaskStatus] = useState("all")

    const taskStatusHandler = (value) => {
        setTaskStatus(value)
        localStorage.setItem("task-status", JSON.stringify(value))
    }

    return (
        <RadioGroup onChange={taskStatusHandler} value={taskStatus} >
            <Stack direction='row'>
                <Radio value='all'>All</Radio>
                <Radio value='completed'>Completed</Radio>
                <Radio value='in-completed'>In-Completed</Radio>
            </Stack>
        </RadioGroup>
    )
}

export default Filter;