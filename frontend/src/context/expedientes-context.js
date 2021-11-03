import {createContext} from 'react'

const ExpedientesContext = createContext({
    expedientes: []
});
ExpedientesContext.displayName = "ExpedientesContext"
export default ExpedientesContext;