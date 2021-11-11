import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Image } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { getImage } from "../../firebase/firebase";
import moment from "moment";

const ContactDetail = (props) => {
  const history = useHistory();
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    if (history.location.state) {
      getImage(history.location.state.img).then((res) => {
        history.location.state.img = res;
        setPaciente(history.location.state);
      });
    } else {
      history.push("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image.PreviewGroup>
        <Image width={200} src={paciente.img} />
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
          <Card title="Correo Electrónico" bordered={false}>
            {paciente.correo}
          </Card>
        </Col>
        {paciente && paciente.fechaNac && (
          <Col span={8}>
            <Card title="Fecha de Nacimiento" bordered={false}>
              {moment(paciente.fechaNac.toDate()).format("DD-MM-YYYY")}
            </Card>
          </Col>
        )}
        <Col span={24}>
          <Card title="Dirección" bordered={false}>
            {paciente.direccion}
          </Card>
        </Col>
        {paciente.genero === "Masculino" ? (
          <Col span={8}>
            <Card title="Género" style={{ color: "#1155FF" }} bordered={false}>
              {paciente.genero}
            </Card>
          </Col>
        ) : (
          <Col span={8}>
            <Card title="Género" style={{ color: "#FF64E7" }} bordered={false}>
              {paciente.genero}
            </Card>
          </Col>
        )}
        <Col span={8}>
          <Card title="Teléfono" bordered={false}>
            {paciente.telefono}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Teléfono de Emergencia"
            style={{ color: "red" }}
            bordered={false}
          >
            {paciente.telEmerg}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactDetail;
