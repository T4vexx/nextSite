import { Box, Button, Flex, Stack, Text, Link as ChakraLink } from "@chakra-ui/react";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../components/Form/Input'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { withSSRGuest } from "../../utils/withSSRGuest";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../services/apiClient";
import Link from "next/link";
import Router from "next/router";

type forgetPassFormData = {
    email: string;
}

const forgetPassFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
})

export default function forget_password() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(forgetPassFormSchema)
    })
    const { errors } =  formState

    const handleSignIn: SubmitHandler<forgetPassFormData> = async (values) => {

        try {
            
            await api.post("forget_request", {
                email: values.email,
            }).then(response => {
                if (response.data.error === false) {
                    toast.success(response.data.message, { theme: "colored" })
                    setTimeout(() => {
                        Router.push('/forget_password/reset')
                    }, 3000)
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
                    <Text fontSize="24" textAlign="center">Recuperar senha</Text>
                    <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                </Stack>
                <Button 
                    type="submit" 
                    mt="6" 
                    size="lg" 
                    colorScheme="orange"
                    isLoading={formState.isSubmitting}
                >Enviar</Button>
            </Flex>

            <Link href="/store/cliente"><ChakraLink mt="4" fontSize="16" color="gray.300">Voltar</ChakraLink></Link> 
        </Flex>
        </>
    )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
    return {
      props: {}
    }
})
  
