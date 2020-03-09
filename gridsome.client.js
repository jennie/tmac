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
  faQuestionCircle,
  faLink
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
  faAccessibleIcon,
  faBars,
  faBuilding,
  faCalendarDay,
  faChalkboardTeacher,
  faCheck,
  faEnvelope,
  faFacebook,
  faFile,
  faFilm,
  faInstagram,
  faLink,
  faMapMarkerAlt,
  faMobile,
  faMusic,
  faQuestionCircle,
  faSquare,
  faTheaterMasks,
  faTwitter,
  faUsers
);
dom.watch();

export default function(Vue) {
  Vue.component("font-awesome", FontAwesomeIcon);
}
