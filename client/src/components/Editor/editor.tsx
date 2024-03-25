import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import styles from "./Editor.module.scss"
import Skeleton from '@mui/material/Skeleton';

interface handleChangeProps {
    name: string,
    value: string
}

interface EditorProps {
    value: string | undefined,
    onChange: (target: handleChangeProps) => void,
    isLoading: boolean
}

export const Editor = ({ value, onChange, isLoading }: EditorProps) => {

    console.log(isLoading || value === undefined)

    if (isLoading || value === undefined) {
        return <div className={styles["Editor"]}>
            <Skeleton
                variant="rounded"
                sx={{ backgroundColor: "#83838361", marginX: "54px" }}
                height={156}
            />
        </div>
    } 

    const handleChange = () => {
        onChange({ name: "text", value: JSON.stringify(editor.document)})
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: value ? JSON.parse(value) as PartialBlock[] : undefined,
    })

    return (<div className={styles["Editor"]}>
        <BlockNoteView editor={editor}
            onChange={handleChange}
        />
    </div>
    );
}