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
import DataProvider from "../context/DataProvider"
import RecetaFormulario from '../components/receta/RecetaFormulario'
import ShowReceta from '../components/receta/ShowReceta'
import ContactEdit from '../components/expediente/ContactEdit'

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
                (
                <DataProvider>
                    <Dashboard path={routeProps.match.path} cb={redireccionar}>
                        <Switch>
                            <Route exact path={`${routeProps.match.path}/cita`} component={PictureWall} />
                            <Route exact path={`${routeProps.match.path}/expediente`} component={ContactForm} />
                            <Route exact path={`${routeProps.match.path}/expedientes`} component={Contacts} />
                            <Route exact path={`${routeProps.match.path}/expedientes/detail`} component={ContactDetail} />
                            <Route exact path={`${routeProps.match.path}/expedientes/edit`} component={ContactEdit} />
                            <Route exact path={`${routeProps.match.path}/`} component={CustomCalendar} />
                            <Route exact path={`${routeProps.match.path}/imprimir`} component={Receta} />
                            <Route exact path={`${routeProps.match.path}/receta`} component={RecetaFormulario} />
                            <Route exact path={`${routeProps.match.path}/vistaReceta`} component={ShowReceta} />
                        </Switch>
                    </Dashboard>
                </DataProvider>
                )
            return cp
        }}
        />
    )
}

export default LayoutDashboard
