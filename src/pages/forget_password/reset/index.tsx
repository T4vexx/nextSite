import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../../components/Form/Input'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { withSSRGuest } from "../../../utils/withSSRGuest";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../../services/apiClient";
import { useState } from "react";
import Router from "next/router";


type forgetPassFormData = {
    resetPasswordToken: string;
    password: string;
}

const forgetPassFormSchema = yup.object().shape({
    resetPasswordToken: yup.string().required('Token obrigatório'),
    password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function forget_password() {
    const [formStep, setFormStep] = useState(0)

    const { register, handleSubmit, formState, watch } = useForm({
        resolver: yupResolver(forgetPassFormSchema),
        mode: 'all'
    })
    const { errors, isValid } = formState

    const handleResetarSenha: SubmitHandler<forgetPassFormData> = async (values) => {

        try {
            
            await api.post("reset_password", {
                resetPasswordToken: values.resetPasswordToken,
                password: values.password,
            }).then(response => {
                console.log(response)
                if (response.data.error === false) {
                    setFormStep(2)
                    toast.success(response.data.message, { theme: "colored" })
                    setTimeout(() => { Router.push('/store/cliente')}, 2000)
                } else {
                    setFormStep(3)
                    toast.error(response.data.message, { theme: "colored" })
                }
                
            })

        } catch (err) {
            console.log(err)
        }
    }

    const completeFormStep = () => {
        setFormStep(cur => cur + 1)
    }

    const renderButton = () => {
        if (formStep > 1) {
            return undefined
        } else if (formStep === 1) {
            return (
                <Button 
                    type="submit" 
                    disabled={!isValid}
                    mt="6" 
                    size="lg" 
                    colorScheme="orange"
                    isLoading={formState.isSubmitting}
                >
                    Redefinir
                </Button>
            )
        } else {
            return (
                <Button 
                    type="button" 
                    mt="6" 
                    size="lg" 
                    colorScheme="orange"
                    onClick={completeFormStep}
                >
                    Proximo
                </Button>
            )
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
                onSubmit={handleSubmit(handleResetarSenha)}
            >
                {formStep === 0 && (<Box as="section">
                    <Stack spacing="4">
                        <Text fontSize="24" textAlign="center">Código do email</Text>
                        <Input name="resetPasswordToken" type="text" label="Token" error={errors.resetPasswordToken} {...register('resetPasswordToken')} />
                    </Stack>
                </Box>)}
                {formStep === 1 && (<Box as="section">
                <Stack spacing="4">
                    <Text fontSize="24" textAlign="center">Redefinir senha</Text>
                    <Input name="password" type="password" label="Nova senha" error={errors.password} {...register('password')} />
                    <Input name="password_confirmation" type="password" label="Confirmar nova senha" error={errors.password_confirmation} {...register('password_confirmation')} />
                </Stack>
                </Box>)}
                {formStep === 2 && (<Box as="section">
                <Stack spacing="4">
                    <Text fontSize="24" textAlign="center">Senha alterada com sucesso</Text>
                </Stack>
                </Box>)}
                {formStep === 3 && (<Box as="section">
                <Stack spacing="4">
                    <Text fontSize="24" textAlign="center" color="red">Erro ao alterar a senha</Text>
                </Stack>
                </Box>)}
                {renderButton()}
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
  
