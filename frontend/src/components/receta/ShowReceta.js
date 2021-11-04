import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import ViewReceta from './ViewReceta'
import 'antd/dist/antd.css';
import { useReactToPrint } from 'react-to-print';
import '../../style/receta.css';
import { useHistory } from "react-router";

const ShowReceta = () => {

    const componentRef = useRef();
    const history2 = useHistory();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleNew= () => {    
        history2.push('/home/receta');
      };



    return (
        <div>
            <ViewReceta  ref={componentRef}/>
            <Space className="BotonImpr">
                <Button type="primary" onClick={handleNew}>Nueva receta</Button>
                <Button type="primary" onClick={handlePrint}>Imprimir receta</Button>
            </Space>
            
            
            
        </div>
    );
}

export default ShowReceta;