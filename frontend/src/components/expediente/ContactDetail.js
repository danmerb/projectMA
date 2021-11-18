import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Col, Image, Button } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import { getImage } from "../../firebase/firebase";
import DataContext from "../../context/data-context";
import moment from "moment";

const ContactDetail = (props) => {
  const history = useHistory();
  const [paciente, setPaciente] = useState({});
  const [recetasCurrentUser, setRecetas] = useState([]);
  const { receta: recetas } = useContext(DataContext);

  const cancelEdit = () => {
    history.goBack();
  };

  useEffect(() => {
    console.log(recetas);
    if (history.location.state) {
      getImage(history.location.state.img).then((res) => {
        history.location.state.img = res;
        setPaciente(history.location.state);
        setRecetas(
          recetas.filter((receta) => receta.idPa === history.location.state.id)
        );
      });
    } else {
      history.push("/home");
    }
  }, [history, recetas]);
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
        {paciente.genero === "masculino" ? (
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
      <table className="table table-stripped">
        <thead className="thead-light">
          <tr>
            <th>Fecha Receta</th>
            <th>Medicamentos recetadas para esa consulta</th>
          </tr>
        </thead>
        <tbody>
          {recetasCurrentUser.map((receta) => {
            return (
              <tr key={receta.id}>
                <td>{moment(receta.fechaPr).format("DD-MM-YYYY")}</td>
                <table>
                  <thead className="thead-light">
                    <tr>
                      <th>Nombre Comercial</th>
                      <th>Nombre Generico</th>
                      <th>Presentacion</th>
                      <th>Dosis</th>
                      <th>Tiempo</th>
                    </tr>
                  </thead>
                  <tbody>
                  {receta.medicamentos.map((medicamento, index) => (
                    <tr key={index}>
                      <td>{medicamento.nombreCom}</td>
                      <td>{medicamento.nombreGen}</td>
                      <td>{medicamento.presentacion}</td>
                      <td>{medicamento.dosis}</td>
                      <td>{medicamento.tiempo}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button
        type="primary"
        onClick={() => {
          cancelEdit();
        }}
      >
        CANCELAR
      </Button>
      <br></br>
    </div>
  );
};

export default ContactDetail;
