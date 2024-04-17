import { useState } from "react";
import styles from "./Login.module.scss"
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";


export const LoginPage = () => {
    const [state, setState] = useState(true)
    const handleClick = () => setState(prevState => !prevState)

    return (
        <div className={styles["formDiv"]}>
            <div className={styles["formDiv-body"]}>
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
        </div>
    );
};