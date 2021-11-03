import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Image } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import {getImage} from '../../firebase/firebase'

const ContactDetail = (props) => {
  const history = useHistory();
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    if (history.location.state) {
      getImage(history.location.state.img)
      .then(res=>{
        history.location.state.img = res
        setPaciente(history.location.state);
      })
    } else {
      history.push("/home");
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    
    <div>
      <Image.PreviewGroup>
        <Image
          width={200}
          src={paciente.img}
        />
      </Image.PreviewGroup>
      <Row gutter={24} style={{ marginTop: "3rem" }} justify="space-between">
        <Col span={8}>
          <Card
            prefix={<MedicineBoxOutlined />}
            title="Nombre del paciente"
            bordered={false}
          >
            {paciente.nombre}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Email" bordered={false}>
            {paciente.correo}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Genero" bordered={false}>
            {paciente.genero}
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Direccion" bordered={false}>
            {paciente.direccion}
          </Card>
        </Col>
        {paciente.genero === "masculino" ? (
          <Col span={8}>
            <Card title="Genero" style={{ color: "#1155FF" }} bordered={false}>
              {paciente.genero}
            </Card>
          </Col>
        ) : (
          <Col span={8}>
            <Card title="Genero" style={{ color: "#FF64E7" }} bordered={false}>
              {paciente.genero}
            </Card>
          </Col>
        )}
        <Col span={8}>
          <Card title="Telefono" bordered={false}>
            {paciente.telefono}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Telefono de emergencia" style={{color:"red"}} bordered={false}>
            {paciente.telEmerg}
          </Card>
        </Col>
        </Row>
    </div>
  );
};

export default ContactDetail;
