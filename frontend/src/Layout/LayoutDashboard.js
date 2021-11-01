import React, { useContext } from 'react'
import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/auth-context'
import Dashboard from '../components/Dashboard'
import { Switch, useHistory } from 'react-router-dom'
import PictureWall from '../components/PictureWall'
import Contacts from '../components/expediente/Contacts'
import CustomCalendar from '../components/calendar/CustomCalendar'

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
                        <Route exact path={`${routeProps.match.path}/cita`} component={PictureWall}/>
                        <Route exact path={`${routeProps.match.path}/expediente`} component={Contacts}/>
                        <Route exact path={`${routeProps.match.path}/calendario`} component={CustomCalendar}/>                        
                    </Switch>
                </Dashboard>)
                return cp
            }}
        />   
    )
}

export default LayoutDashboard
