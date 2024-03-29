import { UndoRedo, BoldItalicUnderlineToggles, CodeToggle, } from "@mdxeditor/editor";
import styles from "./ToolBar.module.scss"
import { AppBar, Divider } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';

export const ToolBarComp = () => {
    return (
        <Toolbar>
            <div className={styles["toolBar"]}>
                <UndoRedo />
                <Divider orientation="vertical" variant="middle" flexItem />
                <BoldItalicUnderlineToggles />
                <Divider orientation="vertical" variant="middle" flexItem />
                <CodeToggle />
                <Divider orientation="vertical" variant="middle" flexItem />
            </div>
        </Toolbar>
    );
}