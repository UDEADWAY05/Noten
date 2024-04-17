import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginRoute } from "./components/LoginRoute";
import { RouteWithErrorBoundary } from "./components/RouteWithErrorBoundary";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import { MainPage } from "./pages/MainPage";
import { MainField } from "./pages/MainField";
import { InfoPage } from "./pages/InfoPage";
import { LoginPage } from "./pages/loginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";


function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Routes>
                <Route path="/" element={
                  <Suspense fallback={<Loader />}>
                    <InfoPage />
                  </Suspense>
                } />  
                <Route path="/notion/" element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }>
                    <Route index element={
                        <RouteWithErrorBoundary>
                            <PrivateRoute>
                                <MainPage />
                            </PrivateRoute>
                        </RouteWithErrorBoundary>
                    } />
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
                <Route path="/login" element={<LoginRoute>
                    <Suspense fallback={<Loader />}>
                        <LoginPage />
                    </Suspense>
                </LoginRoute>} />
            </Routes>
        </AuthProvider>
    </div>
  )
}

export default App
