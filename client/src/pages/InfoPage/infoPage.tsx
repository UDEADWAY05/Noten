import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import styles from "./Info.module.scss"

export const InfoPage = () => {
    return (
        <div className={styles["info-div"]}>
            <h1>Notion-app</h1>
            <div className={styles["info-div-about"]}>
                <img src={logo} className={styles["info-img"]}></img>
                <div className={styles["info-div-about-right"]}>
                    <h1 className={styles["info-title"]}>Про приложение</h1>
                    <p className={styles["info-describe"]}>Это приложение-блокнот было разработа как задание к одному из заданий на курсе Result School. Для использования этого приложения нужно будет войти в аккаунт или создать новый.</p>
                </div>
            </div>
            <Link to={"notion"} className={styles["info-button"]}>
                Далее
            </Link>
        </div>
    );
};

//https://www.flaticon.com/ru/free-icon/book_3330314?related_id=3330314&origin=search