import { useEffect } from "react";
import { useTimeout } from "./useTimeout";


export function useDebounce(callback: () => void, delay: number, dependecies: any) {
    const { reset, clear } = useTimeout(callback, delay)
    useEffect(reset, [...dependecies, reset])
    useEffect(clear, [])
}