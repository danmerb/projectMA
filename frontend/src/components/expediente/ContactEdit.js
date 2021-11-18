import React, { useEffect, useState, useContext } from "react";
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

  
  const history = useHistory();
  const [paciente, setPaciente] = useState({});
  const [form] = Form.useForm();
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

    console.log(paciente.id);
    console.log(history.location.state.nombre);
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
      await updateExpediente(paciente.id, expediente);
    
      message.success("Expendiente actualizado con éxito");
      
      

    } catch (e) {
      console.log(e);

      message.error("Error al actualizar expediente");
    }
  };



  useEffect(() => {
    if (history.location.state) {
      getImage(history.location.state.img).then((res) => {
        history.location.state.img = res;
        setPaciente(history.location.state);
      });
    } else {
      history.push("/home");
    }


  }, [history]);
  return (
    <>

      <div style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image.PreviewGroup>
          <Image width={200} src={paciente.img} />
        </Image.PreviewGroup>
        <Row gutter={24} style={{ marginTop: "3rem" }} justify="space-between"></Row>
      </div>

      <Form
        style={{ marginLeft: "30%" }}
        form={form}
        layout="vertical"
        name="event"
        wrapperCol={{
          span: 14,
        }}
      >
      
        <Form.Item label="Nombre del paciente" name="nombre" rules={inputsRules}>
          <Input value={paciente.nombre} placeholder= {paciente.nombre}/> 
       </Form.Item>

        <Form.Item label="Correo Electrónico" name="correo" rules={inputsRules}>
          <Input type="email" value={paciente.correo} placeholder= {paciente.correo}
          />
        </Form.Item>

        <Form.Item name="direccion" label="Dirección" rules={inputsRules}>
          <Input.TextArea value={paciente.direccion}  placeholder= {paciente.direccion} />
        </Form.Item>

        <Form.Item label="Teléfono" name="telefono" rules={inputsRules}>
          <Input value={paciente.telefono}  placeholder= {paciente.telefono} />
        </Form.Item>

        <Form.Item
          name="fechaNac"
          label="Fecha de Nacimiento"
          rules={inputsRules}
          value={paciente.fechaNac}
        >
          <DatePicker locale={locale} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="genero" label="Género" rules={inputsRules}>
          <AutoComplete
            options={generosOpts}
            placeholder={paciente.genero}
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
          <Input  placeholder= {paciente.telEmerg} />
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
    </>
  );
};

export default ContactEdit;
