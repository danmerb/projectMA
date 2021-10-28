import React from "react";
import { Calendar, momentLocalizer, Views, Navigate } from "react-big-calendar";
import { Button, Typography, Row, Modal, Space, Select, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined, CalendarOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import moment from "moment";
import Draggable from 'react-draggable';
import { momentConfig, calendarMessages, calendarFormats } from "./CalendarConfig"
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'antd/dist/antd.css';

const { Title } = Typography;
const { Option } = Select;

moment.updateLocale('es', momentConfig)
export const localizer = momentLocalizer(moment);

let events = [
    {
        id: 14,
        title: 'Maths',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'English',
        start: new Date(new Date().setHours(new Date().getHours() - 2)),
        end: new Date(new Date().setHours(new Date().getHours() + 2)),
    },
]

class CustomToolbar extends React.Component {

    state = {
        visible: false,
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    };

    draggleRef = React.createRef();

    navigate = action => {
        this.props.onNavigate(action)
    }

    handleChangeView = view => {
        this.props.onView(view)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = this.draggleRef?.current?.getBoundingClientRect();
        this.setState({
            bounds: {
                left: -targetRect?.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect?.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            },
        });
    };

    render() {
        const { bounds, disabled, visible } = this.state;
        let { localizer: { messages }, label } = this.props
        return (
            <>
                <Row justify="space-between" align="middle">

                    <Row justify="space-around" align="middle">
                        <Tooltip title="Anterior">
                            <Button type="text" shape="circle" icon={<LeftOutlined />} size="large" onClick={this.navigate.bind(null, Navigate.PREVIOUS)} />
                        </Tooltip>
                        <Tooltip title="Siguiente">
                            <Button type="text" shape="circle" icon={<RightOutlined />} size="large" onClick={this.navigate.bind(null, Navigate.NEXT)} />
                        </Tooltip>
                        <Tooltip title="Hoy">
                            <Button type="text" shape="circle" icon={<CalendarOutlined />} size="large" onClick={this.navigate.bind(null, Navigate.TODAY)} />
                        </Tooltip>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Title level={5}>{label}</Title>
                    </Row>
                    <Row justify="space-around" align="middle">
                        <Space size={10}>
                            <Button type="default" icon={<PlusCircleTwoTone />} size="large" onClick={this.showModal} disabled>
                                Nueva cita
                            </Button>
                            <Select defaultValue="week" size="large" style={{ width: 100 }} bordered={true} onChange={this.handleChangeView}>
                                <Option value="month">Mes</Option>
                                <Option value="week">Semana</Option>
                                <Option value="day">Día</Option>
                                <Option value="agenda">Agenda</Option>
                            </Select>
                        </Space>
                    </Row>
                </Row>
                <br />
                <Modal
                    title={
                        <div
                            style={{
                                width: '100%',
                                cursor: 'move',
                            }}
                            onMouseOver={() => {
                                if (disabled) {
                                    this.setState({
                                        disabled: false,
                                    });
                                }
                            }}
                            onMouseOut={() => {
                                this.setState({
                                    disabled: true,
                                });
                            }}
                            // fix eslintjsx-a11y/mouse-events-have-key-events
                            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                            onFocus={() => { }}
                            onBlur={() => { }}
                        // end
                        >
                            Draggable Modal
                        </div>
                    }
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Submit
                        </Button>,
                        <Button
                            key="other"
                            type="primary"
                            onClick={this.handleOk}
                        >
                            Otro boton
                        </Button>,
                    ]}
                    modalRender={modal => (
                        <Draggable
                            disabled={disabled}
                            bounds={bounds}
                            onStart={(event, uiData) => this.onStart(event, uiData)}
                        >
                            <div ref={this.draggleRef}>{modal}</div>
                        </Draggable>
                    )}
                >
                    <p>
                        SOME TEXT
                    </p>
                </Modal>
            </>

        );
    }
}

class CustomCalendar extends React.Component {

    state = {
        events: events
    };

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
            <div>
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
            </div>
        )
    }
}

export default CustomCalendar;