import styles from "./Search.module.scss"
import icon from "../../assets/img/search_icon.png"

interface SearchProps {
    value: string
    onChange: (abc: string) => void
}

interface InputChangeEvent {
    target: HTMLInputElement;
}

export const Search = ({
    value, onChange 
}: SearchProps) => {

    const handleChange = ({ target }: InputChangeEvent ) => {
        onChange(target.value)
    }

    return (<div className={styles["search"]}>
        <img src={icon} className={styles["search-icon"]} />
        <input className={styles["search-input"]} value={value} onChange={handleChange} placeholder="Search">
        </input>
    </div>);
}
 
