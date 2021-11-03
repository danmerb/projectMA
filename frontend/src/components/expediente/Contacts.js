import React, { useState, useEffect, useContext } from "react";
import { getExpedientes } from "../../firebase/firebase";
import {EyeOutlined} from '@ant-design/icons'
import AuthContext from "../../context/auth-context";
import { useHistory} from 'react-router-dom'

const Contacts = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  var [contactObjects, setContactObjects] = useState([]);

  useEffect(() => {
    const fetch = async()=>{
      const expedientes = await getExpedientes(currentUser.uid);
      setContactObjects(expedientes);
    }
   fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expedienteDetail = (paciente)=>{
    history.push(`${history.location.pathname}/detail`, {paciente})
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
          {contactObjects.map((paciente) => {
            return (
              <tr key={paciente.id}>
                <td>{paciente.nombre}</td>
                <td>{paciente.correo}</td>
                <td>{paciente.telefono}</td>
                <td>
                  <EyeOutlined twoToneColor="#52c41a" onClick={()=>{expedienteDetail(paciente)}}/>
                  <a className="btn text-primary" onClick={() => {}}>
                    <i className="fas fa-pencil-alt"></i>
                  </a>
                  <a className="btn text-danger" onClick={() => {}}>
                    <i className="far fa-trash-alt"></i>
                  </a>
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
