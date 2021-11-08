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
  ],
  patientEmailRules: [
    {
      required: true,
      message: "Por favor, ingrese el correo del paciente.",
    },
    {
      type: "email",
      message: "El correo ingresado no tiene formato valido, por favor revise.",
    },
  ],
  detailsRules: [],
};

const mapCalendarPacientes = (arr) =>{
  return arr.map(paciente=>{
    return {
      value:paciente.nombre,
      pacienteObj:paciente
    }
  })
} 

export {formRules, mapCalendarPacientes}