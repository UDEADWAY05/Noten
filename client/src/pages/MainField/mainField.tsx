import { useOutletContext, useParams } from "react-router-dom";
import styles from "./MainField.module.scss"
import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "../../components/Editor";
import { PartialBlock } from "@blocknote/core";
import Heading from "../../components/HeadingBar";
import SideBar from "../../components/SideBar";
import { useNotes } from "../../hooks/useNotes";
import { useAuth } from "../../context/AuthProvider";
import { useDebounce } from "../../hooks/useDebounce";
import { NavBar } from "../../components/NavBar/NavBar";

interface INote {
    id: number,
    title: string,
    text: string | PartialBlock[],
    userId: number,
    date: number
}
interface handleChangeProps {
    name: string,
    value: string | PartialBlock[],
}

export const MainField = () => {
    const { id } = useParams()
    const { note, getNote, isLoading, editNote, getNotes } = useNotes()
    const { user } = useAuth()
    const [localNote, setLocalNote] = useState(note)
    const handleOpen: (value: boolean) => void = useOutletContext();
    const firstFetch = useRef(true)
    const editing = useRef(false)

    useEffect(() => {
        if (id !== undefined) {
            getNote(Number(id))
        }
    }, [id])

    if (id !== undefined && firstFetch.current && user !== null) {
        getNote(Number(id))
        console.log("note", note)
        firstFetch.current = false
    }

    useEffect(() => {
        if (note !== undefined) {
            setLocalNote(note)
        }
    }, [note])

    useDebounce(() => {
        if (localNote !== undefined && editing.current) {
            editNote(localNote)
            editing.current = false
        }
    }, 1000, [editing.current])

    const handleChange = ({ name, value }: handleChangeProps) => {
        setLocalNote((prevState) => {
            if (prevState !== undefined) {
                return { ...prevState, [name]: value }
            }
        })
        editing.current = true
    }

    return (
        <>
            <div className={styles["MainField"]}>
                <NavBar value={localNote?.title} onChange={handleChange} isLoading={isLoading} handleOpen={handleOpen} />
                <div className={styles["MainField-body"]}>
                    <Heading value={localNote?.title} onChange={handleChange} isLoading={isLoading} />
                    <Editor value={localNote?.text} onChange={handleChange} isLoading={isLoading} />
                </div>
            </div>
        </>
    );
    
};

