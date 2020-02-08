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
  faCalendarDay
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { dom } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
library.add(
  faCheck,
  faTwitter,
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
  faCalendarDay
);
dom.watch();

export default function(Vue) {
  Vue.component("font-awesome", FontAwesomeIcon);
}
