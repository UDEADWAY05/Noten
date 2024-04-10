import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainField from "./pages/MainField";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginRoute } from "./components/LoginRoute";
import NotFoundPage from "./pages/NotFoundPage/notFoundPage";
import { RouteWithErrorBoundary } from "./components/RouteWithErrorBoundary";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Routes>
                <Route path="/" element={<InfoPage />} />  
                <Route path="/notion/" element={<PrivateRoute><HomePage /></PrivateRoute>}>
                    <Route index element={<RouteWithErrorBoundary><PrivateRoute><MainPage /></PrivateRoute></RouteWithErrorBoundary>} />
                    <Route path=":id" element={
                        <RouteWithErrorBoundary>
                            <PrivateRoute>
                                <MainField />
                            </PrivateRoute>
                        </RouteWithErrorBoundary>
                    } />
                    <Route path="*" element={
                        <RouteWithErrorBoundary>
                            <PrivateRoute>
                                <NotFoundPage />
                            </PrivateRoute>
                        </RouteWithErrorBoundary>
                    } />
                </Route>
                <Route path="/login" element={<LoginRoute><LoginPage /></LoginRoute>} />
            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
