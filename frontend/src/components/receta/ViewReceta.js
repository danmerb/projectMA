import React,{StyleSheet} from 'react';
import { List } from 'antd';
import 'antd/dist/antd.css';
import PictureUp from "../../assets/receta.png"
import '../../style/receta.css';

const ViewReceta = React.forwardRef((props,ref) => {
    
    
    const data = [
        {
            nombrePa: 'Alonso Garcia',
            edad:"22",
            genero:"M",            
            fechaPr: "2020-11-01",
            idDoc: "mICBP1F7eRdOIlEZcFcszP1FUYB3",
            nombreCom: "OXYCONTI",
            nombreGen:"OXYCODONA",
            presentacion:"Caja de 30 tabletas de 10mg C/U",
            dosis:"1 tableta cada 6 horas",
            tiempo: "30 dias "          

        },
        
        
        
       
    ];
    return (
        <div>
           
        <div style={{ overflow: "hidden"}} ref={ref}>

            <img src={PictureUp} className="imagen"/>
            
            <List
                style={{ margin: 5 }}
                itemLayout="horizontal"
                dataSource={data}
                
                renderItem={item => (
                    <List.Item>
                       
                        <div className="textArea" >
                        
                        <h4 >Paciente : {item.nombrePa}</h4>                       
                        <h4 >Fecha : {item.fechaPr}</h4>
                        <h4 >Edad : {item.edad}</h4>
                        <h4 >Genero : {item.genero}</h4>                                      
                                              
                        
                        <h4 >Nombre del medicamento : {item.nombreCom}</h4>
                        <h4 >Nombre generico : {item.nombreGen}</h4>
                        <h4 >Presentacion : {item.presentacion}</h4>
                        <h4 >Dosis : {item.dosis}</h4>
                        <h4 >Tiempo de tratamiento : {item.tiempo}</h4>
                        </div>  
                    
                        
                                                 
                    </List.Item>
                )}

                      
            />
        </div>
        
        </div>
        
    );
});


export default ViewReceta;
