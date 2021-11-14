import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Button,
  AutoComplete,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AuthContext from "../../context/auth-context";
import DataContext from "../../context/data-context";
import locale from "antd/es/date-picker/locale/es_ES";
import "antd/dist/antd.css";
import { setCita } from "../../firebase/firebase";
import "../../style/calendar.css";
import swal from "sweetalert2";
import { formRules, mapCalendarPacientes } from "./CalendarConfig";

const { RangePicker } = DatePicker;

const CalendarForm = ({
  visible,
  title,
  isEdit,
  onCreate,
  onCancel,
  selectedEvent,
  editMode,
}) => {
  const [form] = Form.useForm();
  const AuthCTX = useContext(AuthContext);
  const { citas, expedientes } = useContext(DataContext);

  const [mappedExpedientes, setMappedExpedientes] = useState([]);
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    console.log("EJECUTA EFFECT EN EL FORM");
    if (visible) form.resetFields();
    if (expedientes && expedientes.length !== 0)
      setMappedExpedientes(mapCalendarPacientes(expedientes));
  }, [expedientes, selectedEvent, visible, form]);

  const onSubmitCreate = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Guardar información de la cita
        try {
          let cita = {
            active: true,
            titulo: values.eventTitle,
            startDate: values.eventTime[0].toDate(),
            endDate: values.eventTime[1].toDate(),
            paciente: userObj.nombre,
            pacienteCorreo: userObj.correo,
            detalles: values.eventDetails || "",
            idDoc: AuthCTX.currentUser.uid,
          };
          console.log("Evento que se guarda en BD:",cita)
          await setCita(cita);
          message.success("Cita creada con éxito");
          form.resetFields();
          onCancel();
        } catch (e) {
          console.log(e);
          message.error("Error al crear cita");
        }
          
        form.resetFields();
        onCreate({
          ...values,
          correoPaciente:userObj.correo,
          nombrePaciente: userObj.nombre,
          nombreDoctor: AuthCTX.currentUser.displayName,
        }); 
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const onDeleteEvent = ({ id }) => {
    console.log(id);
    swal
      .fire({
        title: "¿Estás seguro que deseas eliminar la cita?",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: "SI",
        cancelButtonText: "NO",
      })
      .then(async (result) => {
        if (result.isDenied) {
          try {
            await setCita({ active: false }, id);
            message.success("Cita eliminada con éxito");
          } catch (error) {
            console.log(error);
            message.error("Error al eliminar la cita");
          }
          onCancel();
        }
      });
  };

  const onSubmitEdit = (originalEvent) => {
    console.log("Logica de guardar al editarsh");
    console.log("Evento original recibido en onSubmit: ", originalEvent);
  };

  const overlapRule = {
    validator: async (_, eventTime) => {
      if (eventTime && citas !== [] && citas[0]) {
        const initialDay = eventTime[0].toDate();
        const endDay = eventTime[1].toDate();
        initialDay.setSeconds(0);
        endDay.setSeconds(0);
        const citasDiaInicio = citas.filter(cita => {
          return cita.start.toDateString() === initialDay.toDateString() ? true : false
        });        
        for (let cita of citasDiaInicio) {
          // * Que la hora de la cita a programar NO sea igual a la de otra cita existente
          if (initialDay.toTimeString() === cita.start.toTimeString()) {
            return Promise.reject(
              new Error(
                "La hora de inicio es igual a la de otra cita."
              )
            );
          }
          // * Que la hora de la cita a programar NO este en el rango de otra cita existente
          else if (cita.start.toTimeString() < initialDay.toTimeString()
            && cita.end.toTimeString() > initialDay.toTimeString()) {
            return Promise.reject(
              new Error(
                "La hora de inicio choca con otra cita"
              )
            );
          }
          // * Que la hora de la cita a programar NO este en un hueco entre dos citas
          else if (initialDay.toTimeString() < cita.start.toTimeString()
            && endDay.toTimeString() > cita.start.toTimeString()) {
            return Promise.reject(
              new Error(
                "La hora de fin choca con otra cita"
              )
            );
          }                   
        }
      }
    },
  };

  const createFooter = [
    <Button key="back" onClick={onCancel}>
      Regresar
    </Button>,
    <Button
      key="submit"
      type="primary"
      onClick={(isEdit) ? (() => onSubmitEdit(selectedEvent)) : onSubmitCreate}
    >
      Guardar
    </Button>,
  ];

  const deleteButton = (
    <Button
      key="delete"
      type="danger"
      onClick={() => onDeleteEvent(selectedEvent)}
    >
      Eliminar cita
    </Button>
  );

  return (
    <Modal
      centered
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={isEdit ? [...createFooter, deleteButton] : createFooter}
    >
      <Form
        name="event"
        form={form}
        layout="vertical"
        initialValues={selectedEvent}
      >
        <Form.Item
          name="eventTitle"
          label="Título"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.titleRules}
        >
          <Input
            placeholder="Título de la cita"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item
          name="eventTime"
          label="Inicio y fin esperado de la cita"
          required
          tooltip="Este campo es obligatorio"
          rules={[...formRules.eventTimeRules, overlapRule]}
        >
          <RangePicker
            locale={locale}
            showTime={{ format: "hh:mm a" }}
            format="DD/MM/YYYY hh:mm a"
            placeholder={["Inicio", "Fin"]}
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item
          name="pacienteDetails"
          label="Nombre del paciente"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.patientNameRules}
        >
          <AutoComplete            
            options={mappedExpedientes}
            placeholder="Paciente"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(value, { pacienteObj }) => {
              setUserObj(pacienteObj)
            }}
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>
        <Form.Item
          name="eventDetails"
          label="Detalles adicionales"
          tooltip={{
            title: "Este campo es opcional",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input.TextArea
            placeholder="Información adicional de la cita"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CalendarForm;
