import { createContext, useContext, useState } from "react";
import MySnackBar from '../components/MySnackBar';


const ToastContext = createContext({})

export const useToast = () =>{
    return useContext(ToastContext)
}
export const ToastProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function showHideToast(message) {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 2500)
        setMessage(message)
    }


    return (
        <ToastContext.Provider value={{ showHideToast }}>
            <MySnackBar open={open} message={message} />
            {children}
        </ToastContext.Provider>
    )
}
