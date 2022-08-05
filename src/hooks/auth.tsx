import React, { createContext, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import Storage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  photo?: string;
}

interface IAuthContext {
  user: IUser;
  GoogleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean
}

interface AuthorizationResponse{
    params:{
        access_token: string;
    };
    type: string;

}


const storageCollectionKey = '@gofinances:user'

const AuthContext = createContext({} as IAuthContext)

function AuthProvider({ children }: IAuthProviderProps) {
const [user, setUser] = useState<IUser>({} as IUser);
const [isLoading, setIsLoading] = useState(true);

const userStorageKey = '@gofinances:user'

  async function GoogleSignIn(): Promise<void> {
    try {
      const CLIENT_ID  = '66891574582-jqaru31gkldamm32b7v48dtp2jirpouv.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@renancard/gofinances'
      const GOOGLE_END_POINT = 'https://accounts.google.com/o/oauth2/v2/auth'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `${GOOGLE_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const {type, params} = await AuthSession
      .startAsync({authUrl}) as AuthorizationResponse;

      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        
        const userLogged = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            photo: userInfo.picture
        }

        setUser({
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            photo: userInfo.picture
        })
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    
    } catch (err) {
      throw new Error(String(err))
    }
  }

  async function signOut(){
    setUser({} as IUser)
    await AsyncStorage.removeItem(userStorageKey)
  }


useEffect(() => {
    async function loadUserStorageData(){
        const userStorage = await AsyncStorage.getItem(userStorageKey)
        console.log(userStorage)
        if(userStorage){
            const userLogged = JSON.parse(userStorage) as IUser
            setUser(userLogged)
        }
        setIsLoading(false);
    }

    loadUserStorageData()
},[])


  return (
    <AuthContext.Provider
      value={{ user, GoogleSignIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('UseAuth Hook must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }