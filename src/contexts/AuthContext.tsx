import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from "../services/apiClient";

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredential = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}

type signInReturn = {
    error: boolean;
    message: string;
    code: string;

}

type AuthContextData = {
    signIn: (credential: SignInCredential) => Promise<signInReturn>;
    signOut: () => void;
    user: User;
    isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel


export function signOut() {
    destroyCookie(undefined, 'burnauth.token')
    destroyCookie(undefined, 'burnauth.refreshToken')

    authChannel.postMessage('signOut')
    
    Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                   signOut();
                   break;
                default: 
                    break;
            } 
        }
    }, [])

    useEffect(() => {
        const { 'burnauth.token': token } = parseCookies()
    
        if (token) {
          api.get('/me').then(response => {
            const { email, permissions, roles } = response.data

            setUser({ email, permissions, roles })
        }).catch(() => {
            signOut()
        })
        }
      }, [])

    async function signIn({email, password}: SignInCredential) {
        try { 
            const response = await api.post('login_cliente', {
                email,
                password,
            })

            if (response.data.error === true) {
                return response.data
            }
            
            const { token, refreshToken, permissions, roles } = response.data.credentials;

            setCookie(undefined, 'burnauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            setCookie(undefined, 'burnauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })


            setUser({
                email,
                permissions,
                roles
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            
            Router.push('/store/cliente/dashboard')

            return response.data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user }} >
            {children}
        </AuthContext.Provider>
    )
}