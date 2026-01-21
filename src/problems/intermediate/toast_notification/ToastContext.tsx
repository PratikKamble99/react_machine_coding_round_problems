import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

interface ToastContextValues {
    toast: (title: string, { action, description, type }: Toast) => void;
}

const ToastContext = createContext<ToastContextValues | undefined>(undefined);

export interface Toast {
    type?: "SUCCESS" | "ERROR" | "INFO" | "WARNING";
    description?: string;
    action?: Action;
}

export interface Action {
    label: string;
    cb: () => void;
}

interface ToastItem extends Toast {
    title: string;
    id: number;
}

function getToastColor(color: Toast["type"] = "SUCCESS") {
    switch (color) {
        case "WARNING":
            return "yellow";

        case "ERROR":
            return "red";

        case "INFO":
            return "blue";

        default:
            return "green";
    }
}

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    // const [show, setShow] = useState(false);
    const [toastList, setToastList] = useState<ToastItem[]>([]);

    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!toastList) return;
        // console.log(toastList);
        timeoutRef.current = setTimeout(() => {
            const updated = [...toastList];
            updated.shift();
            setToastList(updated);
        }, 2000);

        return () => clearTimeout(timeoutRef.current!);
    }, [toastList]);

    function toast(title: string, { action, description, type }: Toast = {}) {
        // console.log(title, description, type);
        // setShow(true);
        const newToast: ToastItem = {
            title,
            description,
            type,
            action,
            id: Math.random(),
        };

        setToastList((prev) => [...prev, newToast]);
    }

    return (
        <ToastContext.Provider value={{ toast }}>
            {/* {show && (
                <div className="p-2 border absolute top-5 right-5">
                    Toast_title
                </div>
            )} */}
            {toastList.map((item, i) => (
                <div
                    key={item.id}
                    className={`p-2 border absolute right-5 text-white`}
                    style={{
                        top: `${i * 50}px`,
                        backgroundColor: getToastColor(item.type),
                    }}
                >
                    {item.title}
                    {item.id}
                    {item.action && (
                        <div onClick={item.action.cb}>{item.action.label}</div>
                    )}
                </div>
            ))}
            {children}
        </ToastContext.Provider>
    );
};

// Use when multiple toast at time showing
export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return { ...context };
};

export default ToastProvider;
