import React, { useState } from "react";

const Contacts = () => {

    var [contactObjects, setContactObjects] = useState([
        {
            id: 1,
            nombre: 'Matias Alvarenga',
            correo: "malvarenga@gmail.com",
            telefono: "6578-1325",
        },
        {
            id: 2,
            nombre: 'Pepito Santos',
            correo: "pepito@gmail.com",
            telefono: "2257-7737",
        },
    ])

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
                    {
                        Object.keys(contactObjects).map(id => {
                            return <tr key={id}>
                                <td>{contactObjects[id].nombre}</td>
                                <td>{contactObjects[id].correo}</td>
                                <td>{contactObjects[id].telefono}</td>
                                <td>
                                    <a className="btn text-primary" onClick={() => { }}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </a>
                                    <a className="btn text-danger" onClick={() => { }}>
                                        <i className="far fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Contacts;