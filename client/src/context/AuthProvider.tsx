import { createContext, useContext, useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";

interface IUser {
    id?: string
    name: string;
    login: string;
    email: string;
    password: string;
    avatar: string;
    notes: string[]
}

interface ProviderValue {
    user: IUser | null,
    signIn: (email: string, password: string, callback: () => void) => void
    signOut: (callback: () => void) => void
}

const AuthContext = createContext<ProviderValue | null>(null)

export function useAuth() {
    return useContext(AuthContext) as ProviderValue;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getUsers, authUser } = useUsers()

    useEffect(() => {
        getUsers()
    }, [children])

    const [user, setUser] = useState((
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
        ) as IUser | null
    )

    const signIn = (email: string, password: string, callback: () => void) => {
        authUser(email, password).then(data => setUser(data))
        callback()
    }

    const signOut = (callback: () => void) => {
        setUser(null)
        localStorage.removeItem('user')
        callback()
    }

    const value = {
        user,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
           {children}
        </AuthContext.Provider>
    );
}