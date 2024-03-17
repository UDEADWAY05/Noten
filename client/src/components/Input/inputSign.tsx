import styles from "./Input.module.scss"

interface funcProps {
    name: string,
    value: string
}

interface InputProps {
    name: string,
    value: string,
    onChange: (props: funcProps) => void,
    type: string,
    label: string,
    placeholder: string,
    required: boolean,
}

interface InputChangeEvent {
    target: HTMLInputElement;
}

export const InputSign = ({ name, value, onChange, type, label, placeholder, required }: InputProps) => {
    const handleChange = ({target}: InputChangeEvent) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className={styles["input-div"]}>
            <label htmlFor={name}><div className={styles["input-label"]}>
                {label}
                {required && <p className={styles["required"]}>*</p>}
            </div>
            </label>
            <div>
                <input className={styles["input"]} type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange} required={required} ></input>
            </div>
        </div>
    );
}
 
