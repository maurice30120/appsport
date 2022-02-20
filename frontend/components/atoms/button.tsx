import * as React from "react";



export const Button = ({ onClick, children }) => {

    return (
        <button onClick={onClick} href="" className="bg-blue-500 rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
            {children}
        </button>)
}