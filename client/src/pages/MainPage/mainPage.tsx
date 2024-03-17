
import api from "../../api/notes.json"
import SideBar from "../../components/SideBar";
import styles from "./MainPage.module.scss"

export const MainPage = () => {
    return (
        <div className={styles["main"]}>
            <SideBar notesArr={api} />
            <div className={styles["main-body"]}>
                <h2>Привет дорогой друг!</h2>
                <p>Это приложение-блокнот для любых записей ! Можно использовать его как заметку для разработки или ещё чего-либо</p>
            </div>
        </div>
    );
}