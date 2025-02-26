import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import "@fortawesome/fontawesome-free/css/all.css";

// Importa los componentes de Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Añade los iconos a la librería
library.add(faFacebookSquare, faTwitter, faInstagram);

// Crea una sola instancia de Vue
createApp(App)
  .use(store)  // Usa el store (si estás utilizando Vuex o Pinia)
  .use(router) // Usa el router
  .component("font-awesome-icon", FontAwesomeIcon) // Registra el componente de FontAwesome
  .mount("#app"); // Monta la aplicación en el div con id "app"
