import React, { useContext, useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, message, AutoComplete } from "antd";
import { useHistory } from "react-router";
import locale from "antd/es/date-picker/locale/es_ES";
import { GetRec } from "./ShowReceta";
import { setReceta } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";
import DataContext from "../../context/data-context";
import PictureUp from "../../assets/receta.png";
import Item from "antd/lib/list/Item";
import { mapCalendarPacientes } from "../calendar/CalendarConfig";

const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const defaultState = {
  medicamentos: {
    medicamento: {
      nombreCom: "",
      nombreGen: "",
      presentacion: "",
      dosis: "",
      tiempo: "",
    },
  },
};

const RecetaFormulario = () => {
  const { currentUser } = useContext(AuthContext);
  const { expedientes } = useContext(DataContext);
  const [form] = Form.useForm();
  const [rows, setRows] = useState([defaultState]);
  const [mappedExpedientes, setMappedExpedientes] = useState([]);
  const [userObj, setUserObj] = useState({});
  const history = useHistory();
  console.log(userObj);

  
  useEffect(() => {
    if (expedientes && expedientes.length !== 0)
      setMappedExpedientes(mapCalendarPacientes(expedientes));
  }, [expedientes]);
  
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
  };

  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();

    let receta = {
      nombrePa: userObj.nombre,
      idPa: userObj.id,
      edad: values.edad,
      genero: userObj.genero,
      fechaPr: new Date(),
      idDoc: currentUser.uid,
      nombreCom: values.nombreCom,
      nombreGen: values.nombreGen,
      presentacion: values.presentacion,
      dosis: values.dosis,
      tiempo: values.tiempo,
    };
    try {
      await setReceta(receta);

      message.success("Receta creada con éxito");

      //await GetRec(receta);
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

      <label>Medicamentos</label>
      <Form.Item label="Nombre" name="nombreCom" rules={inputsRules}>
        <Input />
      </Form.Item>
      <Form.Item label="Nombre Generico" name="nombreGen" rules={inputsRules}>
        <Input />
      </Form.Item>
      <Form.Item label="Presentacion" name="presentacion" rules={inputsRules}>
        <Input />
      </Form.Item>
      <Form.Item label="Dosis" name="dosis" rules={inputsRules}>
        <Input />
      </Form.Item>
      <Form.Item label="Tiempo" name="tiempo" rules={inputsRules}>
        <Input />
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

function Row({
  onChange,
  onRemove,
  medicamento,
  nombreCom,
  nombreGen,
  presentacion,
  dosis,
  tiempo,
}) {
  return (
    <div>
      <div>
        <Form.Item name="this.nombreCom" label="Nombre del medicamento">
          <Input
            placeholder=" "
            onChange={(e) => onChange("this.nombreCom", e.target.value)}
          />
        </Form.Item>

        <Form.Item name={nombreGen} label="Nombre generico">
          <Input
            placeholder=" "
            onChange={(e) => onChange("nombreGen", e.target.value)}
          />
        </Form.Item>

        <Form.Item name={presentacion} label="Precentacion">
          <Input
            placeholder=" "
            onChange={(e) => onChange("presentacion", e.target.value)}
          />
        </Form.Item>

        <Form.Item name={dosis} label="Dosis del medicamento">
          <Input
            placeholder=" "
            onChange={(e) => onChange("dosis", e.target.value)}
          />
        </Form.Item>
        <Form.Item name={tiempo} label="Tiempo de prescripcion">
          <Input
            placeholder=" "
            onChange={(e) => onChange("tiempo", e.target.value)}
          />
        </Form.Item>
      </div>

      <button onClick={onRemove}>Eliminar</button>
    </div>
  );
}

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
