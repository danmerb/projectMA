import React, { useContext } from "react";
import { Formik } from "formik";
import AuthContext from "../../context/auth-context";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import "../../style/loginRegister.css"

const RegisterForm = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        nombre: "",
        correo: "",
        password: "",
      }}
      onSubmit={async (valores, funciones) => {
        try {
          await AuthCtx.register(
            valores.nombre,
            valores.correo,
            valores.password
          );
          history.push("/home");
          //  funciones.resetForm({ nombre: "", correo: "", password: "" });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        errors,
        handleBlur,
        touched,
      }) => (
        <div
          className="containerRegister"
        >
          <div className="imgLogo" />
          <Form
            name="normal_login"
            className="register-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su nombre de usuario.",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre de usuario"
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                className="transparentInput"
              />
            </Form.Item>
            <Form.Item
              name="correo"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingrese su correo electrónico.",
                }, {
                  type: "email",
                  message: "El correo no tiene formato valido.",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Correo electrónico"
                id="correo"
                name="correo"
                value={values.correo}
                onChange={handleChange}
                className="transparentInput"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  min: 5,
                  required: true,
                  message: "Contraseña no menos de 5 carácteres.",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="transparentInput"
                iconRender={visible => (visible ? <EyeOutlined style={{ color: "#FFFFFF" }} /> : <EyeInvisibleOutlined style={{ color: "#FFFFFF" }} />)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox style={{ color: '#FFFFFF'}}>Recordar sesión</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Registrarse ⚕️
              </Button>
              <div
                className="customLink"
                onClick={() => history.push("/login")}>
                ¿Ya registrado? Iniciar Sesión
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
