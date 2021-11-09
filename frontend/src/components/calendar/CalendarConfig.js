import { localizer } from "./Localizer"

const calendarMessages = {
  'today': "Hoy", "previous": 'Anterior', "next": "Siguiente",
  "month": "Mes", "week": "Semana", "day": "Día", "date": "Fecha",
  "time": "Hora", "event": "Evento", "noEventsInRange": "No hay citas en este rango."
}

const rangeFormat = ({ start, end }) =>
  localizer.format(start, 'hh:mm A') + ' – ' + localizer.format(end, 'hh:mm A');

const calendarFormats = {
  timeGutterFormat: 'hh:mm A',
  agendaTimeFormat: 'hh:mm A',
  dayHeaderFormat: 'dddd D MMM',
  agendaDateFormat: 'ddd D MMM',
  eventTimeRangeFormat: rangeFormat,
  selectRangeFormat: rangeFormat
}

const formRules = {
  titleRules: [
    {
      required: true,
      message: "Por favor, ingrese un título para la cita.",
    },
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
        if (eventTime && eventTime[0].toDate() < dateAfterDelay) {
          return Promise.reject(
            new Error("La hora de inicio es anterior a la hora actual")
          );
        }
      },
    },
    {
      validator: async (_, eventTime) => {
        if (eventTime && eventTime[0].toDate() > eventTime[1].toDate()) {
          return Promise.reject(
            new Error(
              "La fecha/hora de fin no puede ser despues que la inicial"
            )
          );
        }
      },
    },
  ],
  patientNameRules: [
    {
      required: true,
      message: "Por favor, ingrese el nombre del paciente.",
    },
  ]
};

const mapCalendarPacientes = (arr) => {
  return arr.map(paciente => {
    return {
      value: paciente.nombre,
      pacienteObj: paciente
    }
  })
}

export { calendarMessages, calendarFormats, formRules, mapCalendarPacientes }