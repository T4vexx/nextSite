import { Flex, Button, Stack, Text, Link as ChakraLink } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/Form/Input'
import { withSSRGuest } from '../../../utils/withSSRGuest'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'

import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import Router from 'next/router'
import Head from 'next/head'

type signInFormData = {
    email: string;
    password: string;
}

const loginFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
    const { signIn } = useContext(AuthContext)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(loginFormSchema)
    })
    const { errors } =  formState

    const handleSignIn: SubmitHandler<signInFormData> = async (values) => {

        try {
            await signIn(values).then((retorno) => {
                if (retorno.error === false) {
                    toast.success(retorno.message, { theme: "colored" })
                    Router.push('/store/cliente/dashboard')
                } else {
                    toast.error(retorno.message, { theme: "colored" })
                }
            })
            

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Head>
                <title>NextStore | Login</title>
            </Head>
            <Flex 
                w="100vw" 
                h="100vh" 
                align="center" 
                justify="center"
                direction="column"
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
                        <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                        <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
                        <Link href="/forget_password"><ChakraLink mt="1" color="orange">Esqueceu sua senhas?</ChakraLink></Link>
                    </Stack>
                    <Button 
                        type="submit" 
                        mt="6" 
                        size="lg" 
                        colorScheme="orange"
                        isLoading={formState.isSubmitting}
                    >Entrar</Button>
                </Flex>

                <Link href="/store"><ChakraLink mt="6">Não tem uma conta?<Text color="orange" textAlign="center">Registre-se!</Text></ChakraLink></Link> 
                
            </Flex>
        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
      props: {}
    }
})