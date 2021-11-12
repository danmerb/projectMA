import React, { useContext } from "react";
import DataContext from "../../context/data-context";
import { useHistory } from "react-router-dom";
import { deleteExpediente } from "../../firebase/firebase";

const Contacts = () => {
  const { expedientes } = useContext(DataContext);
  const history = useHistory();

  const expedienteDetail = (paciente) => {
    history.push(`${history.location.pathname}/detail`, paciente);
  };

  const expedientEdit = (paciente) => {
    history.push(`${history.location.pathname}/edit`, paciente);
  };


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
                  <p
                    className="btn text-success"
                    onClick={() => {
                      expedienteDetail(paciente);
                    }}
                  >
                    <i className="far fa-eye"></i>
                  </p>
                  <p className="btn text-primary" onClick={() => {
                    expedientEdit(paciente);
                  }}>
                    <i className="fas fa-pencil-alt"></i>
                  </p>
                  <p className="btn text-danger" onClick={() => {
                    deleteExpediente(paciente.id);

                  }}>
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
