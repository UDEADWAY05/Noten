import {
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    quotePlugin, 
    MDXEditorMethods
} from "@mdxeditor/editor";
import styles from "./Editor.module.scss"
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useRef, useState } from "react";

interface handleChangeProps {
    name: string,
    value: string
}

interface EditorProps {
    value: string | undefined,
    onChange?: (target: handleChangeProps) => void,
    isLoading: boolean
    readOnly?: boolean
}

export const Editor = ({ value, onChange, isLoading, readOnly = false }: EditorProps) => {
    const [text, setText] = useState<string | undefined>(value)
    const editorRef = useRef<MDXEditorMethods>(null)

    useEffect(() => {
        if (value !== undefined) {
            setText(value)
            editorRef.current?.setMarkdown(value)
        }
    }, [value])

    if (isLoading || text === undefined) {
        return <div className={styles["Editor"]}>
            <Skeleton
                variant="rounded"
                sx={{ backgroundColor: "#83838361", marginX: "54px" }}
                height={156}
            />
        </div>
    } 

    const handleChange = (content: string) => {
        if (content !== undefined && onChange !== undefined) {
            setText(content)
            onChange({ name: "text", value: content})
        } 
    }

    const handleBlur = () => {
        editorRef.current?.getMarkdown()
    }

    return (
        <MDXEditor
            markdown={text}
            ref={editorRef}
            readOnly={readOnly}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                linkPlugin(),
            ]}
            onChange={handleChange}
            onBlur={handleBlur}
            contentEditableClassName={styles["editor"]}
        
        />
    );
}