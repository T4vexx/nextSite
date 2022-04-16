import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { api } from "../../services/apiClient";

interface ProfileProps {
    showProfileData?: boolean;
    usuario?: {
        name: string;
        email: string;
    } 
}

export function Profile({showProfileData, usuario}: ProfileProps) {

    
    return (
        <Flex align="center">
           { showProfileData && ( 
                <Box mr="4" textAlign="right">
                    <Text>{usuario.name}</Text>
                    <Text color="gray.300" fontSize="small">{usuario.email}</Text>
                </Box>
            )}

            <Avatar size="md" name={usuario.name} />
        </Flex>
    );
}