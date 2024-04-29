import { createContext, useContext, useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useNotes } from "../hooks/useNotes";
import { IUser } from "../types/IUser";

interface ProviderValue {
    user: IUser | null,
    signIn: (email: string, password: string, callback: () => void) => void
    signOut: (callback: () => void) => void,
    signUp: (state: SignUpState, callback: () => void) => void,
}

interface SignUpState {
    name: string,
    login: string,
    password: string,
    email: string,
    avatar: string,
    notes: number[]
}

const AuthContext = createContext<ProviderValue | null>(null)

export function useAuth() {
    return useContext(AuthContext) as ProviderValue;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getUsers, authUser, logOutUser, addUser } = useUsers()
    const { getNotes } = useNotes()

    useEffect(() => {
        getUsers()
    }, [children])

    const [user, setUser] = useState((
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
        ) as IUser | null
    )

    useEffect(() => {
        if (user !== null) {
            getNotes(user.notes)
        } 
    }, [user?.notes])

    const signIn = async (email: string, password: string, callback: () => void): Promise<void> => {
        await authUser(email, password).then(data => setUser(data))
        callback()
    }

    const signUp = async (state: SignUpState, callback: () => void): Promise<void> => {
        await addUser(state).then(data => setUser(data))
        callback()
    }

    const signOut = (callback: () => void): void => {
        setUser(null)
        logOutUser()
        localStorage.removeItem('user')
        callback()
    }

    const value = {
        user,
        signIn,
        signOut,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
           {children}
        </AuthContext.Provider>
    );
}