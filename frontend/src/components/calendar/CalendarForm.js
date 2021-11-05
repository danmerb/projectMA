import React, { useContext, useEffect } from "react";
import { Modal, Form, Input, DatePicker, message, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AuthContext from "../../context/auth-context";
import locale from "antd/es/date-picker/locale/es_ES";
import "antd/dist/antd.css";
import { setCita } from "../../firebase/firebase";
import '../../style/calendar.css'
import swal from "sweetalert2";

const { RangePicker } = DatePicker;

const formRules = {
  titleRules: [
    {
      required: true,
      message: "Por favor, ingrese un título para la cita.",
    }
  ],
  eventTimeRules: [
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
        //console.log(`Initial values: Now: ${now}\n minutesDelay: ${minutesDelay}\n dateAfterDelay: ${dateAfterDelay}\n`);
        dateAfterDelay.setMinutes(now.getMinutes() - minutesDelay);
        //console.log(`End values: Now: ${now}\n minutesDelay: ${minutesDelay}\n dateAfterDelay: ${dateAfterDelay}\n`);
        if (eventTime && (eventTime[0].toDate() < dateAfterDelay)) {
          return Promise.reject(new Error('La hora de inicio es anterior a la hora actual'));
        }
      },
    },
    {
      validator: async (_, eventTime) => {
        if (eventTime && (eventTime[0].toDate() > eventTime[1].toDate())) {
          return Promise.reject(new Error('La fecha/hora de fin no puede ser despues que la inicial'));
        }
      },
    }

  ],
  patientNameRules: [
    {
      required: true,
      message: "Por favor, ingrese el nombre del paciente.",
    }
  ],
  patientEmailRules: [
    {
      required: true,
      message: "Por favor, ingrese el correo del paciente.",
    },
    {
      type: "email",
      message: "El correo ingresado no tiene formato valido, por favor revise."
    }
  ],
  detailsRules: []
}

const CalendarForm = ({ visible, title, isEdit, onCreate, onCancel, selectedEvent, editMode }) => {
  const [form] = Form.useForm();
  const AuthCTX = useContext(AuthContext);

  useEffect(() => {
    console.log("EJECUTA EFFECT EN EL FORM");
    if (visible) form.resetFields();
  }, [selectedEvent, visible, form]);

  const onSubmitCreate = () => {
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
  }

  const onDeleteEvent = ({ id }) => {
    console.log(id);
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
          onCancel();
        }
      });
  };

  const onSubmitEdit = () => {
    console.log("Logica de guardar al editarsh");
  }

  const createFooter = [
    <Button key="back"
      onClick={onCancel}>
      Regresar
    </Button>,
    <Button key="submit"
      type="primary"
      onClick={(isEdit) ? onSubmitEdit : onSubmitCreate}
    >
      Guardar
    </Button>
  ];

  const deleteButton =
    <Button key="delete"
      type="danger"
      onClick={() => onDeleteEvent(selectedEvent)}>
      Eliminar cita
    </Button>;

  return (
    <Modal
      centered
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={(isEdit) ? ([...createFooter, deleteButton]) : (createFooter)}
    >
      <Form name="event"
        form={form}
        layout="vertical"
        initialValues={selectedEvent}
      >

        <Form.Item name="eventTitle"
          label="Título"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.titleRules}
        >
          <Input
            placeholder="Título de la cita"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item name="eventTime"
          label="Inicio y fin esperado de la cita"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.eventTimeRules}
        >
          <RangePicker
            locale={locale}
            showTime={{ format: "hh:mm a" }}
            format="DD/MM/YYYY hh:mm a"
            placeholder={["Inicio", "Fin"]}
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item name="nombrePaciente"
          label="Nombre del paciente"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.patientNameRules}
        >
          <Input
            placeholder="Nombre Paciente"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item name="correoPaciente"
          label="Correo del paciente"
          required
          tooltip="Este campo es obligatorio"
          rules={formRules.patientEmailRules}
        >
          <Input
            placeholder="Correo del paciente"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

        <Form.Item name="eventDetails"
          label="Detalles adicionales"
          tooltip={{
            title: "Este campo es opcional",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input.TextArea
            placeholder="Información adicional de la cita"
            bordered={editMode}
            disabled={!editMode}
          />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CalendarForm;
