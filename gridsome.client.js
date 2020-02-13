import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faSquare,
  faFilm,
  faMusic,
  faUsers,
  faChalkboardTeacher,
  faTheaterMasks,
  faMobile,
  faEnvelope,
  faCalendarDay,
  faWheelchair,
  faMapMarkerAlt,
  faFile,
  faBars,
  faBuilding,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faAccessibleIcon
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
library.add(
  faCheck,
  faAccessibleIcon,
  faFile,
  faMapMarkerAlt,
  faBuilding,
  faTwitter,
  faBars,
  faInstagram,
  faFacebook,
  faSquare,
  faFilm,
  faMusic,
  faUsers,
  faChalkboardTeacher,
  faTheaterMasks,
  faMobile,
  faEnvelope,
  faCalendarDay,
  faQuestionCircle
);
dom.watch();

export default function(Vue) {
  Vue.component("font-awesome", FontAwesomeIcon);
}
