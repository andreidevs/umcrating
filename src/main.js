import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyDgdPp-SHVH9zlj-YIJePT0YMaJT6BObUQ",
  authDomain: "umcrating0.firebaseapp.com",
  databaseURL: "https://umcrating0.firebaseio.com",
  projectId: "umcrating0",
  storageBucket: "umcrating0.appspot.com",
  messagingSenderId: "953597292492",
  appId: "1:953597292492:web:2e5c5a9cdcc3a5a53bb769",
  measurementId: "G-XQHBH50FFJ"
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
