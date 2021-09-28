import React, { useContext } from 'react'
import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/auth-context'

const Layout = ({exact, path, component:Component, ...props}) => {
    const AuthCTX = useContext(AuthContext)
    return (
        <Route
            exact={exact}
            path={path}
            render={()=>{
                if(!AuthCTX.currentUser) return <Redirect exact to="/login"/>
                const cp =(<Component {...props}/>)
                return cp
            }}
        />   
    )
}

export default Layout
