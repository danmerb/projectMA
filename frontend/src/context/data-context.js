import {createContext} from 'react'

const ExpedientesContext = createContext({
    expedientes: [],
    citas:[]
});
ExpedientesContext.displayName = "ExpedientesContext"
export default ExpedientesContext;