import styles from "./NavBar.module.scss"
import { useRef, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import menu from "../../assets/img/menu.svg"
interface handleChangeProps {
    name: string,
    value: string
}
interface NavBarProps {
    value: string | undefined,
    onChange?: (target: handleChangeProps) => void
    isLoading: boolean,
    handleOpen: (value: boolean) => void,
    readOnly: boolean,
}

export const NavBar = ({ value, onChange, isLoading, handleOpen, readOnly }: NavBarProps) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState<string>(value || "Untitled")

    const inputRef = useRef<HTMLInputElement>(null)

    if (isLoading || value === undefined) {
        return <div className={styles["navBar"]}>
            <Skeleton
                variant="text"
                sx={{ backgroundColor: "#83838361" }}
                height={32}
                width={150}
            />
        </div> 
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const enableInput = () => {
        setTitle(value)
        setEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput = () => {
        setEditing(false)
        if (onChange !== undefined && title !== value) {
            onChange({ name: "title", value: title || "Untitled" })
        }
    }

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            disableInput()
        }
    }

    return (<div className={styles["navBar"]}>
        <img alt="menu" className={styles["navBar-img"]} src={menu} onClick={() => handleOpen(true)}/>
        {editing && !readOnly ? <input
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onKeyDown={onKeyDown}
                className={styles["navBar-input"]}
                aria-label="Demo input"
                placeholder="title"
                value={title}
                onChange={handleChange}
            />
            : <button
                onClick={enableInput}
                className={styles["navBar-button"]}
            >
                <p className={styles["navBar-title"]}>{value || title }</p>
            </button>
        }
        </div>
    );
};