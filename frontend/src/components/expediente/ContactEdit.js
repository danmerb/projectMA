import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, DatePicker, Button, AutoComplete, message, Row, Card, Col, Image } from "antd";
import { getImage } from "../../firebase/firebase";
import DataContext from '../../context/data-context'
import moment from "moment";
import locale from "antd/es/date-picker/locale/es_ES";
import PictureWall from "../../components/PictureWall";
import { updateExpediente } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";

const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const generosOpts = [{ value: "Masculino" }, { value: "Femenino" }];

const ContactEdit = (props) => {

  //formulario para editar expediente
  const [form] = Form.useForm();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [imgPath, setImgId] = useState("");

  const inputsRules = [
    {
      required: true,
      message: "Campo requerido",
    },
  ];

  const imgCallback = (id) => {
    setImgId(id);
  };

  const cancelEdit = () => {
    history.goBack();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();

    console.log(history.location.state.nombre);
    let expediente = {
      nombre: values.nombre,
      correo: values.correo,
      direccion: values.direccion,
      telEmerg : values.telEmerg,
      fechaNac: values.fechaNac.toDate(),
      genero: values.genero,
      telefono: values.telefono,
      idDoc: currentUser.uid,
      img: imgPath !== "" ? imgPath :history.location.state.img?history.location.state.img:"default/user.png",
    };
    try {
      await updateExpediente(history.location.state.id, expediente);
      message.success("Expendiente actualizado con éxito");
    } catch (e) {
      console.log(e);
      message.error("Error al actualizar expediente");
    }
  };


  return (
    <div style={{ padding: "30px", background: "#ececec" }}>
      <Row gutter={16} type="flex" justify="center" align="middle" >
        <Col span={14}>
          <Card title="EDITAR EXPEDIENTE" bordered={true}>


            <div style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image.PreviewGroup>
                <Image width={200} src={history.location.state.img} />
              </Image.PreviewGroup>
              <Row gutter={24} style={{ marginTop: "3rem" }} justify="space-between"></Row>
            </div>

            <Form
              style={{ marginLeft: "18%" }}
              form={form}
              layout="vertical"
              name="event"
              initialValues={{ ...history.location.state, "fechaNac": moment(history.location.state.fechaNac.toDate()) }}
              wrapperCol={{
                span: 19,
              }}
            >

              <Form.Item label="Nombre del paciente" name="nombre" rules={inputsRules}>
                <Input />
              </Form.Item>

              <Form.Item label="Correo Electrónico" name="correo" rules={inputsRules}>
                <Input type="email"
                />
              </Form.Item>

              <Form.Item name="direccion" label="Dirección" rules={inputsRules}>
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="Teléfono" name="telefono" rules={inputsRules}>
                <Input />
              </Form.Item>

              <Form.Item
                name="fechaNac"
                label="Fecha de Nacimiento"
                rules={inputsRules}
              >
                <DatePicker locale={locale} format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item name="genero" label="Género" rules={inputsRules}>
                <AutoComplete
                  options={generosOpts}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                label="Teléfono de Emergencia"
                name="telEmerg"
                rules={inputsRules}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <PictureWall imgCallback={imgCallback} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={(e) => {
                    handleFormSubmit(e);
                  }}
                >
                  ACUALIZAR
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    cancelEdit();
                  }}
                >
                  CANCELAR
                </Button>
              </Form.Item>
            </Form>

          </Card>
        </Col>
      </Row>
    </div>

  );
};

export default ContactEdit;
