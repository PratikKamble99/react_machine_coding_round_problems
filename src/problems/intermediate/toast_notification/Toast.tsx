import React from "react";
import { useToast } from "./ToastContext";

const Toast = () => {
    // const { show, showToast } = useToast();
    const { toast } = useToast();
    return (
        <div>
            <h1>Toast</h1>
            <button
                onClick={
                    () =>
                        toast("Event has been created", {
                            type: "INFO",
                            // action: {
                            //     label: "undo",
                            //     cb() {
                            //         console.log("Undo...");
                            //     },
                            // },
                        })
                    // showToast("Event has been created", {
                    //     type: "ERROR",
                    //     description: "Test toast description",
                    //     action: {
                    //         label: "Undo",
                    //         cb: () => console.log("undo"),
                    //     },
                    // })
                }
            >
                Show Toast
            </button>
            {/* {show && (
                <div className="p-2 border absolute top-5 right-5">
                    Toast_title
                </div>
            )} */}
        </div>
    );
};

export default Toast;
