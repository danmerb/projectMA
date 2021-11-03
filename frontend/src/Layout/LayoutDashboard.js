import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/auth-context'
import Dashboard from '../components/Dashboard'
import { Switch, useHistory } from 'react-router-dom'
import PictureWall from '../components/PictureWall'
import Contacts from '../components/expediente/Contacts'
import ContactForm from '../components/expediente/ContactForm'
import CustomCalendar from '../components/calendar/CustomCalendar'
import Receta from '../components/receta/Receta'
import ContactDetail from '../components/expediente/ContactDetail'

const LayoutDashboard = ({ exact, path }) => {
    const AuthCTX = useContext(AuthContext)
    const history = useHistory();

    const redireccionar = (ruta) => {
        history.push(ruta)
    }
    return (
        <Route exact={exact} path={path} render={(routeProps) => {
            if (!AuthCTX.currentUser) return <Redirect exact to="/login" />
            const cp =
                (<Dashboard path={routeProps.match.path} cb={redireccionar}>
                    <Switch>
                        <Route exact path={`${routeProps.match.path}/cita`} component={PictureWall} />
                        <Route exact path={`${routeProps.match.path}/expediente`} component={ContactForm} />
                        <Route exact path={`${routeProps.match.path}/expedientes`} component={Contacts} />
                        <Route exact path={`${routeProps.match.path}/expedientes/detail`} component={ContactDetail} />
                        <Route exact path={`${routeProps.match.path}/`} component={CustomCalendar} />
                        <Route exact path={`${routeProps.match.path}/imprimir`} component={Receta} />                       
                    </Switch>
                </Dashboard>)
            return cp
        }}
        />
    )
}

export default LayoutDashboard
