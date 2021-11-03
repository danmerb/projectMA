import React, { useState } from "react";
import { Calendar, Views } from "react-big-calendar";
import { calendarMessages, calendarFormats } from "./CalendarConfig"
import axios from "axios"
import { localizer } from "./Localizer"
import CustomToolbar from "./CustomToolbar"
import CalendarForm from "./CalendarForm"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "antd/dist/antd.css";

const CustomCalendar = () => {
    const myEvents = [
        {
            id: 14,
            title: 'Matemáticas',
            start: new Date(new Date().setHours(new Date().getHours() - 3)),
            end: new Date(new Date().setHours(new Date().getHours() + 3)),
            details: "Detalles de la materia de mate xdxd"
        },
        {
            id: 15,
            title: 'Ingles',
            start: new Date(new Date().setHours(new Date().getHours() - 2)),
            end: new Date(new Date().setHours(new Date().getHours() + 2)),
            details: "Detalles de la materia de ingles xdxd"
        },
    ]
    const [events, setEvents] = useState(myEvents);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onCreate = async (values) => {
        console.log('Received values of form: ', values);
        const event = {
            title: values.eventTitle,
            start: values.eventTime[0].toDate(),
            end: values.eventTime[1].toDate(),
            details: values.eventDetails,
            email: values.email,
            nombrePaciente: values.nombrePaciente,
            nombreDoctor: values.nombreDoctor
        }
        console.log(event);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/mailer/send`, {
            ...event
        })
        console.log(res)
        setEvents(
            [
                ...events,
                event
            ]
        );
        handleCancel();
    };

    const onSelectEvent = (event) => {
        console.log("Eveento HP: ", event);
        console.log("Detalles almacenados: ", event.details);
        (event.details) ? alert(`${event.title}\n${event.details}`) : alert(event.title);
    }

    const handleSelect = ({ start, end }) => {
        console.log("Handle select from functional component xd");
        const title = window.prompt('Título de la cita')
        if (title)
            setEvents(
                [
                    ...events,
                    {
                        start,
                        end,
                        title,
                    }
                ]
            );
        console.log("Start: \n", start, "\ntipo de start: ", typeof start);
        console.log("\nEnd: \n", end, "\ntipo de end: ", typeof end);
    }

    return (
        <>
            <Calendar
                selectable
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                components={{
                    toolbar: (props) => <CustomToolbar {...props}
                        showCreateModalProp={showModal}
                    />
                }}
                style={{ height: "75vh", margin: 5 }}
                defaultView={Views.WEEK}
                messages={calendarMessages}
                formats={calendarFormats}
                scrollToTime={new Date()}
                onSelectEvent={onSelectEvent}
                onSelectSlot={handleSelect}
            />
            <CalendarForm
                visible={visible}
                onCreate={onCreate}
                onCancel={handleCancel}
            />
        </>
    );
}

export default CustomCalendar;