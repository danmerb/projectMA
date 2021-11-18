import React,{useRef,useState,useEffect} from 'react';
import { Row, Card, Col } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import PictureUp from "../../assets/receta.png"
import '../../style/receta.css';
import { useHistory } from "react-router";
import moment from 'moment'
import { RecaptchaVerifier } from '@firebase/auth';

const ViewReceta = React.forwardRef((props,ref) => {
    const [receta, setReceta] = useState({});    
    const history2 = useHistory();
    useEffect(() => {
        setReceta(history2.location.state)
        
    },[]);
    
    console.log(receta);
    
    

    
   /*
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
*/ 
    const data = Object.keys(receta).reduce((array, key) => {
        return [...array, {key: receta[key]}]
    }, []);

    const prueba =  Object.keys(data).map(function(name){
        var obj = {};
        obj[name] = data[name];
        return obj;
    });

    
    
    //const receta = useState({});
    //console.log("hola");
    //console.log(receta);
    
    return (
        <div>
           
        <div style={{ overflow: "hidden"}} ref={ref}>
        <img src={PictureUp} className="imagen"/>
            

        <Row gutter={24}  >

        
        <Col span={10} style={ {marginLeft:"4cm"}}>
        <h5 style={ {marginLeft:"0.5cm"}}> Paciente: {receta.nombrePa}</h5>         
         </Col>
        
        
        
        <Col span={4}>
        <h5 style={ {marginLeft:"0.4cm"}}> Edad: {receta.edad}</h5>  
        </Col>

        <Col span={4}>    
        <h5 style={ {marginLeft:"0.3cm"}}> Genero: {receta.genero}</h5>     
        </Col>

        <Col span={6} style={ {marginLeft:"4.5cm"}}>    
        <h5 > Fecha: {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "2-digit"
        }).format(receta.fechaPr)}</h5>     
        </Col>
               
        
        
        <Col span={15} style={ {marginTop:"1cm"}}>
        {receta.medicamentos.map(({ nombreCom,nombreGen,presentacion,dosis,tiempo }) => (
            <Col >
          <h4 style={ {marginLeft:"4.5cm"}}> Medicamentos</h4>
          <h5 style={ {marginLeft:"4.5cm"}}> Nombre comercial: {nombreCom}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Nombre Generico: {nombreGen}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Presentacion: {presentacion}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Dosis: {dosis}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Tiempo de tratamiento: {tiempo}</h5>
          </Col>
          
          ))}
          
        </Col>
        
      
        
        </Row>

            
        </div>
        
        </div>
        
    );
});






export default ViewReceta;
 /* 
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
 */