import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/data-context";
import { useHistory } from "react-router-dom";
import { deleteExpediente } from "../../firebase/firebase";
import { Card, Avatar, Col, Row, List, Image } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../app.css';



const { Meta } = Card;
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
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={expedientes}

      renderItem={paciente => (
      <>
      
        < List.Item key={paciente.id} >
          {console.log(paciente)}

          <Card actions={[
            <EyeOutlined key="see" onClick={() => {
              expedienteDetail(paciente);
            }} />,
            <EditOutlined key="edit" onClick={() => {
              expedientEdit(paciente);
            }} />,
            <DeleteOutlined key="ellipsis" onClick={() => {
              deleteExpediente(paciente.id);

            }} />,
          ]}
          >

            <Meta
              avatar={< Avatar  size={{
                xs: 40,
                sm: 40,
                md: 40,
                lg: 40,
                xl: 64,
                xxl: 64,
              }}  src={paciente.img} />}
              title={'Nombre: ' + paciente.nombre}
              description={'Teléfono: ' + paciente.telefono}
            />
          </Card>
        </List.Item>
        </>
      )
      }
    />


  );




};

export default Contacts;
