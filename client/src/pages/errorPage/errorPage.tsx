import { useOutletContext } from "react-router-dom";
import sleep from "../../assets/img/sleep.png"
import { NavBar } from "../../components/NavBar/NavBar";
import { PropsOutletContext } from "../../types/PropsOutletContext";
import styles from "./Error.module.scss"

export const ErrorPage = () => {
    const { handleOpen }: PropsOutletContext = useOutletContext();
    return (
        <div className={styles["error"]}>
            <NavBar
                value={"Error"}
                readOnly={false}
                isLoading={false}
                handleOpen={handleOpen}
            />
            <div className={styles["error-div"]}>
                <img alt="ZZZ" className={styles["error-img"]} src={sleep} />
                <h1 className={styles["error-title"]}>Ой! Что-то пошло не так!</h1>
                <p className={styles["error-description"]}>
                    — Произошла ошибка пожалуйста перейдите на другую вкладку!
                    Наши програмисты уже решают проблему.
                </p>
            </div>
        </div>
    );
};