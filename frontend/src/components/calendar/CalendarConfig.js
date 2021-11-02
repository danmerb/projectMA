const momentConfig = {
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    weekdaysShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
}

const calendarMessages = {
    'today': "Hoy", "previous": 'Anterior', "next": "Siguiente",
    "month": "Mes", "week": "Semana", "day": "Día", "date": "Fecha",
    "time": "Hora", "event": "Evento", "noEventsInRange": "No hay citas en este rango."
}

const calendarFormats = {
    timeGutterFormat: 'hh:mm A',
    agendaTimeFormat: 'hh:mm A',
    dayHeaderFormat: 'dddd D MMM',
    agendaDateFormat: 'ddd D MMM'
}

export { momentConfig, calendarMessages, calendarFormats}