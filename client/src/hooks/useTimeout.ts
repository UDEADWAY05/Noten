import { useCallback, useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number) {
    const callbackRef = useRef<() => void>(callback);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
    }, [delay]);

    const clear = () => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        set();
        return clear;
    }, [set]);

    const reset = () => {
        clear();
        set();
    };

    return {
        reset,
        clear,
    };
}