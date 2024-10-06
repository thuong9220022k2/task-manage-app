import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react';

function Filter({ onStatusChange }) {
    const [selectedStatus, setSelectedStatus] = useState("all")

    const handleTaskStatus = (newStatus) => {
        setSelectedStatus(newStatus)
        onStatusChange(newStatus)
    }

    return (
        <RadioGroup onChange={handleTaskStatus} value={selectedStatus} >
            <Stack direction='row'>
                <Radio value='all'>All</Radio>
                <Radio value='completed'>Completed</Radio>
                <Radio value='in-completed'>In-Completed</Radio>
            </Stack>
        </RadioGroup>
    )
}

export default Filter;