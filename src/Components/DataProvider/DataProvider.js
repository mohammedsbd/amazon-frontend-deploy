import React,{ createContext,useReducer} from"react"



export const DataContext=createContext()

export const DataProvider=({children,reducer,intitialstate})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,intitialstate)}>
        {children}
        </DataContext.Provider>
    )
}
