import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styles from "./MainField.module.scss"
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/Editor";
import Heading from "../../components/HeadingBar";
import { useNotes } from "../../hooks/useNotes";
import { useDebounce } from "../../hooks/useDebounce";
import { NavBar } from "../../components/NavBar/NavBar";
import { PropsOutletContext } from "../../types/PropsOutletContext";

interface handleChangeProps {
    name: string,
    value: string,
}

export const MainFieldPage = () => {
    const { id } = useParams()
    const { note, getNote, isLoading, editNote, error  } = useNotes()
    const [localNote, setLocalNote] = useState(note)
    const { handleOpen, setNotesArray }: PropsOutletContext = useOutletContext();
    const editing = useRef(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (error !== undefined && error.message === "404: NotFound") {
            navigate("*")
        }
    }, [error])

    useEffect(() => {
        if (id !== undefined) {
            const numberId = Number(id)
            if (!Number.isNaN(numberId)) {
                getNote(numberId)
            } else {
                navigate("*")
            }
        }
    }, [id])

    useEffect(() => {
        if (note !== undefined) {
            setLocalNote(note)
        }
    }, [note])

    useDebounce(() => {
        if (localNote !== undefined && editing.current) {
            editNote(localNote)
            setNotesArray(prevState => [ localNote, ...prevState.filter((el) => el.id !== localNote.id)])
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
                <NavBar
                    value={localNote?.title}
                    readOnly={false}
                    onChange={handleChange}
                    isLoading={isLoading}
                    handleOpen={handleOpen}
                />
                <div className={styles["MainField-body"]}>
                    <Heading
                        value={localNote?.title}
                        onChange={handleChange}
                        isLoading={isLoading}
                    />
                    <Editor
                        value={localNote?.text}
                        onChange={handleChange}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    );
    
};

