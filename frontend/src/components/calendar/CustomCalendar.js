import React from "react";
import { Calendar, Views} from "react-big-calendar";
import { calendarMessages, calendarFormats } from "./CalendarConfig"
import { localizer } from "./Localizer"
import CustomToolbar from "./CustomToolbar"
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "antd/dist/antd.css";

let events = [
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
            events: events
        };
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
    }

    render() {
        const { events } = this.state;
        return (
                <Calendar
                    selectable
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    components={{
                        toolbar: CustomToolbar
                    }}
                    style={{ height: "100vh", margin: 5}}
                    defaultView={Views.WEEK}
                    messages={calendarMessages}
                    formats={calendarFormats}
                    scrollToTime={new Date()}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />
        )
    }
}

export default CustomCalendar;