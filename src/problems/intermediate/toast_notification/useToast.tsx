import React, { useEffect, useRef, useState } from "react";
import type { Toast } from "./ToastContext";

// Use when there only one toast at time showing
const useToast = () => {
    const [show, setShow] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!show) return;
        console.log(show);
        timeoutRef.current = setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => clearTimeout(timeoutRef.current!);
    }, [show]);

    function showToast(title: string, { action, description, type }: Toast) {
        console.log(title, description, type);
        setShow(true);
    }

    return { show, showToast };
};

export default useToast;
