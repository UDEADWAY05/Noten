import { Dispatch, SetStateAction } from "react";
import { INote } from "./INote";

export interface PropsOutletContext {
    handleOpen: () => void,
    setNotesArray: Dispatch<SetStateAction<INote[]>>
}