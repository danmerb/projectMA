import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

const ContactDetail = (props) => {
    const history = useHistory();
    const [paciente, setPaciente] = useState(null)
    
    useEffect(() => {
        if(history.location.state && history.location.state.paciente){
            setPaciente(history.location.state.paciente);
        }else{
            history.push("/home")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default ContactDetail
