import { createApp } from 'vue'
import App from './App.vue'


// ASSETS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.mount('#app')
