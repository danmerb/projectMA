import { momentLocalizer } from "react-big-calendar";
import { momentConfig } from "./CalendarConfig"
import moment from "moment";
import "moment/locale/es";

moment.updateLocale('es', momentConfig)
const localizer = momentLocalizer(moment);

export { localizer }