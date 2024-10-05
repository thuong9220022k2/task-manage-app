import {
    Flex,
    Button,
    Checkbox
} from '@chakra-ui/react';

function Filter() {
    return (
        <Flex>
            <Button>
                <Checkbox>All</Checkbox>
            </Button>
            <Button>
                <Checkbox>Completed</Checkbox>
            </Button>
            <Button>
                <Checkbox>In Completed</Checkbox>
            </Button>
        </Flex>
    )
}

export default Filter;