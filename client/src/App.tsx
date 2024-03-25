import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainField from "./pages/MainField";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginRoute } from "./components/LoginRoute";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Routes>
                <Route path="/" element={<InfoPage />} />  
                <Route path="/notion/" element={<PrivateRoute><HomePage /></PrivateRoute>}>
                    <Route index element={<PrivateRoute><MainPage /></PrivateRoute>} />
                    <Route path=":id" element={<PrivateRoute><MainField /></PrivateRoute>} />
                </Route>
                <Route path="/login" element={<LoginRoute><LoginPage /></LoginRoute>} />
            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
