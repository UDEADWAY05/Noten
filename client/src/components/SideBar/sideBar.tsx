import React, { useState } from "react";
import { Link } from "react-router-dom"
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import styles from "./SideBar.module.scss";
import logo from "../../assets/close.svg"

interface notes {
    id: string,
    title: String,
    text: string,
    userId: string,
    date: string
};

export const SideBar: React.FunctionComponent<{ notesArr: notes[] }> = ({ notesArr }) => {
    const [open, setOpen] = useState(false)
    const [deleteId, setDeleteId] = useState("")

    const handleOpen = (id: string) => {
        console.log(id)
        setDeleteId(id)
        setOpen(true)
    };
    const handleClose = () => setOpen(false)

    const handleDelete = () => {
        console.log("succsess delete note:", deleteId)
        handleClose()
    }

    return (<div className={styles["sideBar"]}>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles["sideBar-modal"]}
        >
            <div>
                <h1 className={styles["sideBar-modal-title"]}>Предупреждение</h1>
                <p className={styles["sideBar-modal-describe"]}>Если вы нажмете "Удалить", то данные навсегда пропадут. Удалить ?</p>
                <div className={styles["sideBar-modal-buttons"]}>
                    <button onClick={handleClose} className={styles["sideBar-button"]}>Отмена</button>
                    <button onClick={handleDelete} className={styles["sideBar-button-delete"]}>Удалить</button>
                </div>
            </div>
        </Modal>
        <div className={styles["sideBar-div"]}>
            <h1 className={styles["sideBar-title"]}>Notion</h1>
            <Divider style={{ borderColor :'#727272'}}/>
            {notesArr && notesArr.map((note) => {
                return <Link to={"/notion/" + String(note.id)} key={note.id} className={styles["sideBar-link"]}>
                    <div className={styles["sideBar-item"]}>
                        <h2 className={styles["sideBar-item-title"]}>{note.title}</h2>
                        <img src={logo} onClick={() => handleOpen(note.id)} className={styles["sideBar-icon"]}></img>
                    </div>
                    <Divider style={{ borderColor :'#727272'}}/>
                </Link>
            })}
        </div>
        <Divider orientation="vertical" style={{ borderColor: '#727272' }} />
    </div>);
}