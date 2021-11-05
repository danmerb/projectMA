import React, { useContext } from "react";
import { Formik } from "formik";
import AuthContext from "../../context/auth-context";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

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
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15em",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
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
                  message: "Se necesita nombre de usuario!",
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
              />
            </Form.Item>
            <Form.Item
              name="correo"
              rules={[
                {
                  required: true,
                  message: "Se necesita correo electrónico!",
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
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  min: 5,
                  required: true,
                  message: "Contraseña no menos de 5 carácteres!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Recordar sesión</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Registrarse ⚕️
              </Button>
              <div>
                ¿Ya registrado?
                <Button
                  type="dashed"
                  onClick={() => history.push("/login")}
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
