import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import firebase from "firebase/app";
import firebaseConfig from "./config/firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Notifications from "vue-notification";
import velocity from "velocity-animate";

Vue.use(Notifications, { velocity });
Vue.use(Vuelidate);

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
