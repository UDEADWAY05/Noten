import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./Login.module.scss"
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";


export const LoginPage = () => {
    const [state, setState] = useState(true)
    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from || '/'

    const handleClick = () => setState(prevState => !prevState)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    }

    return (
        <div className={styles["formDiv"]}>
            {state ? <>
                    <h1 className={styles["formDiv-title"]}>Вход</h1>
                    <LoginForm />
                    <p className={styles["formDiv-swap"]} onClick={handleClick}>Регистрация</p>
                </> : <>
                    <h1 className={styles["formDiv-title"]}>Регистрация</h1>
                    <RegisterForm />
                    <p className={styles["formDiv-swap"]} onClick={handleClick}>Войти</p>
                </>
            }
        </div>
    );
};