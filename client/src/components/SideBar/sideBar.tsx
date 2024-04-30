import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom"
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import styles from "./SideBar.module.scss";
import logo from "../../assets/img/close.svg"
import logOut from "../../assets/img/logOut.svg"
import addIcon from "../../assets/img/add.png"
import { Search } from "../Search/Search";
import { useAuth } from "../../context/AuthProvider";
import { Avatar } from "@mui/material";
import { useNotes } from "../../hooks/useNotes";
import { useUsers } from "../../hooks/useUsers";
import { INote } from "../../types/INote";


interface SideBarProps {
    notes: INote[],
    onOpenSideBar?: (value: boolean) => void,
    setNotes: Dispatch<SetStateAction<INote[]>>
}

export const SideBar = ({ notes, onOpenSideBar, setNotes }: SideBarProps) => {
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [search, useSearch] = useState("")
    const { user, signOut } = useAuth()
    const { editNotesInUser, deleteNoteInUser } = useUsers()
    const { addNote, deleteNote } = useNotes()
    const filterNote = notes.filter((el) => el.title.includes(search))
    const navigate = useNavigate();

    const handleClick = () => {
        if (signOut) {
            signOut(() => {
                navigate("/", {
                    replace: true,
                })
            })
        }
    }

    const handleOpen = (id: number) => {
        setDeleteId(id)
        setOpen(true)
    };
    const handleClose = () => setOpen(false)

    const handleOpenSideBar = () => {
        if (onOpenSideBar !== undefined) {
            // onOpenSideBar(false)
        }
    }

    const handleDeleteNote = async () => {
        if (user !== null) {
            await deleteNote(deleteId)
            deleteNoteInUser(user, deleteId)
            setNotes((prevState) => prevState.filter(note => note.id !== deleteId))
            navigate("/notion")
        }
        handleClose()
    }

    const handleSearch = (abc: string) => {
        useSearch(abc)
    }

    const handleAddNote = async (): Promise<void> => {
        if (user !== null) {
            const newNote = { title: "", text: "", userId: user.id!, date: Date.now() }
            const data = await addNote(newNote)
            if (data !== undefined) {
                editNotesInUser(user, data)
                setNotes((prevState) => [...prevState, { ...newNote, id: data }])

            }
        }
    }

    return (<div className={styles["sideBar"]}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles["sideBar-modal"]}
        >
            <div>
                <h1 className={styles["sideBar-modal-title"]}>Предупреждение</h1>
                <p className={styles["sideBar-modal-describe"]}>Если вы нажмете "Удалить", то данные навсегда пропадут. Удалить ?</p>
                <div className={styles["sideBar-modal-buttons"]}>
                    <button onClick={handleClose} className={styles["sideBar-button"]}>Отмена</button>
                    <button onClick={handleDeleteNote} className={styles["sideBar-button-delete"]}>Удалить</button>
                </div>
            </div>
        </Modal>
        <div className={styles["sideBar-div"]}>
            <div className={styles["sideBar-user"]}>
                <Avatar src={user?.avatar} className={styles["sideBar-user-avatar"]}></Avatar>
                <p className={styles["sideBar-user-text"]}>{user?.name}</p>
                <img className={styles["sideBar-user-icon"]} src={logOut} onClick={handleClick}/>
            </div>
            <Search value={search} onChange={handleSearch} />
            <div className={styles["sideBar-addPage"]} onClick={handleAddNote}>
                <img className={styles["sideBar-addPage-icon"]} src={addIcon} />
                <p className={styles["sideBar-addPage-text"]}>Add Note</p>
            </div>
            <Divider style={{ borderColor :'#727272'}}/>
            {notes && filterNote.map((note) => {
                return <Link to={"/notion/" + String(note.id)} key={note.id} className={styles["sideBar-link"]} onClick={handleOpenSideBar}>
                    <div className={styles["sideBar-item"]}>
                        <h2 className={styles["sideBar-item-title"]}>{note.title || "Untitled"}</h2>
                        <img src={logo} onClick={() => handleOpen(note.id!)} className={styles["sideBar-icon"]}></img>
                    </div>
                    <Divider style={{ borderColor :'#727272'}}/>
                </Link>
            })}
        </div>
        <Divider orientation="vertical" style={{ borderColor: '#727272', height: "100vh" }} />
    </div>);
}