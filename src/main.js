import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers/index";

import { createPinia } from "pinia";
const pinia = createPinia();

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { useLoginStore } from "./store/appstore";

import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(pinia);
const loginStore = useLoginStore();
app.provide("loginStore", loginStore);

app.use(router);
app.use(vuetify);

app.mount("#app");
