import React, { useContext, useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, AutoComplete, Row, Col, Card , Space} from "antd";

import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import locale from "antd/es/date-picker/locale/es_ES";
import { GetRec } from "./ShowReceta";
import { setReceta } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";
import DataContext from "../../context/data-context";
import PictureUp from "../../assets/receta.png";
import { v4 as uuidv4 } from 'uuid';

import { mapCalendarPacientes } from "../calendar/CalendarConfig";

const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const defaultState = {


  nombreCom: "",
  nombreGen: "",
  presentacion: "",
  dosis: "",
  tiempo: "",

};


const RecetaFormulario = () => {
  const { currentUser } = useContext(AuthContext);
  const { expedientes } = useContext(DataContext);
  const [form] = Form.useForm();
  const [rows, setRows] = useState([defaultState]);
  const [mappedExpedientes, setMappedExpedientes] = useState([]);
  const [userObj, setUserObj] = useState({});
  const [medObj, setMedObj] = useState({});
  const history = useHistory();

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), nombreCom: '', nombreGen: '', presentacion: '', dosis: '', tiempo: '' },
  ]);






  useEffect(() => {
    if (expedientes && expedientes.length !== 0)
      setMappedExpedientes(mapCalendarPacientes(expedientes));
  }, [expedientes]);




  const handleChangeInput = (id, event) => {

    const newInputFields = inputFields.map(i => {
      if (id === i.id) {

        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

  //funcion para agregar en el formulario espacio para un nuevo medicamento con todos sus campos

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), nombreCom: '', nombreGen: '', presentacion: '', dosis: '', tiempo: '' }])
  }

  //funcion para eliminar de el formulario un medicamento

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  //funcion para enviar una receta



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();

    let receta = {
      nombrePa: userObj.nombre,
      idPa: userObj.id,
      genero: userObj.genero,
      fechaPr: new Date(),
      idDoc: currentUser.uid,
      medicamentos: inputFields,

    };
    try {

      //funcion para setear la receta creada 
      await setReceta(receta);
      console.log(receta);
      //mensaje de receta creada con exito en la vista
      message.success("Receta creada con éxito");
      // redireccionamiento a la  vista de la receta que se acaba de crear
      history.push(`vistaReceta`, receta);
      form.resetFields();

      
    } catch (e) {
      console.log(e);
      message.error("Error al crear la receta");
      console.log(receta);
    }

    //history.push('/home/vistaReceta');
  };







  return (
    <div style={{ padding: "30px", background: "#ececec" }}>
      <Row gutter={16} type="flex" justify="center" align="middle" >
        <Col span={14}>
          <Card title="CREAR RECETA" bordered={true}>

            <Form
              style={{ marginLeft: "18%" }}
              form={form}
              layout="vertical"
              name="event"
              initialValues={{}}
              wrapperCol={{
                span: 19,
              }}
            >
              <img src={PictureUp} alt="header" />
              <Form.Item
                name="pacienteDetails"
                label="Nombre del paciente"
                required
                tooltip="Este campo es obligatorio"
                rules={inputsRules}
              >
                <AutoComplete
                  options={mappedExpedientes}
                  placeholder="Paciente"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSelect={(value, { pacienteObj }) => {
                    setUserObj(pacienteObj);

                  }}


                />
              </Form.Item>

          

              <Form.Item >
                {inputFields.map((inputField, index) => (
                  <div key={inputField.id}>
                    <Form.Item label="Nombre Comercial">
                      <Input
                        name="nombreCom"
                        variant="filled"
                        value={inputField.nombreCom}
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />

                    </Form.Item>

                    <Form.Item label="Nombre Generico">
                      <Input
                        name="nombreGen"
                        variant="filled"
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />

                    </Form.Item>

                    <Form.Item label="Presentacion ">
                      <Input
                        name="presentacion"
                        variant="filled"
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />

                    </Form.Item>

                    <Form.Item label="Dosis ">
                      <Input
                        name="dosis"
                        variant="filled"
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />

                    </Form.Item>

                    <Form.Item label="tiempo ">
                      <Input
                        name="tiempo"
                        variant="filled"
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />

                    </Form.Item>
                    

                    <Space className="BotonImpr" style = {{marginBottom: "2em"}}>
                    <Button type="danger" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                      Eliminar Medicamento
                    </Button>

                    <Button
                      type="primary"
                      onClick={handleAddFields}
                    >
                      Agregar Medicamento
                    </Button>
                    </Space>
                    <br></br>
                    <br></br>

                  </div>
                ))}


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
          </Card>
        </Col>
      </Row>
    </div>
  );
};



export default RecetaFormulario;

