import { Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { SiNextdotjs, SiGmail, SiTwitter, SiInstagram, SiYoutube, SiDiscord } from "react-icons/si";
import { animated } from 'react-spring';

import { Transition1, Transition2, Transition3 } from '../utils/transicoes'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/home.module.scss'
import Link from 'next/link';
import Head from 'next/head';

const Home: NextPage = () => {
    const [ isvisible, setIsvisible ] = useState(false);
    const [ isvisibleContato, setIsvisibleContato ] = useState(false);

    const transition = Transition1(isvisible)
    const transition2 = Transition2(isvisible)
    const transition3 = Transition3(isvisibleContato)

    const hanldeScrollEvent = (event) => {
        if (window.scrollY >= 800) {
            setIsvisible(true)
        }
        if (window.scrollY >= 1200) {
            setIsvisibleContato(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', hanldeScrollEvent);

        return () => {
            window.removeEventListener('scroll', hanldeScrollEvent);
        };
    }, [])
    

    return (
        <>
            <Head>
                <title>NextHub | Home</title>
            </Head>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />

            <Flex 
                w="1920px" 
                h="880px" 
                justify="center"
                align="center"
                bgImage="url('https://cdn.discordapp.com/attachments/414442898172411910/964758784117461034/IMAGEM-DIVIDIDA_01.png')"
                bgRepeat="no-repeat" 
                bgSize="1920px 880px"
                direction="column"
                id="background"
                style={{ transition: "all 0.3s ease-in"}}
            >
                <Flex 
                    w="1570px" 
                    h="56px" 
                    mt="60px" 
                    justify="space-between" 
                >
                    <Icon 
                        fontSize="52px" 
                        color="white" 
                        as={SiNextdotjs} 
                    />

                    {/* <Stack direction="row" gap="16">
                        <Button colorScheme="white" variant='link'>Projetos</Button>
                        <Button colorScheme="white" variant='link'>Contatos</Button>
                        <Button colorScheme="white" variant='link'>Sobre Nós</Button>
                    </Stack> */}

                    <Button variant='outline' _hover={{ background: "#ffffff53"}}>Sign In</Button>
                </Flex>

                <Flex mt="20px">

                    <Link href="/store">
                        <Flex 
                            w="960px" 
                            h="824px" 
                            justify="center" 
                            align="center"
                        >
                            <Button 
                                variant='ghost'
                                lineHeight="120px" 
                                fontSize="150px" 
                                fontWeight="bold"
                                id="burnstore"
                                style={{ transition: "all 0.3s ease-in"}}
                                _hover={{ transform: "scale(1.1)", transition: "transform .2s" }}
                                onMouseOver={() => {
                                    const essa = document.getElementById("background")
                                    const title = document.getElementById("burncity")
                                    essa.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/414442898172411910/964758783811280996/IMAGEM-COMPLETA_01.png')"
                                    title.style.opacity = "0.2"
                                    title.style.marginTop = "300px"
                                    title.style.marginLeft = "300px"
                                }}
                                onMouseOut={() => {
                                    const essa = document.getElementById("background")
                                    const title = document.getElementById("burncity")
                                    essa.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/414442898172411910/964758784117461034/IMAGEM-DIVIDIDA_01.png')"
                                    title.style.opacity = "1"
                                    title.style.marginTop = "0px"
                                    title.style.marginLeft = "0px"
                                }}
                            >
                                Next <br />Store
                            </Button>
                        </Flex>
                    </Link>

                    <Link href="/city">
                        <Flex 
                            w="960px" 
                            h="824px" 
                            justify="center" 
                            align="center"
                        >
                            <Button 
                                variant='ghost'
                                lineHeight="120px" 
                                fontSize="150px" 
                                fontWeight="bold"
                                id="burncity"
                                style={{ transition: "all 0.3s ease-in"}}
                                _hover={{ transform: "scale(1.1)", transition: "transform .2s" }}
                                onMouseOver={() => {
                                    const essa = document.getElementById("background")
                                    const title = document.getElementById("burnstore")
                                    essa.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/414442898172411910/964758785027612722/OUTRA-IMAGEM-COMPLETA_01.png')"
                                    title.style.opacity = "0.1"
                                    title.style.marginTop = "300px"
                                    title.style.marginLeft = "-300px"
                                }}
                                onMouseOut={() => {
                                    const essa = document.getElementById("background")
                                    const title = document.getElementById("burnstore")
                                    essa.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/414442898172411910/964758784117461034/IMAGEM-DIVIDIDA_01.png')"
                                    title.style.opacity = "1"
                                    title.style.marginTop = "0px"
                                    title.style.marginLeft = "0px"
                                }}
                            >
                                Next <br />city
                            </Button>
                        </Flex>
                    </Link>

                </Flex>

            </Flex>

            <Flex 
                w="1920px" 
                h="880px" 
                bgImage="url('https://cdn.discordapp.com/attachments/414442898172411910/964758784469790820/IMAGEM-DIVIDIDA_02.png')"
                bgRepeat="no-repeat" 
                bgSize="1920px 880px"
                justify="center"
                direction="column"
                className="sobrenos"
            >
                <>
                    {transition((style, item) => item ? <animated.div style={style} className={styles.transition1}>
                        <Text fontSize="60px" fontWeight="bold">Quem somos?</Text>
                        <Text fontSize="20px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc mi, efficitur in facilisis ut, finibus eget augue. Aliquam erat volutpat. Vestibulum turpis augue, porttitor ut neque at, tempus consequat odio. Vivamus semper et nisi vitae rhoncus. Aliquam eget ligula urna. Sed eleifend ut risus id lacinia, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc mi, efficitur in facilisis ut, finibus eget augue. Aliquam erat volutpat. Vestibulum turpis augue, porttitor ut neque at, tempus consequat odio. Vivamus semper et nisi vitae rhoncus. Aliquam eget ligula urna. Sed eleifend ut risus id lacinia</Text>
                    </animated.div> : '')}

                    {transition2((style, item) => item ? <animated.div style={style} className={styles.transition2}>
                        <Text fontSize="60px" fontWeight="bold">O que fazemos?</Text>
                        <Text fontSize="20px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc mi, ef risus id lacinia, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc mi, efficitur in facilisis ut, finibus eget augue. Aliquam erat volutpat. Vestibulum turpis augue, porttitor ut neque at, tempus consequat odio. Vivamus semper et nisi vitae rhoncus. Aliquam eget ligula urna. Sed eleifend ut risus id laciniaFusce nunc mi, efficitur in facilisis ut, finibus eget augue. Aliquam erat volutpat. Vestibulum turpis augue, porttitor ut neque at, tempus consequat odio. Vivamus semper et nisi vitae rhoncus. Aliquam eget ligula urna. Sed eleifend ut risus id lacinia, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nunc mi, efficitur in facilisis ut, finibus eget augue. Aliquam erat volutpat. Vestibulum turpis augue, porttitor ut neque at, tempus consequat odio. Vivamus semper et nisi vitae rhoncus. Aliquam eget ligula urna. Sed eleifend ut risus id lacinia</Text>
                    </animated.div> : '')}
                </>
            </Flex>

            <Flex 
                w="1920px" 
                h="880px" 
                align="center"
                bgImage="url('https://cdn.discordapp.com/attachments/414442898172411910/964758784754999306/IMAGEM-DIVIDIDA_03.png')"
                bgRepeat="no-repeat" 
                bgSize="1920px 880px"
                direction="column"
            >
                <>
                {transition3((style, item) => item ? <animated.div style={style} className={styles.contatoTitle}><Text fontSize="80px" fontWeight="bold">Contatos</Text></animated.div> : '')}

                    <Stack direction="row" mt="50px" gap="12" > 
                        <Flex 
                            w="300px" 
                            h="400px" 
                            direction="column"
                            align="center"
                            _hover={{ bg: "rgba(255, 255, 255, 0.2)", borderLeft: "2px solid green", borderRight: "2px solid green", transform: "skew(-6deg, -6deg)" }}
                        >
                            <Text fontSize="30px" mt="50px" fontWeight="bold">Instagram</Text>
                            <Stack direction="row" mt="80px" justify="center" align="center">
                                <Box w="60px" h="2px" bg="white"></Box>
                                <Box><Icon fontSize="40px" color="green.500" as={SiInstagram} /></Box>
                                <Box w="60px" h="2px" bg="white"></Box>
                            </Stack>
                            <Text fontSize="20px" mt="80px" >@sigaonextshop</Text>
                        </Flex>

                        <Flex 
                            w="300px" 
                            h="400px" 
                            direction="column"
                            align="center"
                            _hover={{ bg: "rgba(255, 255, 255, 0.2)", borderLeft: "2px solid green", borderRight: "2px solid green", transform: "skew(-4deg, -10deg)" }}
                        >
                            <Text fontSize="30px" mt="50px" fontWeight="bold">Youtube</Text>
                            <Stack direction="row" mt="80px" justify="center" align="center">
                                <Box w="60px" h="2px" bg="white"></Box>
                                <Box><Icon fontSize="40px" color="green.500" as={SiYoutube} /></Box>
                                <Box w="60px" h="2px" bg="white"></Box>
                            </Stack>
                            <Text fontSize="20px" mt="80px" >Next Shop</Text>
                        </Flex>

                        <Flex 
                            w="300px" 
                            h="400px" 
                            direction="column"
                            align="center"
                            _hover={{ bg: "rgba(255, 255, 255, 0.2)", borderLeft: "2px solid green", borderRight: "2px solid green", transform: "skew(-4deg, -10deg)" }}
                        >
                            <Text fontSize="30px" mt="50px" fontWeight="bold">Twitter</Text>
                            <Stack direction="row" mt="80px" justify="center" align="center">
                                <Box w="60px" h="2px" bg="white"></Box>
                                <Box><Icon fontSize="40px" color="green.500" as={SiTwitter} /></Box>
                                <Box w="60px" h="2px" bg="white"></Box>
                            </Stack>
                            <Text fontSize="20px" mt="80px" >@sigaonextshop</Text>
                        </Flex>
                    </Stack>
                    
                    <Button 
                        variant='outline' mt="30px" 
                        _hover={{ background: "#ffffff53"}}
                        onClick={() => {
                            navigator.clipboard.writeText('https://discord.gg/sf43wneKq2')
                            toast.success("Link copiado para área de transferencia", { theme: "dark" })
                        }}
                    >
                            <Icon as={SiDiscord} mr="10px" />
                            Discord.gg
                        </Button>
                    <Text fontSize="26px" mt="70px"><Icon as={SiGmail} color="green" mr="10px"/>burnshop@gmail.com</Text>
                </>
            </Flex>
        </>
    )
}

export default Home