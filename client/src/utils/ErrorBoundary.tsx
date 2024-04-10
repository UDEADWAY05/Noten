import { Component, ReactNode, Suspense, lazy } from "react";
import { Loader } from "../components/Loader";

const ErrorPage = lazy(() => import("../pages/errorPage"))

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {
            hasError: true,
        }
    }

    componentDidCatch(error: Error): void {
        console.log("##### Error:", error.message)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <Suspense fallback={<Loader/>}>
                <ErrorPage />
            </Suspense>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;