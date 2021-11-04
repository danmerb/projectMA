import React, { useState, useContext } from "react";
import DataContext from "../../context/data-context";
import { Calendar, Views } from "react-big-calendar";
import { calendarMessages, calendarFormats } from "./CalendarConfig";
import axios from "axios";
import { localizer } from "./Localizer";
import CustomToolbar from "./CustomToolbar";
import CalendarForm from "./CalendarForm";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "antd/dist/antd.css";
import swal from "sweetalert2";
import { setCita } from "../../firebase/firebase";

const CustomCalendar = () => {
  const { citas } = useContext(DataContext);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
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
    await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/mailer/send`, {
      ...event,
    });

    handleCancel();
  };

  const onSelectEvent = ({ id }) => {
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
          } catch (error) {
            console.log(error);
          }
        }
      });
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        events={citas}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} showCreateModalProp={showModal} />
          ),
        }}
        style={{ height: "75vh", margin: 5 }}
        defaultView={Views.WEEK}
        messages={calendarMessages}
        formats={calendarFormats}
        scrollToTime={new Date()}
        onSelectEvent={onSelectEvent}
      />
      <CalendarForm
        visible={visible}
        onCreate={onCreate}
        onCancel={handleCancel}
      />
    </>
  );
};

export default CustomCalendar;
