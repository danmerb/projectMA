import React, { useContext, useState  } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import { useHistory } from "react-router";
import locale from "antd/es/date-picker/locale/es_ES";
import {GetRec} from "./ShowReceta";
import { setReceta } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";
import PictureUp from "../../assets/receta.png"
import Item from "antd/lib/list/Item";
const inputsRules = [
  {
    required: true,
    message: "Campo requerido",
  },
];

const defaultState = {
    medicamentos:{
      medicamento:{
        nombreCom:'',
        nombreGen:'',
        presentacion:'',
        dosis:'',
        tiempo:'',
      }
    }
  };

const RecetaFormulario = () => {
  const { currentUser } = useContext(AuthContext);  
  const [form] = Form.useForm();
  const [rows, setRows] = useState([defaultState]);
  const history = useHistory();
  
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value
    };
    setRows(copyRows);
  };

  const handleOnAdd = () => {    
    setRows(rows.concat(defaultState));
  };

  const handleOnRemove = index => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };



  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const values = await form.validateFields();

    let receta = {
      nombrePa: values.nombrePa,
      edad: values.edad,
      genero: values.genero,
      fechaPr: values.fechaPr.toDate(),
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
      console.log(receta);      
      //await GetRec(receta);
      history.push(`vistaReceta`,receta);
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
        <img src={PictureUp}/>
      <Form.Item label="Nombre del Paciente" name="nombrePa" rules={inputsRules}>
        <Input />        
      </Form.Item>

      <Form.Item label="Edad" name="edad" rules={inputsRules}>
        <Input  />
      </Form.Item>

      <Form.Item label="Genero" name="genero" rules={inputsRules}>
        <Input />
      </Form.Item>      

        <Form.Item
            name="fechaPr"
            label="Fecha "
            rules={inputsRules}
      >
        <DatePicker locale={locale} format="DD/MM/YYYY" />
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

function Row({ onChange, onRemove,medicamento,nombreCom,nombreGen,presentacion,dosis,tiempo }) {

    return (
      <div>
          <div>
          
        <Form.Item   name="this.nombreCom" label="Nombre del medicamento" >
          <Input placeholder=" " onChange={e => onChange("this.nombreCom", e.target.value)} />
        </Form.Item>             
                    
          <Form.Item   name={nombreGen} label="Nombre generico" >
            <Input placeholder=" " onChange={e => onChange("nombreGen", e.target.value)} />
          </Form.Item>             
                    
          <Form.Item   name={presentacion} label="Precentacion" >
            <Input placeholder=" " onChange={e => onChange("presentacion", e.target.value)} />
          </Form.Item>

          <Form.Item   name={dosis} label="Dosis del medicamento" >
            <Input placeholder=" " onChange={e => onChange("dosis", e.target.value)} />
          </Form.Item>
          <Form.Item   name={tiempo} label="Tiempo de prescripcion" >
            <Input placeholder=" " onChange={e => onChange("tiempo", e.target.value)} />
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