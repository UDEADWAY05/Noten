import styles from "./Heading.module.scss"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Skeleton from '@mui/material/Skeleton';

interface handleChangeProps {
    name: string,
    value: string
}

interface HeadingProps {
    value: string | undefined,
    onChange: (target: handleChangeProps) => void,
    isLoading: boolean
}

export const Heading = ({ value, onChange, isLoading }: HeadingProps) => {

    if (isLoading || value === undefined) {
        return <Skeleton variant="text" sx={{ fontSize: "48px", backgroundColor: "#83838361", marginX: "54px" }}/>
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({ name: "title", value: event.target.value })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return <>
            <TextareaAutosize
                className={styles["ToolBar"]}
                aria-label="Demo input"
                onKeyDown={onKeyDown}
                placeholder="Untitled"
                value={value}
                onChange={handleChange}
            />
    </>
};