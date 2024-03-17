import styles from "./Heading.module.scss"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

interface handleChangeProps {
    name: string,
    value: string
}

interface HeadingProps {
    value: string,
    onChange: (target: handleChangeProps) => void,
}

export const Heading = ({ value, onChange }: HeadingProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ name: "title", value: event.target.value })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return <TextareaAutosize
        className={styles["ToolBar"]}
        aria-label="Demo input"
        onKeyDown={onKeyDown}
        placeholder="Empty"
        value={value}
        onChange={handleChange}
    />;
};