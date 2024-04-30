import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoginRoute } from "./components/LoginRoute";
import { RouteWithErrorBoundary } from "./components/RouteWithErrorBoundary";
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import { MainPage } from "./pages/mainPage";
import { MainFieldPage } from "./pages/mainFieldPage";
import { InfoPage } from "./pages/infoPage";
import { LoginPage } from "./pages/loginPage";
import { HelloPage } from "./pages/helloPage";
import { NotFoundPage } from "./pages/notFoundPage";
import "../404.html"

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
                    <HelloPage />
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
                                <MainFieldPage />
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
