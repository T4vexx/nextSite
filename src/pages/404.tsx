import { Box, Icon,Text } from "@chakra-ui/react";
import { RiErrorWarningLine } from "react-icons/ri";

export default function Custom404() {
    return (
        <>
            <Box mt="25vh" ml="15vw">
                <Text fontWeight="bold" fontSize='5xl'>404 Not Found <Icon as={RiErrorWarningLine} /></Text>
            </Box>
        </>
    )
}