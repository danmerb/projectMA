import React,{useState,useEffect, useContext} from 'react';
import { Row, Card, Col, Image } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';
import PictureUp from "../../assets/receta.png"
import '../../style/receta.css';
import { useHistory } from "react-router";
import moment from 'moment'
import { RecaptchaVerifier } from '@firebase/auth';
import AuthContext from "../../context/auth-context";

const ViewReceta = React.forwardRef((props,ref) => {
    const [receta, setReceta] = useState({});    
    const history2 = useHistory();
    useEffect(() => {
        setReceta(history2.location.state)
        
    },[]);
    
    console.log(receta);
    
    const { currentUser } = useContext(AuthContext);

    const gridStyle = {
      width: '100%',
      textAlign: 'center',
      alignItems: 'center'
    };
    
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

    
  
    return (
        
        <div style={{ justifyContent: "center", alignItems: "center",  textAlign: 'center' }} ref={ref}>
      <Image.PreviewGroup>
        <Image width={600} src={PictureUp} />
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
          <Card title="Género" bordered={false}>
            {receta.genero}
          </Card>
        </Col>
        
          <Col span={8}>
            <Card title="Fecha" bordered={false}>
              {  moment(receta.fechaPr).format("DD-MM-YYYY") }
            </Card>
          </Col>
    
               
        </Row>
        <Card style={{ width: '100%' }} title="Medicamentos" bordered={false}>
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
