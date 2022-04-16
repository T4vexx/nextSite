import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

import { QueryClientProvider } from 'react-query'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { queryClient } from '../services/queryClient'
import { AuthProvider } from '../contexts/AuthContext'

import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                 
            <ChakraProvider theme={theme}>
                    <SidebarDrawerProvider >
                        <Component {...pageProps}/>
                    </SidebarDrawerProvider>
            </ChakraProvider>

            </AuthProvider>
        </QueryClientProvider>
    )
}

export default MyApp