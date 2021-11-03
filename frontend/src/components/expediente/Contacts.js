import React, { useState, useEffect, useContext } from "react";
import { getExpedientes } from "../../firebase/firebase";
import AuthContext from "../../context/auth-context";

const Contacts = () => {
  const { currentUser } = useContext(AuthContext);

  var [contactObjects, setContactObjects] = useState([]);

  useEffect(() => {
    getExpedientes(currentUser.uid).then((expedientes) => {
      setContactObjects(expedientes);
    });
  }, []);

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
          {Object.keys(contactObjects).map((id) => {
            return (
              <tr key={id}>
                <td>{contactObjects[id].nombre}</td>
                <td>{contactObjects[id].correo}</td>
                <td>{contactObjects[id].telefono}</td>
                <td>
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
