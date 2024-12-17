"use client"

import {SessionProvider} from 'next-auth/react'
const AuthProvider = ({children, session}) => {
    <SessionProvider>
        {children}
    </SessionProvider>
}

export default AuthProvider;