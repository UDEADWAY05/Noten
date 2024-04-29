import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useAuth } from "../../context/AuthProvider";
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from "react";
import styles from "./Hello.module.scss"
import { useNotes } from "../../hooks/useNotes";

export const HelloPage = () => {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const { notes, getNotes } = useNotes()
    const [notesArray, setNotesArray] = useState(notes)

    useEffect(() => {
        if (user?.notes) {
            getNotes(user?.notes)
        }
    }, [user?.notes])

    useEffect(() => {
        setNotesArray(notes)
    }, [notes])

    const handleOpen: (value: boolean) => void = (value: boolean) => {
        setOpen(value)
    }

    return (<>
        <div className={styles["home-sideBar"]}>
            <SideBar notes={notesArray} setNotes={setNotesArray} />
        </div>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <SideBar onOpenSideBar={handleOpen} setNotes={setNotesArray} notes={notesArray} />
        </Drawer>
        <Outlet context={{ handleOpen, setNotesArray }}  />
    </>);
}