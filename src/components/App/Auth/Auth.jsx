import { createContext, useContext, useEffect, useState } from "react";

//create context leverer et object
export const AuthContext = createContext()

//definerer ContextProvider med children som tilstandsværdi
//Shortcut for props.children, fordi vi ikke kalder AuthProvider med nogle properties fx props.title
//Children er obligatorisk og er derfor altid med
export const AuthProvider = ({ children }) => {
    //værdi og en function til at sætte den værdi med
    const [loginData, setLoginData] = useState('')

    
    useEffect(() => {
        //hvis der er noget i sessionStorage
        if (sessionStorage.getItem('token')) {
            //så skal den skifte loginData og konvertere det til et javascript object
            setLoginData(JSON.parse(sessionStorage.getItem('token')))
        }
        //children som dependency array 
    }, [children]);

    return (
        //property der er provider //de yderste {} er JSX og de inderste er et object
        //Alle Children af denne får adgang til loginData 
        //provider er en metode 
        <AuthContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom auth hook 
//bruger den til at transportere data igennem systemet
/** Definerer custom hook
 * Gør at vi kan jakde context
 * eksempel: context { loginData } = udeAuth
 */
export const useAuth = () => useContext(AuthContext)
