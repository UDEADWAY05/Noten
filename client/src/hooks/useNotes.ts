import { useState, useEffect } from "react";
import { db } from "../db";
import { customAlphabet } from 'nanoid'
interface INote {
    id?: number,
    title: string,
    text: string,
    userId: number,
    date: number
}

const INITIAL_ALPHABET = "1234567890"

export function useNotes() {
    const [notes, setNotes] = useState<INote[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [note, setNote] = useState<INote>()
    const nanoid = customAlphabet(INITIAL_ALPHABET, 12)

    const getNotes = async (userNotes: number[]): Promise<void> => {
        setIsLoading(true)
        const allNotes = await db.notes.toArray()
        const array: INote[] = []
        if (allNotes.length > 0 && userNotes.length > 0) {
            userNotes.map((id) => {
                const foundNote = allNotes.find(el => el.id === id)
                if (foundNote) {
                    array.push(foundNote);
                }
            })
            setNotes(array)
        }
        setIsLoading(false)
    }

    const getNote = async (id: number): Promise<void> => {
        console.log("####ID:", id)
        setIsLoading(true)
        const data = await db.notes.get({ id: id })
        if (data !== undefined) {
            setNote(data)
        }
        console.log("####DATA:", data, id)
        setError("404: NotFound")
        setIsLoading(false)
    }

    const addNote = async (note: INote) => {
        const id = nanoid()
        console.log(id)
        const newNote = { ...note, id: Number(id) }
        const response = await db.notes.add(newNote)
        setNotes(prevState => [...prevState, newNote])
        return response;
    }

    const deleteNote = async (noteId: number) => {
        console.log("### Note has been delete", noteId)
        const response = await db.notes.delete(noteId)
        console.log(notes)
        setNotes(prevState => prevState.filter(el => el.id !== noteId))
        return response;
    }    

    const editNote = async (newNote: INote) => {
        console.log("edit")
        if (newNote !== undefined) {
            const response = await db.notes.update(newNote.id!, newNote)
            console.log(response)
            console.log(notes)
        }
    }

    return {
        isLoading,
        error,
        notes,
        note,
        getNotes,
        editNote,
        addNote,
        getNote,
        deleteNote
    }
}