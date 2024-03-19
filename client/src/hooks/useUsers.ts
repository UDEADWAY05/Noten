import { useState } from "react";
import { db } from "../db";
import { nanoid } from 'nanoid'

interface IUser {
    id?: string
    name: string;
    login: string;
    email: string;
    password: string;
    avatar: string;
    notes: string[]
}

export function useUsers() {
    const [users, setUsers] = useState([] as IUser[])
    const [user, setUser] = useState({} as IUser)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const getUsers = async () => {
        setIsLoading(true)
        const allUsers = await db.users.toArray()
        setUsers(allUsers)
        console.log(allUsers)
        setIsLoading(false)
    }

    const addUser = async (user: IUser) => {
        setIsLoading(true)
        const newUser = { ...user, id: nanoid(), notes: [] }
        const response = await db.users.add(newUser)
        setUser(newUser)
        setUsers(prevState => [...prevState, newUser])
        console.log(response)
        setIsLoading(false)
    }

    const editUser = async (editUser: IUser) => {
        setIsLoading(true)
        const response = await db.users.update(Number(editUser.id), editUser)
        setUser(editUser)
        console.log(response)
        setIsLoading(false)
    }

    const authUser = async (email: string, password: string) => {
        if (users.length > 0) {
            const authUser = users.find((el) => el.email === email && el.password === password)
            console.log(authUser)
            if (authUser !== undefined) { 
                setUser(authUser)
                localStorage.setItem("user", JSON.stringify(authUser))
                return authUser;
            }
        }
        return null;
    }

    return {
        user,
        isLoading,
        error,
        addUser,
        authUser,
        getUsers,
        editUser
    }
}