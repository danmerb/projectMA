import React, { useContext, useState } from "react";
import { Form, Input, DatePicker, Button, message, AutoComplete } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import PictureWall from "../../components/PictureWall";
import { setExpediente } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";

const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const generosOpts = [{ value: "Masculino" }, { value: "Femenino" }];

const ContactForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [imgPath, setImgId] = useState("");
  const [form] = Form.useForm();

  const imgCallback = (id) => {
    setImgId(id);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();

    let expediente = {
      nombre: values.nombre,
      correo: values.correo,
      direccion: values.direccion,
      telefono: values.telefono,
      fechaNac: values.fechaNac.toDate(),
      genero: values.genero,
      telEmerg: values.telefonoEmergencia,
      idDoc: currentUser.uid,
      img: imgPath !== "" ? imgPath : "default/user.png",
    };
    try {
      await setExpediente(expediente);
      message.success("Expendiente creado con éxito");
      form.resetFields();
    } catch (e) {
      console.log(e);
      message.error("Error al crear expediente");
    }
  };

  return (
    <Form
      style={{ marginLeft: "30%" }}
      form={form}
      layout="vertical"
      name="event"
      initialValues={{}}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item label="Nombre del paciente" name="nombre" rules={inputsRules}>
        <Input />
      </Form.Item>

      <Form.Item label="Correo Electrónico" name="correo" rules={inputsRules}>
        <Input type="email" />
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
        name="telefonoEmergencia"
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
          GUARDAR
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
