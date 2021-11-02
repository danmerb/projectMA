import React from "react";
import { Calendar, Views} from "react-big-calendar";
import { calendarMessages, calendarFormats } from "./CalendarConfig"
import { localizer } from "./Localizer"
import CustomToolbar from "./CustomToolbar"
import CalendarForm from "./CalendarForm"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "antd/dist/antd.css";

const events = [
    {
        id: 14,
        title: 'Matemáticas',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Ingles',
        start: new Date(new Date().setHours(new Date().getHours() - 2)),
        end: new Date(new Date().setHours(new Date().getHours() + 2)),
    },
]

class CustomCalendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            events: events,
            visible: false,
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onCreate = (values) => {
        console.log('Received values of form: ', values);
        const event = {
            title: values.eventTitle,
            start: values.eventTime[0].toDate(),
            end: values.eventTime[1].toDate(),
            details: values.eventDetails
        }
        console.log(event);
        this.setState({
            events: [
                ...this.state.events,
                event
            ],
        })
        this.handleCancel();
    };

    onSelectEvent = (event) => {        
        console.log("Eveento HP: ", event);
        console.log("Detalles almacenados: ", event.details);
        alert((event.title).toString() + "\n" + (event.details).toString());
    }
    
    handleSelect = ({ start, end }) => {
        const title = window.prompt('Título de la cita')
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
        console.log("Start: \n", start, "\ntipo de start: ",typeof start);
        console.log("\nEnd: \n", end, "\ntipo de end: ",typeof end);
    }

    render() {
        const { events, visible } = this.state;
        
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
                            showCreateModalProp={this.showModal}
                            
                        />
                    }}
                    style={{ height: "75vh", margin: 5}}
                    defaultView={Views.WEEK}
                    messages={calendarMessages}
                    formats={calendarFormats}
                    scrollToTime={new Date()}
                    onSelectEvent={this.onSelectEvent}
                    onSelectSlot={this.handleSelect}
                />
                <CalendarForm
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={this.handleCancel}
                />
            </>
        )
    }
}

export default CustomCalendar;