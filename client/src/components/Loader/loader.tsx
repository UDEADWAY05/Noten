import styles from "./Loader.module.scss"

export const Loader = () => {
    return <div className={styles["div-loading-circle"]}>
        <div className={styles["circle"]}></div>
    </div>
}
