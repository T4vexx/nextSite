import { Flex, Text, Image } from "@chakra-ui/react";

export function Footer() {
    return (
        <Flex
            w="100vw"
            h="6vh"
            bg="gray.900"
            justify="space-between"
            align="center"
            pr="6"
            pl="6"
        >
            <Flex><Image boxSize="20px"  src="https://cdn.discordapp.com/attachments/626183783678476289/626563706293059596/Marca_dagua.png" /><Text>Copyright 2021 | Burnshop - Todos os direitos reservados á discord.gg/sf43wneKq2</Text></Flex>
        
            <Text>Email | suporte@burncityrp.com</Text>
        </Flex>
    )
}