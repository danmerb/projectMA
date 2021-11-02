import React, {useContext} from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth-context';
import locale from 'antd/es/date-picker/locale/es_ES';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;

const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Por favor, indique el inicio y fin de la cita.',
        },
    ],
};

const CalendarForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const AuthCTX = useContext(AuthContext)
    return (
        <Modal
            visible={visible}
            title="Nueva cita"
            okText="Guardar"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate({...values, nombreDoctor:AuthCTX.currentUser.displayName});
                        // ! ACA PUEDO AÑADIR LA VALIDACION DE LAS FECHAS
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="event"                
                initialValues={{
                }}
                
            >
                <Form.Item                    
                    label="Título"
                    name="eventTitle"
                    required tooltip="Este campo es obligatorio"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, inserte un título para la cita.',
                        },
                    ]}
                >
                    <Input placeholder="Título de la cita" />
                </Form.Item>

                <Form.Item name="eventTime" label="Inicio y fin esperado de la cita" required tooltip="Este campo es obligatorio" {...rangeConfig}>
                    <RangePicker
                        locale={ locale }
                        showTime={{ format: 'hh:mm a' }}
                        format="DD/MM/YYYY hh:mm a"
                        placeholder={["Inicio", "Fin"]}
                    />
                </Form.Item>

                
                <Form.Item                    
                    label="Nombre del paciente"
                    name="nombrePaciente"
                    required tooltip="Este campo es obligatorio"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, inserte un título para la cita.',
                        },
                    ]}
                >
                    <Input placeholder="Nombre Paciente" />
                </Form.Item>
                <Form.Item                    
                    label="Email del paciente"
                    name="email"
                    required tooltip="Este campo es obligatorio"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, inserte un email para la cita.',
                        },
                    ]}
                >
                    <Input placeholder="Email del paciente" />
                </Form.Item>
                <Form.Item name="eventDetails" label="Detalles adicionales"
                    tooltip={{
                        title: 'Este campo es opcional',
                        icon: <InfoCircleOutlined />,
                    }}>
                    <Input.TextArea placeholder="Información adicional de la cita." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CalendarForm;