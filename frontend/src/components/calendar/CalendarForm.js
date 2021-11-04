import React, { useContext } from "react";
import { Modal, Form, Input, DatePicker, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AuthContext from "../../context/auth-context";
import locale from "antd/es/date-picker/locale/es_ES";
import "antd/dist/antd.css";
import { setCita } from "../../firebase/firebase";
import '../../style/calendar.css'

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Por favor, indique el inicio y fin de la cita.",
    },
    {
      validator: async (_, eventTime) => {        
        const now = new Date();
        const minutesDelay = 5;
        const dateAfterDelay = now;
        console.log(`Initial values: Now: ${now}\n minutesDelay: ${minutesDelay}\n dateAfterDelay: ${dateAfterDelay}\n`);
        dateAfterDelay.setMinutes(now.getMinutes() - minutesDelay);
        console.log(`End values: Now: ${now}\n minutesDelay: ${minutesDelay}\n dateAfterDelay: ${dateAfterDelay}\n`);
        if (eventTime && (eventTime[0].toDate() < dateAfterDelay)) {
          return Promise.reject(new Error('La hora de inicio es anterior a la hora actual'));
        }
      },
    },
    {
      validator: async (_, eventTime) => {
        if (eventTime && (eventTime[0].toDate() > eventTime[1].toDate())) {
          return Promise.reject(new Error('La fecha de fin no puede ser despues que la de inicio'));
        }
      },
    }
  ],
};

const CalendarForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const AuthCTX = useContext(AuthContext);
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
          .then(async (values) => {
            // Guardar información de la cita
            try {
              let cita = {
                active: true,
                titulo: values.eventTitle,
                startDate: values.eventTime[0].toDate(),
                endDate: values.eventTime[1].toDate(),
                paciente: values.nombrePaciente,
                pacienteCorreo: values.correoPaciente,
                detalles: values.eventDetails || "",
                idDoc: AuthCTX.currentUser.uid,
              };

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
              nombreDoctor: AuthCTX.currentUser.displayName,
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="event" initialValues={{}}>
        <Form.Item
          label="Título"
          name="eventTitle"
          required
          tooltip="Este campo es obligatorio"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese un título para la cita.",
            },
          ]}
        >
          <Input placeholder="Título de la cita" />
        </Form.Item>

        <Form.Item
          name="eventTime"
          label="Inicio y fin esperado de la cita"
          required
          tooltip="Este campo es obligatorio"
          {...rangeConfig}
        >
          <RangePicker
            locale={locale}
            showTime={{ format: "hh:mm a" }}
            format="DD/MM/YYYY hh:mm a"
            placeholder={["Inicio", "Fin"]}
          />
        </Form.Item>

        <Form.Item
          label="Nombre del paciente"
          name="nombrePaciente"
          required
          tooltip="Este campo es obligatorio"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el nombre del paciente.",
            },
          ]}
        >
          <Input placeholder="Nombre Paciente" />
        </Form.Item>
        <Form.Item
          label="Correo del paciente"
          name="correoPaciente"
          required
          tooltip="Este campo es obligatorio"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el correo del paciente.",
            },
            {
              type: "email",
              message: "Tienes que ingresar un correo"
            }
          ]}
        >
          <Input placeholder="Correo del paciente" />
        </Form.Item>
        <Form.Item
          name="eventDetails"
          label="Detalles adicionales"
          tooltip={{
            title: "Este campo es opcional",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input.TextArea placeholder="Información adicional de la cita" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CalendarForm;
