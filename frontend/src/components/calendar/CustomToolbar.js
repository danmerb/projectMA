import React from "react";
import { Views, Navigate } from "react-big-calendar";
import { Button, Typography, Row, Modal, Space, Select, Tooltip } from "antd";
import { LeftOutlined, RightOutlined, CalendarOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import CalendarForm from "./CalendarForm"
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
        };
    }

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

    handleCancel = () => {
        this.setState({ visible: false });
    };

    onCreate = (values) => {
        console.log('Received values of form: ', values);
        console.log("Event time: ", values.eventTime);
        console.log("Event time[0] :", values.eventTime[0]);
        console.log("Fecha inicio: ", values.eventTime[0].toDate());
        console.log("Fecha FIN: ", values.eventTime[1].toDate());
        this.handleCancel();
    };

    render() {
        const { visible } = this.state;
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
                <CalendarForm
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={this.handleCancel}
                />
            </>

        );
    }
}

export default CustomToolbar;