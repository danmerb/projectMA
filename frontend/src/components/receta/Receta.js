import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import MedicineList from './MedicineList'
import 'antd/dist/antd.css';
import { useReactToPrint } from 'react-to-print';


const Receta = () => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <Space style={{ margin: 5 }}>
                <Button type="primary">Nueva receta</Button>
                <Button onClick={handlePrint}>Imprimir receta</Button>
            </Space>
            
            <MedicineList ref={componentRef}/>
            
        </div>
    );
}

export default Receta;