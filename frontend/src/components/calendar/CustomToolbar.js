import React from "react";
import { Views, Navigate } from "react-big-calendar";
import { Button, Typography, Row, Modal, Space, Select, Tooltip } from "antd";
import { LeftOutlined, RightOutlined, CalendarOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import Draggable from 'react-draggable';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'antd/dist/antd.css';

const { Title } = Typography;
const { Option } = Select;

class CustomToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            disabled: true,
            bounds: { left: 0, top: 0, bottom: 0, right: 0 },
        };
    }

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
        let { label } = this.props
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
                            <Button type="default" size="large" icon={<PlusCircleTwoTone style={{ display: "inline-block", verticalAlign: "initial" }}/>} onClick={this.showModal}>
                                Nueva cita
                            </Button>
                            <Select defaultValue={Views.WEEK} size="large" style={{ width: 100 }} bordered={true} onChange={this.handleChangeView}>
                                <Option value={Views.MONTH}>Mes</Option>
                                <Option value={Views.WEEK}>Semana</Option>
                                <Option value={Views.DAY}>Día</Option>
                                <Option value={Views.AGENDA}>Agenda</Option>
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

export default CustomToolbar;