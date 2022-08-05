import React, { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps{
    children: ReactNode;
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData{
    user: User;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps){

    const user = {
        id: '1',
        name: 'Renan Cardoso',
        email: 'renan@gmail.com'
    };

    async function signInWithGoogle(){
        try {
            const CLIENT_ID = '';
            const REDIRECT_URI = '';
            const RESPONSE_TYPE = '';
            const SCOPE = '';

            const authUrl = ''
        }catch(error){
            throw new Error(error)
        }

    }

    return(
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>  
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context;
}

export{ AuthProvider, useAuth }