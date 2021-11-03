import React, { useContext } from "react";
import { Form, Input, DatePicker, Button } from "antd";
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

const ContactForm = () => {
  const { currentUser } = useContext(AuthContext);
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };

  const [form] = Form.useForm();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();
    console.log(values);

    let expediente = {
      nombre: values.nombre,
      correo: values.correo,
      direccion: values.direccion,
      telefono: values.telefono,
      fechaNac: values.fechaNac.toDate(),
      genero: values.genero,
      telEmerg: values.telefonoEmergencia,
      idDoc: currentUser.uid,
    };
    await setExpediente(expediente);
  };

  return (
    <Form
      style={{ marginLeft: "30%" }}
      form={form}
      layout="vertical"
      name="event"
      initialValues={initialFieldValues}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item label="Nombre" name="nombre" rules={inputsRules}>
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

      <Form.Item label="Género" name="genero" rules={inputsRules}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Teléfono de Emergencia"
        name="telefonoEmergencia"
        rules={inputsRules}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <PictureWall />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          onClick={(e) => {
            handleFormSubmit(e);
          }}
        >
          ENVIAR
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
