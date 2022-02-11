import React, { createContext, useState } from 'react'
export const Context = createContext();

const ContextProvider = (props) => {
    return (
        <Context.Provider value={{
           
        }}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider