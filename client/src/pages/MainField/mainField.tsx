import { useParams } from "react-router-dom";
import styles from "./MainField.module.scss"
import api from "../../api/notes.json"
import { useState, useEffect } from "react";
import Editor from "../../components/Editor";
import { PartialBlock } from "@blocknote/core";
import Heading from "../../components/HeadingBar";
import SideBar from "../../components/SideBar";


interface notes {
    id: string,
    title: string,
    text: string,
    userId: string,
    date: string
}

interface handleChangeProps {
    name: string,
    value: string | PartialBlock[],
}

export const MainField = () => {
    const { id } = useParams()
    const note: notes = api.filter((el) => el.id === id)[0]
    const [mes, setMes] = useState(note)

    //костыль для note
    useEffect(() => {
        setMes(note)
    }, [note])
    ///

    const handleChange = ({ name, value }: handleChangeProps) => {
        setMes((prevState) => ({ ...prevState, [name]: value }))
    }

    return (
        <>
            <SideBar notesArr={api}/>
            <div className={styles["MainField"]}>
                <Heading value={mes.title} onChange={handleChange} />
                <Editor value={mes.text} onChange={handleChange} />
            </div>
        </>
    );
};

//https://www.youtube.com/watch?v=0OaDyjB9Ib8

//6:07:01

