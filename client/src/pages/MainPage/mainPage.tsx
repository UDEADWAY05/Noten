import styles from "./MainPage.module.scss"
import { NavBar } from "../../components/NavBar/NavBar";
import { useOutletContext } from "react-router-dom";
import Editor from "../../components/Editor";
import { PropsOutletContext } from "../../types/PropsOutletContext";


export const MainPage = () => {
    const { handleOpen }: PropsOutletContext = useOutletContext();
    
    const value = "## Привет Notion!\n\nэто приложение для заметок или записей вот что есть у него под капотом: \n\n* React\n* PWA\n* Dexie JS\n* indexedDB\n\nТут есть несколько плагинов для markdown. Несколько для примера:\n\nсписок (нажать \"-\" и пробел на клавиатуре):\n\n* элемент 1\n* элемент 2\n* элемент 3\n\nили с цифрами (поставить цифру 1 и точку вот так \"1.\" и нажать пробел на клавиатуре):\n\n1. &#x20;Раз\n2. &#x20;Два\n3. &#x20;Три"

    return (
        <div className={styles["main"]}>
            <NavBar value="Привет Notion!" isLoading={false} readOnly={true} handleOpen={handleOpen} />
            <div className={styles["main-body"]}>
                <Editor value={value} readOnly={true} isLoading={false} />
            </div>
        </div>
    );
}