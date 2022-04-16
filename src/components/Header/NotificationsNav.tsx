import { HStack, Icon, Button } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";
import { IoExitOutline } from 'react-icons/io5'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function NotificationsNav() {
    const { signOut } = useContext(AuthContext)

    return (
            <HStack 
                spacing={["6", "8"]}
                mx={["6", "8"]}
                pr={["6", "8"]}
                py="1"
                color="gray.300"
                borderRightWidth={1}
                borderColor="gray.700"
            >
                <Icon  as={RiNotificationLine} fontSize="20" />
                <Button onClick={signOut} variant="link" color="gray.200"><Icon as={IoExitOutline} fontSize="24" /></Button>
            </HStack>
    );
}