import React, { useContext } from "react";
import { Formik } from "formik";
import AuthContext from "../../context/auth-context";
import { Form, Input, Button, Checkbox } from "antd";
import {  LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const LoginForm = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        correo: "",
        password: "",
      }}
      onSubmit={async (valores, funciones) => {
        
        try {
          const autenticacion = await AuthCtx.login(
            valores.correo,
            valores.password
          );
          console.log(autenticacion)
          history.push("/");
        } catch (e) {
          console.log(e);
        }
      }}
      restablecerContra = {async(valores)=>{
        try{
          const contraRes = await AuthCtx.resetPassword(valores.correo)
          console.log(contraRes)
        }catch(e){
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
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'15em'}}>
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
                  message: "Se necesita correo electronico!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Correo electronico"
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
                  required: true,
                  message: "Se requiere contraseña",
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
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar sesion
              </Button>
              <div>
                No esta registrado?
                <Button type="dashed" onClick={()=>history.push("/register")}>
                  Registrarse ahora
                </Button>
              </div>
              <div>
                Contraseña olvidada?
                <Button type="dashed" onClick={restablecerContra}>
                  Reiniciarla
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
