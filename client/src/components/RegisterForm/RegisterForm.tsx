import { FormEvent, useEffect, useState } from "react";
import InputSign from "../../components/Input"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./Login.module.scss"
import validForm from "../../utils/validForm";
import { Avatar } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";

const initialState = {
    name: "",
    login: "",
    password: "",
    email: "",
    avatar: "",
}

interface InputChangeProps {
    name: string,
    value: string
}

export const RegisterForm = () => {
    const [state, setState] = useState(initialState)
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()
    const { signUp } = useAuth()

    const from = location.state?.from || '/'

    useEffect(() => {
        validForm(state, setIsValid)
    }, [state])


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        signUp({ ...state, notes: [] }, () => {
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
        <form onSubmit={handleSubmit} className={styles["formDiv"]}>
            <Avatar src={state.avatar} sx={{ width: 128, height: 128 }}/>
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
            <InputSign
                label="Email"
                type="email"
                name="email"
                value={state.email}
                placeholder="Ваша почта"
                onChange={handleChange}
                required={true}
            />
            <InputSign
                label="Имя"
                type="name"
                name="name"
                value={state.name}
                placeholder="Ваше имя"
                onChange={handleChange}
                required={true}
            />
            <InputSign
                label="Аватар (необязательно)"
                type="avatar"
                name="avatar"
                value={state.avatar}
                placeholder="Ссылка на картинку"
                onChange={handleChange}
                required={false}
            />
            <button type="submit" disabled={!isValid}>Отправить</button>
        </form>
    );
};