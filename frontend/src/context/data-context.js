import {createContext} from 'react'

const ExpedientesContext = createContext({
    expedientes: [],
    citas:[],
    receta:[]
});
ExpedientesContext.displayName = "ExpedientesContext"
export default ExpedientesContext;