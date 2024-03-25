
import styles from "./MainPage.module.scss"
import { useRef } from "react";
import { useNotes } from "../../hooks/useNotes";
import { useAuth } from "../../context/AuthProvider";
import { NavBar } from "../../components/NavBar/NavBar";
import { useOutletContext } from "react-router-dom";

export const MainPage = () => {
    const { user } = useAuth()
    const fitstFetch = useRef(true)
    const { isLoading, getNotes } = useNotes()
    const handleOpen: (value: boolean) => void = useOutletContext();

    if (fitstFetch.current && user !== null) {
        getNotes(user.notes)
        console.log(user.notes)
        fitstFetch.current = false
    }

    if (isLoading || user === undefined) {
        return "loading..."
    }

    return (
        <div className={styles["main"]}>
            <NavBar value="Info" isLoading={isLoading} handleOpen={handleOpen} />
            <div className={styles["main-body"]}>
                <h2>Привет дорогой друг!</h2>
                <p>Это приложение-блокнот для любых записей ! Можно использовать его как заметку для разработки или ещё чего-либо</p>
            </div>
        </div>
    );
}