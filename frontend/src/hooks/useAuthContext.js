import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuthContextr = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }
}