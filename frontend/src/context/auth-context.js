import {createContext} from 'react'

const AuthContext = createContext({
    currentUser: {},
    register: (username, email, password)=>{},
    login: (email, password)=>{},
    resetPasword: (email)=>{},
    logout: ()=>{}
});
AuthContext.displayName = "ContextoCool"
export default AuthContext;