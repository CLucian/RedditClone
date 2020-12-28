import React from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastContext = React.createContext()

toast.configure()
export default class ToastProvider extends React.Component {
    constructor() {
        super()
    }

    postSuccess = () => {
        toast('Basic Notif')
    }

    render() {
        return (
            <ToastContext.Provider
                value={{
                    notify: this.notify,
                }}
            >
                <ToastContainer
                    autoClose={2000}
                    position="top-center"
                    className="toast-container"
                    toastClassName="dark-toast"
                />
                {this.props.children}
            </ToastContext.Provider>
        )
    }
}
