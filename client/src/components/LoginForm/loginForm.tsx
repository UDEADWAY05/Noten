import { FormEvent, useEffect, useState } from "react";
import InputSign from "../../components/Input"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./Login.module.scss"
import validForm from "../../utils/validForm";
import { useAuth } from "../../context/AuthProvider";
import { useUsers } from "../../hooks/useUsers";

interface initialState {
    email: string,
    password: string
} 

const initialState = {
    password: "", email: ""
}

interface InputChangeProps {
    name: string,
    value: string
}

export const LoginForm = () => {
    const [state, setState] = useState(initialState)
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()
    const { signIn } = useAuth()
    const { error } = useUsers()

    const from = location.state?.from || '/'

    useEffect(() => {
        validForm(state, setIsValid)
    }, [state])


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        signIn(state.email, state.password, () => {
            navigate(from, {
                replace: true,
            })
        })
    }

    const handleChange = (target: InputChangeProps): void => {
        setState(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputSign
                label="Email"
                type="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Ваша почта"
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
            {error && <p>{error}</p>}
            <button type="submit" disabled={!isValid} className={styles["btn"]}>Отправить</button>
        </form>
    );
};