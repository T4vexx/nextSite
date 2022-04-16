import { Flex, Text, Button } from '@chakra-ui/react'
import Head from 'next/head';
import Countdown from 'react-countdown';
import Typed from "react-typed";


export default function City() {
    const Completionist = () => <span>Cidade já esta pronta</span>;


    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{days}:{hours}:{minutes}:{seconds}</span>;
        }
    };

    return (
        <>
            <Head>
                <title>NextCity | Coming soon...</title>
            </Head>

            <Flex 
                w="100vw" 
                h="100vh" 
                bgImage="url('https://cdn.discordapp.com/attachments/593999593386278912/964923557517877278/GTA-5-Backgrounds-Pictures.jpg')"
                bgRepeat="no-repeat"
                filter="grayscale(100%)"
                bgSize="1920px 1080px"
                align="center" 
                justify="center"
                direction="column"
            >   

                    <Button colorScheme="white" _hover={{ borderBottom: "0px"}} variant="link" fontSize="200px" fontFamily="Chakra Petch">  
                        <Countdown
                            date={Date.now() + 60*60*60*24*50}
                            renderer={renderer}
                        />
                    </Button>
                
                <Text fontSize="20px">
                    <Typed
                        strings={["🟢 Em breve nextcity estará no ar 📢", "💻 Melhores scripts para imersão 👨🏽‍💻", "✈️ Venha nessa jornada conosco 🎮"]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </Text>
            </Flex>
        </>
    )
}

