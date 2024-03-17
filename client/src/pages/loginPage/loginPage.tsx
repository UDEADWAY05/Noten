import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import InputSign from "../../components/Input"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./Login.module.scss"
import validForm from "../../utils/validForm";

interface initialState {
    login: string,
    password: string
} 

const initialState = {
    login: "", password: ""
}

interface InputChangeProps {
    name: string,
    value: string
}

export const LoginPage = () => {
    const [state, setState] = useState(initialState)
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()

    const from = location.state?.from || '/'

    useEffect(() => {
        validForm(state, setIsValid)
    }, [state])


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    }

    const handleChange = (target: InputChangeProps): void => {
        setState(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return (
        <div className={styles["formDiv"]}>
            <h1 className={styles["formDiv-title"]}>Вход</h1>
            <form onSubmit={handleSubmit}>
                <InputSign
                    label="Login"
                    type="login"
                    name="login"
                    value={state.login}
                    onChange={handleChange}
                    placeholder="Ваш login"
                    required={true}
                />
                <InputSign
                    label="Пароль"
                    type="password"
                    name="password"
                    value={state.password}
                    placeholder="Ваш пароль"
                    onChange={handleChange}
                    required={true}
                />
                <button type="submit" disabled={!isValid} className={styles["btn"]}>Отправить</button>
            </form>
        </div>
    );
};