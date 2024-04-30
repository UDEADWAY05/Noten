import { useState } from "react";
import { db } from "../db";
import { customAlphabet } from 'nanoid'
import { IUser } from "../types/IUser";

const INITIAL_ALPHABET = "1234567890"

export function useUsers() {
    const [users, setUsers] = useState<IUser[]>([])
    const [user, setUser] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | undefined>()

    const nanoid = customAlphabet(INITIAL_ALPHABET, 12)
    
    const getUsers = async (): Promise<void> => {
        setIsLoading(true)
        const allUsers = await db.users.toArray()
        setUsers(allUsers)
        setIsLoading(false)
    }

    const addUser = async (user: IUser): Promise<IUser> => {
        setIsLoading(true)
        const id = nanoid()
        const newUser = { ...user, id: Number(id), notes: [] }
        await db.users.add(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        setUser(newUser)
        setUsers(prevState => [...prevState, newUser])
        setIsLoading(false)
        return newUser;
    }

    const editUser = async (editUser: IUser): Promise<void> => {
        setIsLoading(true)
        await db.users.update(editUser.id!, editUser)
        setUser(editUser)
        localStorage.setItem("user", JSON.stringify(editUser))
        setIsLoading(false)
    }

    const editNotesInUser = async (authUser: IUser, newNote: number): Promise<void | null> => {
        setIsLoading(true)
        if (user !== undefined) {
            const newUser = { ...user, notes: [...user.notes, newNote ]}
            await db.users.update(authUser.id!, newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            setUser(newUser)
            return null;
        }

        if (authUser !== undefined) {
            const newUser = { ...authUser, notes: [...authUser.notes, newNote ]}
            await db.users.update(authUser.id!, newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            setUser(newUser)
        }

        setIsLoading(false)
    }

    const deleteNoteInUser = async (authUser: IUser, deleteNote: number): Promise<void | null> => {
        setIsLoading(true)
        
        if (user !== undefined) {
            const filterNotesInUser = user.notes.filter((el) => el !== deleteNote)
            const newUser = { ...user, notes: filterNotesInUser}
            await db.users.update(authUser.id!, newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            setUser(newUser)
            setIsLoading(false)
            return null;
        }

        if (authUser !== undefined) {
            const filterNotesInUser = authUser.notes.filter((el) => el !== deleteNote)
            const newUser = { ...authUser, notes: filterNotesInUser}
            await db.users.update(authUser.id!, newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            setUser(newUser)
        }

        setIsLoading(false)
    }

    const authUser = async (email: string, password: string): Promise<IUser | null> => {
        if (users.length > 0) {
            const authUser = users.find((el) => el.email === email && el.password === password)
            if (authUser !== undefined) { 
                setUser(authUser)
                localStorage.setItem("user", JSON.stringify(authUser))
                return authUser;
            }
            setError("Неправильный логин или пароль!")
        }
        setError("Неправильный логин или пароль!")
        return null;
    }

    const logOutUser = (): void => {
        setUser(undefined)
    }

    return {
        user,
        isLoading,
        error,
        addUser,
        authUser,
        getUsers,
        editUser,
        logOutUser,
        editNotesInUser,
        deleteNoteInUser
    }
}