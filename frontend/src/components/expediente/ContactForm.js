import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import PictureWall from "../../components/PictureWall";

const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const ContactForm = () => {
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
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="event"
      initialValues={initialFieldValues}
    >
      <Form.Item label="Nombre" name="name" rules={inputsRules}>
        <Input />
      </Form.Item>

      <Form.Item label="Correo Electrónico" name="email" rules={inputsRules}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="direccion" label="Dirección" rules={inputsRules}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Teléfono" name="phone" rules={inputsRules}>
        <Input />
      </Form.Item>

      <Form.Item
        name="fechaNacimiento"
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
        name="phone"
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
