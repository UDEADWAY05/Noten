import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainField from "./pages/MainField";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/loginPage";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Routes>
                <Route path="/" element={<InfoPage />} />  
                <Route path="/notion" >
                    <Route index element={<MainPage />} />
                    <Route path=":id" element={<MainField />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
