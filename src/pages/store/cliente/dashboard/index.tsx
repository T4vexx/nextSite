import { Box, Button, Flex, Icon, Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Input } from '../../../../components/Form/Input';
import { Header } from '../../../../components/Header';
import { setupAPIClient } from '../../../../services/api';
import { withSSRAuth } from '../../../../utils/withSSRAuth';

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler,useForm } from 'react-hook-form';
import { useScripts } from '../../../../services/hooks/useScripts';
import { ToastContainer, toast } from 'react-toastify';

import { FaExchangeAlt } from "react-icons/fa"
import { MdOutlineMarkEmailRead } from 'react-icons/md'

import { api } from '../../../../services/apiClient';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { queryClient } from '../../../../services/queryClient';
import { useMutation } from 'react-query';
import Head from 'next/head';

type CityParams = {
    usuario: {
        name: string,
        email: string,
        permissions: string[],
        confirmed: boolean,
        roles: string[],
        server: string,
        ipLicense: string,
        licensekey: string[]
    }
}

type requestIPFormData = {
    ipLicense: string;
}

type UpdateLicenseFormData = {
    script_name: string;
    ipLicense: string;
}

interface ChangeIpAPIResponse {
    error?: boolean;
    code?: string;
    message?: string;
}

const ipFormSchema = yup.object().shape({
    ipLicense: yup.string().required('Ip obrigatório'),
})

export default function City({ usuario }: CityParams) {

    const { data, isLoading, isFetching, error} = useScripts(usuario.email)

    const [emailRequest, setEmailRequest] = useState('')

    const [validation, setValidation] = useState(true)

    const updateLicense = useMutation(async (user: UpdateLicenseFormData) => {
        await api.put<ChangeIpAPIResponse>('/change_ip', {
            script_name: user.script_name,
            ipLicense: user.ipLicense
        }).then(response => {
            if (response.data.error === false) {
                toast.success(response.data.message, { theme: "colored" })
            } else {
                toast.error(response.data.message, { theme: "colored" })
            }
            
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('scripts')
        }
    })

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(ipFormSchema)
    })

    const { errors } =  formState


    useEffect(() => {
        console.log(validation)
    }, [validation])

    const handleIpRequest: SubmitHandler<requestIPFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        try {        
            const userAgora = {
                script_name: emailRequest,  
                ipLicense: values.ipLicense
            }

            await updateLicense.mutateAsync(userAgora) 
        } catch (err) {
            console.log(err)
        }
    }

    async function handleValidationEmail() {
        setValidation(false)

        await api.post('/validation', { 
            email: usuario.email
        }).then(response => {
            if (response.data.error === false) {
                toast.success(response.data.message, { theme: "colored"})
                
            } else {
                toast.error(response.data.message, { theme: "colored"})
            }
        })
    }

    return (
        <>
        <Head>
            <title>NextStore | Dashboard</title>
        </Head>
        <Flex 
            direction="column" 
            h="100vh" 
            as="form"
            onSubmit={handleSubmit(handleIpRequest)}
        >

        <Header usuario={usuario} />

            <Flex  w="100%" my="6" maxWidth={1480} mx="auto" px="6" direction="column">
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                    />
                    <ToastContainer />

                    {!usuario.confirmed &&
                        <Box
                            p={["6","8"]}
                            bg="gray.800"
                            borderRadius={8}
                            pb="4"
                        >
                            <Flex align="center">
                                <Stack gap={4}>
                                    <Text fontSize="lg" >Confirme já seu email!</Text>
                                    {validation ? (<Link disabled={false} as="button" onClick={handleValidationEmail} color="orange" >Clique aqui e check sua caixa de email</Link>) : (<Text fontSize="lg" >Aguardando confirmação ...</Text>)}
                                </Stack>

                                <Icon ml="52vw" fontSize="6xl" as={MdOutlineMarkEmailRead}  />
                            </Flex>
                    </Box>
                    }

                    {usuario.confirmed && 
                    <>
                    <Box
                        p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="6">Alterar ip da VPS</Text>
                        <Input name="ipLicense" placeholder={"Ip"} label="Ip da Vps:" error={errors.ipLicense} {...register('ipLicense')} />
                    </Box>

                    <Box
                        p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                        mt="8"
                    >
                        <Text fontSize="lg" mb="4">Licenças: </Text>

                        <Table colorScheme="whiteAlpha">
                            <Thead> 
                                <Tr> 
                                    <Th>Nome do script</Th>
                                    <Th>Chave de licença</Th>
                                    <Th>Data de criação</Th>
                                    <Th>Ip da licença</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.scripts?.map(license => {
                                    return (
                                        <Tr key={license.id}>
                                            <Td>{license.script_name}</Td>
                                            <Td>{license.licensekey}</Td>
                                            <Td>{license.createdAt}</Td>
                                            <Td>{license.ipLicense}</Td>
                                            <Td>
                                                <Button 
                                                    type='submit'
                                                    colorScheme="orange"
                                                    onClick={() => setEmailRequest(license.script_name)}
                                                > 
                                                   <Icon as={FaExchangeAlt} />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                    </>}
            </Flex>

        </Flex>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');
    
    const usuario = {
        name: response.data.name,
        email: response.data.email,
        permissions: response.data.permissions,
        confirmed: response.data.confirmed,
        roles: response.data.roles,
        server: response.data.server,
        ipLicense: response.data.ipLicense,
        licensekey: response.data.licensekey
    }

    return {
      props: {
        usuario: JSON.parse(JSON.stringify(usuario)),
      }
    }
  }, {
    roles: ['user','administrador']
})