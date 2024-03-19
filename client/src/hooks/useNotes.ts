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
        const allUsers = await db.users.toArray()
        setUsers(allUsers)
        console.log(allUsers)
    }

    const addUser = async (user: IUser) => {
        const newUser = { ...user, id: nanoid(), notes: [] }
        const response = await db.users.add(newUser)
        setUser(newUser)
        setUsers(prevState => [...prevState, newUser])
        console.log(response)
    }

    const editUser = async (editUser: IUser) => {
        const response = await db.users.update(Number(editUser.id), editUser)
        setUser(editUser)
        console.log(response)
    }

    const authUser = async (email: string, password: string) => {
        if (users.length > 0) {
            const authUser = users.find((el) => el.email === email && el.password === password)
            console.log(authUser)
            authUser !== undefined && setUser(authUser)
        }

    }

    return {
        user,
        isLoading,
        error,
        addUser,
        authUser
    }
}