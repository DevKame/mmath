import { createApp } from 'vue'
import App from './App.vue'


// ASSETS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/styles/colors.css";
import "./assets/styles/classes.css";
import "./assets/styles/fonts.css";
import "./assets/styles/main.css";
// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faPlay, faLayerGroup, faClock, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';
library.add(faPlay);
library.add(faLayerGroup);
library.add(faClock);
library.add(faUpRightAndDownLeftFromCenter);

// CUSTOM COMPS
import TextBlock from "./comps/multi/TextBlock.vue";
import ThePlay from "./comps/ThePlay.vue";
import RangeInput from "./comps/multi/RangeInput.vue";


const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.component("text-block", TextBlock);
app.component("the-play", ThePlay);
app.component("range-input", RangeInput);
app.mount('#app')
