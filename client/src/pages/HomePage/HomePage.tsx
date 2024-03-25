import { Outlet, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useAuth } from "../../context/AuthProvider";
import Drawer from '@mui/material/Drawer';
import { useState } from "react";
import styles from "./Home.module.scss"

export const HomePage = () => {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)

    const handleOpen = (value: boolean) => {
        setOpen(value)
    }

    return (<>
        <div className={styles["home-sideBar"]}>
            <SideBar notesArr={user!.notes} />
        </div>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <SideBar onOpenSideBar={handleOpen} notesArr={user!.notes} />
        </Drawer>
        <Outlet context={handleOpen} />
    </>);
}