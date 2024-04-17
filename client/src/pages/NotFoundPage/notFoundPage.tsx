import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"
import styles from "./NotFound.module.scss"
import { NavBar } from "../../components/NavBar/NavBar";
import { PropsOutletContext } from "../../types/PropsOutletContext";

export const NotFoundPage = () => {
    const navigate = useNavigate()
    const [number, setNumber] = useState(3)
    const { handleOpen }: PropsOutletContext = useOutletContext();

    useEffect(() => {
        setTimeout(() => {
            navigate('/notion')
        }, 3000)
        const interval = setInterval(() => {
            setNumber(prevState => prevState - 1)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return ( <div className={styles["notFound"]}>
        <NavBar value="Страница не найдена" isLoading={false} readOnly={true} handleOpen={handleOpen} />
        <div className={styles["notFound-div"]}>
        <p className={styles["notFound-title"]}>404</p>
        <p className={styles["notFound-description"]}>Страница не найдена. Вы будете перенаправлены через {number}...</p>
    </div></div>);
};