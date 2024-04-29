import { useState } from "react";
import { db } from "../db";
import { customAlphabet } from 'nanoid'
import { INote } from "../types/INote";

const INITIAL_ALPHABET = "1234567890"

export function useNotes() {
    const [notes, setNotes] = useState<INote[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error>()
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
        setIsLoading(true)
            const data = await db.notes.get({ id: id })
            if (data !== undefined) {
                setNote(data)
                setIsLoading(false)
                return;
            }
            setError(Error("404: NotFound"))
            setIsLoading(false)
    }

    const addNote = async (note: INote) => {
        const id = nanoid()
        const newNote = { ...note, id: Number(id) }
        const response = await db.notes.add(newNote)
        setNotes(prevState => [...prevState, newNote])
        return response;
    }

    const deleteNote = async (noteId: number) => {
        const response = await db.notes.delete(noteId)
        setNotes(prevState => prevState.filter(el => el.id !== noteId))
        return response;
    }    

    const editNote = async (newNote: INote) => {
        if (newNote !== undefined) {
            await db.notes.update(newNote.id!, newNote)
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