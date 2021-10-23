import React, { useContext } from "react";
import { Formik } from "formik";
import AuthContext from "../../context/auth-context";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import "../../style/login.css"

const LoginForm = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        correo: "",
        password: "",
      }}
      onSubmit={async (valores) => {
        try {
          await AuthCtx.login(
            valores.correo,
            valores.password
          );
          console.log("GO TO HOME")
          history.push("/home");
        } catch (e) {
          console.log(e);
        }
      }}
      restablecerContra={async (valores) => {
        console.log(valores)
        try {
          const contraRes = await AuthCtx.resetPassword(valores.correo)
          console.log(contraRes)
        } catch (e) {
          console.log(e)
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
        restablecerContra
      }) => (
        <div className="container">

          <div className="imgLogo" />

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="correo"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="CORREO ELECTRÓNICO"
                id="correo"
                name="correo"
                value={values.correo}
                onChange={handleChange}
                className="transparentInput"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="CONTRASEÑA"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="transparentInput"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                INICIAR SESIÓN
              </Button>

              <div onClick={restablecerContra} className="reset-password">
                ¿Olvidaste la contraseña?
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
