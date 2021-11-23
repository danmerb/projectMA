import React,{useState,useEffect} from 'react';
import { Row, Card, Col, Image } from "antd";
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
    
    
    const gridStyle = {
      width: '100%',
      textAlign: 'center',
      alignItems: 'center'
    };
    
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

    function Mostrar(props){
        const medicamentoMostrar = props.medicamentos?.map((medicamento) =>
        <div key={medicamento.id}>
           <Card.Grid style={gridStyle} type="inner" >
                        <table style= {{  textAlign: 'center', width:'100%'}}>
                          <thead className="thead-light" >
                            <tr>
                              <th>Nombre Comercial</th>
                              <th>Nombre Generico</th>
                              <th>Presentacion</th>
                              <th>Dosis</th> 
                              <th>Tiempo</th>
                            </tr>
                          </thead>
                          <tbody >
                            <tr key={medicamento.id}>
                              <td>{medicamento.nombreCom}</td>
                              <td>{medicamento.nombreGen}</td>
                              <td>{medicamento.presentacion}</td>
                              <td>{medicamento.dosis}</td>
                              <td>{medicamento.tiempo}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Grid>
        </div>
      ); 
      return (
        <div>
          {medicamentoMostrar}
        </div>
      );

    }

    
    
    //const receta = useState({});
    //console.log("hola");
    //console.log(receta);
    
    return (
        
        <div style={{ justifyContent: "center", alignItems: "center",  textAlign: 'center' }} ref={ref}>
      <Image.PreviewGroup>
        <Image width={400} src={PictureUp} />
      </Image.PreviewGroup>

      <Row gutter={[16, 16]} style={{ marginTop: "3rem" }} justify="space-between">
        <Col span={8}>
          <Card
            prefix={<MedicineBoxOutlined />}
            title="Nombre del paciente"
            bordered={false}
          >
            {receta.nombrePa}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Correo Electrónico" bordered={false}>
            {receta.nombrePa}
          </Card>
        </Col>
        
          <Col span={8}>
            <Card title="Fecha" bordered={false}>
              {  moment(receta.fechaPr).format("DD-MM-YYYY") }
            </Card>
          </Col>
        
      
        
          
               
        </Row>

     

        <Card style={{ width: '100%' }} title="Historial de Recetas" bordered={false}>


          <table className="table table-stripped" style= {{ width: '100%', textAlign: 'center'}}>

            <tbody>
              < Mostrar medicamentos={receta.medicamentos} />
        
              </tbody>
        </table>


      </Card>
        
        </div>
    );
});


export default ViewReceta;
/*
{receta.medicamentos.map((medicamento, index) => (
            <Col  key={index}>
          <h4 style={ {marginLeft:"4.5cm"}}> Medicamentos</h4>
          <h5 style={ {marginLeft:"4.5cm"}}> Nombre comercial: {medicamento.nombreCom}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Nombre Generico: {medicamento.nombreGen}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Presentacion: {medicamento.presentacion}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Dosis: {medicamento.dosis}</h5>
          <h5 style={ {marginLeft:"4.5cm"}}> Tiempo de tratamiento: {medicamento.tiempo}</h5>
          </Col>
          
          ))}

*/


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