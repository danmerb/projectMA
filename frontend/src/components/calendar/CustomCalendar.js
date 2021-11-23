import React, { useState, useContext, useEffect } from "react";
import DataContext from "../../context/data-context";
import { Calendar, Views } from "react-big-calendar";
import { Row, Space, Typography, Switch, notification } from 'antd'
import { MedicineBoxOutlined } from '@ant-design/icons'
import { calendarMessages, calendarFormats } from "./CalendarConfig";
import axios from "axios";
import { localizer, moment } from "./Localizer";
import CustomToolbar from "./CustomToolbar";
import CalendarForm from "./CalendarForm";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "antd/dist/antd.css";

const { Text } = Typography;

const CustomCalendar = () => {
  const { citas } = useContext(DataContext);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    const today = new Date();
    const day = today.toDateString();    
    today.setSeconds(0);
    const time = today.toTimeString();
    if (citas !== [] && citas[0]) {
      //console.log(day+"     "+citas[0].start.toDateString())
      const citasDeHoy = citas.filter(cita => {
        return cita.start.toDateString() === day ? true : false
      })
      citasDeHoy.forEach(cita => {
        if (cita.start.toTimeString() >= time || cita.end.toTimeString() >= time)
          notification.success({
            message: `Cita para el día de hoy!`,
            description:
              `Cita con ${cita.paciente} sobre ${(cita.title).toLowerCase()} a las ${moment(cita.start).format('hh:mm A')}.`,
            placement: 'bottomRight',
            icon: <MedicineBoxOutlined style={{ color: '#108ee9' }} />
          });
      });
    }
  }, [citas]);

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  const showEditModal = (event) => {
    console.log("Evento recibido en show dit Modal: ", event);
    setEditVisible(true);
    const userObjData = {
      nombre: event.paciente,
      correo: event.pacienteCorreo,
    }
    const data = {
      id: event.id,
      eventTitle: event.title,
      eventTime: [moment(event.start), moment(event.end)],
      eventDetails: event.details,
      pacienteDetails: event.paciente,
      userObj: userObjData
    }
    setSelectedEvent(data);
    /*setSelectedEvent((state) => {
      return state;
    });*/
  };

  const handleCancel = () => {
    setCreateVisible(false);
    setEditVisible(false);
    onChangeMode(false);
  };

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    const event = {
      title: values.eventTitle,
      start: values.eventTime[0].toDate(),
      end: values.eventTime[1].toDate(),
      details: values.eventDetails,
      email: values.correoPaciente,
      nombrePaciente: values.nombrePaciente,
      nombreDoctor: values.nombreDoctor,
    };
    console.log("CALENDAR CALLBACK ", event);
    await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/mailer/send`, {
      ...event,
    });
    handleCancel();
  };

  const onChangeMode = (checked) => {
    setEnableEdit(checked);
  };

  const handleColorChange = (event, start, end, isSelected) => {
    const today = new Date();
    today.setSeconds(0);
    const day = today.toDateString();
    const time = today.toTimeString();
    const customStyle = {
      backgroundColor: "#006FC1",
      borderColor: "#006FC1"
    }
    if (end.toDateString() < day || (end.toDateString() == day && end.toTimeString() < time)) {
      customStyle.backgroundColor = "#91A2AF";
      customStyle.borderColor = "#91A2AF";
    }
    else if (end.toDateString() == day && start.toTimeString() <= time && end.toTimeString() >= time) {
      customStyle.backgroundColor = "#06A7B9";
      customStyle.borderColor = "#06A7B9";
    }
    else if (start.toDateString() > day || (end.toDateString() == day && start.toTimeString() > time)) {
      customStyle.backgroundColor = "#006FC1";
      customStyle.borderColor = "#006FC1";
    }
    return { style: customStyle }
  };

  return (
    <>
      <Calendar
        popup
        localizer={localizer}
        events={citas}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} showCreateModalProp={showCreateModal} />
          ),
        }}
        style={{ height: "75vh", margin: 5 }}
        defaultView={Views.WEEK}
        messages={calendarMessages}
        formats={calendarFormats}
        scrollToTime={new Date()}
        onSelectEvent={showEditModal}
        dayLayoutAlgorithm='no-overlap'
        eventPropGetter={handleColorChange}
      />
      <CalendarForm
        visible={createVisible}
        title="Nueva cita"
        isEdit={false}
        onCreate={onCreate}
        onCancel={handleCancel}
        selectedEvent={null}
        editMode={true}
      />
      <CalendarForm
        visible={editVisible}
        title={
          <Row justify="space-between">
            Detalles de cita
            <Space style={{ marginRight: 50 }}>
              <Text>Activar modo de edición: </Text>
              <Switch
                onChange={onChangeMode}
                size="small"
                checked={enableEdit} />
            </Space>
          </Row>
        }
        isEdit={editVisible}
        onCreate={onCreate}
        onCancel={handleCancel}
        selectedEvent={selectedEvent}
        editMode={enableEdit}
      />
    </>
  );
};

export default CustomCalendar;
