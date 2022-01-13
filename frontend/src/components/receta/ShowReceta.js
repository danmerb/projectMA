import React, { useRef, useState,useEffect } from 'react';
import { Button, Space } from 'antd';
import ViewReceta from './ViewReceta'
import 'antd/dist/antd.css';
import { useReactToPrint } from 'react-to-print';
import '../../style/receta.css';
import { useHistory } from "react-router";

const ShowReceta = () => {
    const componentRef = useRef();
    const [receta, setReceta] = useState({});
    const history2 = useHistory();

    useEffect(() => {
        setReceta(history2.location.state)
        
    },[]);
    
    console.log(receta);
    //funcion para imprimir la receta manda a llamar al componente viewReceta.js con su referencia
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // handle new function 
    const handleNew= () => {    
        history2.push('/home/receta');
      };

      



    return (
        <div>

            <ViewReceta  ref={componentRef}  />
            <Space className="BotonImpr" style = {{marginBottom: "2em"}}>
                
                <Button type="primary" onClick={handleNew}>Nueva receta</Button>
                <Button type="primary" onClick={handlePrint}>Imprimir receta</Button>
            </Space>
            
            
            
        </div>
    );
}






export default ShowReceta;