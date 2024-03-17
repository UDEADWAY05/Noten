import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import styles from "./Editor.module.scss"

interface handleChangeProps {
    name: string,
    value: string
}

interface EditorProps {
    value: string,
    onChange: (target: handleChangeProps) => void,
}

export const Editor = ({ value, onChange }: EditorProps) => {

    const handleChange = () => {
        onChange({ name: "text", value: JSON.stringify(editor.document)})
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: value ? JSON.parse(value) as PartialBlock[] : undefined
        
    })

    return (
        <div className={styles["Editor"]}>
            <BlockNoteView editor={editor}
                onChange={handleChange}
            />
        </div>
    );
}