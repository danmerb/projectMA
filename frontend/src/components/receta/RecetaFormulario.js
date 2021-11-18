import React, { useContext, useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, AutoComplete } from "antd";

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

const defaultState =  {

    
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
    { id: uuidv4(), nombreCom: '', nombreGen: '', presentacion:'',dosis:'',tiempo:'' },
  ]);

  const defaultReceta = {
      nombrePa: "",
      idPa: "",
      edad: "",
      genero: "",
      fechaPr: "",
      idDoc: "",
      medicamentos: [],
  }
        

  
  
  useEffect(() => {
    if (expedientes && expedientes.length !== 0)
      setMappedExpedientes(mapCalendarPacientes(expedientes));
  }, [expedientes]);

  

  
  const handleChangeInput = (id, event) => {
    
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        console.log("el id es "+id)
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  nombreCom: '', nombreGen: '', presentacion:'',dosis:'',tiempo:'' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  
 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();
    console.log(inputFields)
    let receta = {
      nombrePa: userObj.nombre,
      idPa: userObj.id,
      edad: values.edad,
      genero: userObj.genero,
      fechaPr: new Date(),
      idDoc: currentUser.uid,
      medicamentos: [
        {
          nombreCom: medObj.nombreCom,
          nombreGen: medObj.medObj,
          presentacion:medObj.presentacion,
          dosis: medObj.dosis,
          tiempo: medObj.tiempo,
        },
      ], 
      
    };
    try {
      console.log("Hola");
      console.log("InputFields", inputFields);
     // await setReceta(receta);
      
      message.success("Receta creada con éxito");

      //await GetRec(receta);
   //   history.push(`vistaReceta`, receta);
     // form.resetFields();
    } catch (e) {
      console.log(e);
      message.error("Error al crear la receta");
      console.log(receta);
    }

    //history.push('/home/vistaReceta');
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

      <Form.Item label="Edad" name="edad" rules={inputsRules}>
        <Input  />
      </Form.Item>

      <Form.Item >
      { inputFields.map((inputField, index) => (
          <div key={inputField.id}>
            <Form.Item label="Nombre Comercial">
            <Input
              name="nombreCom"
              variant="filled"
              value={inputField.nombreCom}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
              
            </Form.Item>
            
            <Form.Item name="nombreGen" label="Nombre Generico">
            <Input 
              name="nombreGen"
              variant="filled"
              onChange={event => handleChangeInput(inputField.id, event)}
            />
              
            </Form.Item>

            <Form.Item name="presentacion" label="Presentacion ">
            <Input 
             name="presentacion"
              variant="filled"
              onChange={event => handleChangeInput(inputField.id, event)}
            />
              
            </Form.Item>

            <Form.Item name="dosis" label="Dosis ">
            <Input 
              name="dosis"
              variant="filled"
              onChange={event => handleChangeInput(inputField.id, event)}
            />
              
            </Form.Item>

            <Form.Item name="tiempo" label="tiempo ">
            <Input 
              name="tiempo"
              variant="filled"
              onChange={event => handleChangeInput(inputField.id, event)}
            />
              
            </Form.Item>

            <Button type="primary" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              Quitar Medicamento
            </Button>

            <Button
            type="primary"
              onClick={handleAddFields}
            >
              Agregar Medicamento
            </Button>
            
          </div>
        )) }


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



export default RecetaFormulario;

/*<Form.Item name="medicamentos" label="Medicamentos" >
          
            
      <div className="formMedicina">
      {rows.map((row, index) => (
        <Row
          
          {...row}          
          onChange={(name, value) => handleOnChange(index, name, value)}
          onRemove={() => handleOnRemove(index)}
          key={index}

        />
      ))}

      <button  onClick={handleOnAdd}>+</button>
    </div>
      </Form.Item>
      */
