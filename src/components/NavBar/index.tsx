import { Flex, Image, Stack, Text,Button, Icon } from "@chakra-ui/react";
import { FaDiscord } from 'react-icons/fa'

export function NavBar() {
    function clickScroll(classe: string) {
        const ele = document.querySelector(`.${classe}`);
        ele.scrollIntoView({behavior: "smooth"});
    }
    

    return (
        <Flex
            w="100vw"
            h="8vh"
            bg="gray.900"
            justify="space-between"
            align="center"
            position="fixed"
            pr="6"
            zIndex="10"
        >
            <Image boxSize="50px" src="https://cdn.discordapp.com/attachments/406509331610075167/956943030961721364/Marca_dagua.png" /> 

            <Stack direction="row" gap="14">
                <Text fontSize="20" onClick={() => clickScroll("Sobre")} id="Sobre" borderBottom="1px solid #DD6B20" borderRadius="2px" className="noselect">Sobre</Text>
                <Text fontSize="20" onClick={() => clickScroll("Projetos")} id="Projetos" className="noselect">Projetos</Text>
                <Text fontSize="20" onClick={() => clickScroll("Contato")} id="Contato" className="noselect">Contato</Text>
            </Stack>

            <Button bg="gray.900" rightIcon={<Icon as={FaDiscord} />}>Discord</Button>
        </Flex>
    )
}