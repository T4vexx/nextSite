import { Flex, Button, Stack, Divider, Link as ChakraLink, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/Form/Input'
import { withSSRGuest } from '../../utils/withSSRGuest'
import { api } from '../../services/apiClient'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'

type RegisterFormData = {
    name: string;
    email: string;
    server: string;
    password: string;
    password_confirmation: string;
}

const registerFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    server: yup.string().required('Nome da cidade obrigatório'),
    password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function Register() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(registerFormSchema),
        mode: "all"
    })
    const { errors } =  formState

    const handleSignIn: SubmitHandler<RegisterFormData> = async (values) => {
        try {
            
            await api.post("register_cliente", {
                name: values.name,
                email: values.email,
                server: values.server,
                password: values.password
            }).then(response => {
                if (response.data.error === false) {
                    toast.success(response.data.message, { theme: "colored" })
                    Router.push('/store/cliente')
                } else {
                    toast.error(response.data.message, { theme: "colored" })
                }
                
            })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Head>
                <title>NextStore | Register</title>
            </Head>
            <Flex 
                w="100vw" 
                h="100vh" 
                direction="row"
            >
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    <ToastContainer />
                <Flex
                    w="50%"
                    height="100%"
                    justify="right"
                    align="center"
                >
                    <Flex direction="column" maxWidth={400} mr="20">
                        <Flex direction="row"><Text fontSize="30">BurnStore <span style={{color: "orange"}}>.</span></Text></Flex>
                        <Text fontSize="50">Faça seu registro na nossa loja</Text>
                    </Flex>

                    <Flex w="1px" borderRadius={8} h="72" bg="gray.500" mr="20"></Flex>
                </Flex>
                <Flex
                    w="50%"
                    justify="center"
                    align="left"
                    direction="column"
                >
                    <Flex
                        as="form"
                        w="100%"
                        maxWidth={400}
                        bg="gray.800"
                        p="8"
                        borderRadius={8}
                        flexDir="column"
                        onSubmit={handleSubmit(handleSignIn)}
                    >
                        <Stack spacing="4">
                            <Input name="name" type="name" label="Nome" error={errors.name} {...register('name')} />
                            <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                            <Input name="server" type="server" label="Nome do servidor" error={errors.server} {...register('server')} />
                            <Divider />
                            <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
                            <Input name="password_confirmation" type="password" label="Confirmação da senha" error={errors.password_confirmation} {...register('password_confirmation')} />
                        </Stack>
                        <Button 
                            type="submit" 
                            mt="6" 
                            size="lg" 
                            colorScheme="orange"
                            isLoading={formState.isSubmitting}
                        >Entrar</Button>
                    </Flex>
                    <Link href="/store/cliente"><ChakraLink mt="6" ml="32">Já possui uma conta?</ChakraLink></Link> 
                </Flex>

                
            </Flex>
        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
      props: {}
    }
})