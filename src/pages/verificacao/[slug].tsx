import { Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { setupAPIClient } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import  Router  from "next/router";

export default function Verification() {
    toast.error("O token expirou, Tente novamente", { theme: "colored" })

    setTimeout(() => {
        Router.push('/store/cliente/dashboard')
    },5000)

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <ToastContainer />
            <Box mt="25vh" ml="15vw">
                <Text fontWeight="bold" fontSize='5xl'>Verificando ...</Text>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { slug } = ctx.params;
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.post('/validation_request', {
        confirmedToken: slug,
    });


    if (response.data.error === false) {
        return {
            props: {
    
            },
            redirect: {
                destination: '/store/cliente/dashboard',
                permanent: false,
            }
        }
    }

    if (response.data.error === true) {
        
        return {
            props: {
                    
            },
        }

        
    }
    
    return {
        props: {

        },
        redirect: {
            destination: '/',
            permanent: false,
        }
    }

};
  
