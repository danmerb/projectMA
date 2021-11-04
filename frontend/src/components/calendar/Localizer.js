import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

const momentConfig = {
  months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  weekdaysShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
}

moment.updateLocale('es', momentConfig)
const localizer = momentLocalizer(moment);

export { moment, localizer }