import React, { useContext } from "react";
import {EyeOutlined} from '@ant-design/icons'
import DataContext from "../../context/data-context";
import { useHistory} from 'react-router-dom'

const Contacts = () => {

  const {expedientes} = useContext(DataContext);
  const history = useHistory();

  const expedienteDetail = (paciente)=>{
    history.push(`${history.location.pathname}/detail`, paciente)
  }

  return (
    <>
      <table className="table table-stripped">
        <thead className="thead-light">
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((paciente) => {
            return (
              <tr key={paciente.id}>
                <td>{paciente.nombre}</td>
                <td>{paciente.correo}</td>
                <td>{paciente.telefono}</td>
                <td>
                  <EyeOutlined twoToneColor="#52c41a" onClick={()=>{expedienteDetail(paciente)}}/>
                  <p className="btn text-primary" onClick={() => {}}>
                    <i className="fas fa-pencil-alt"></i>
                  </p>
                  <p className="btn text-danger" onClick={() => {}}>
                    <i className="far fa-trash-alt"></i>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Contacts;
