import React, { useContext } from 'react'
import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/auth-context'
import Dashboard from '../components/Dashboard'
import { Switch, useHistory } from 'react-router-dom'
import Calendario  from '../components/Calendar'
import PictureWall from '../components/PictureWall'

const LayoutDashboard = ({exact, path, ...props}) => {
    const AuthCTX = useContext(AuthContext)
    const history = useHistory();

    const redireccionar = (ruta) =>{
        history.push(ruta)
    }
    return (
        <Route exact={exact} path={path} render={(routeProps)=>{
                console.log(routeProps)
                if(!AuthCTX.currentUser) return <Redirect exact to="/login"/>
                const cp =
                (<Dashboard path={routeProps.match.path} cb={redireccionar}>
                    <Switch>
                        <Route exact path={`${routeProps.match.path}/`}  />
                        <Route exact path={`${routeProps.match.path}/expediente`} component={PictureWall}/>
                        <Route exact path={`${routeProps.match.path}/calendario`} component={Calendario}/>
                    </Switch>
                </Dashboard>)
                return cp
            }}
        />   
    )
}

export default LayoutDashboard