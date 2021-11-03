import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Image } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

const ContactDetail = (props) => {
  const history = useHistory();
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    console.log(history.location.state)
    if (history.location.state) {
      setPaciente(history.location.state);
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
          src={`https://avatars.dicebear.com/api/jdenticon/${paciente.id}.svg`}
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
