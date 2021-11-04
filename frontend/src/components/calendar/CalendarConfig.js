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

export { calendarMessages, calendarFormats }