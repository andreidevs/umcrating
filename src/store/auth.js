import firebase from "firebase/app";

export default {
  state: {
    uid: null
  },
  getters: {
    STATE: state => state
  },
  mutations: {
    SET_UID(state, data) {
      state.uid = data;
    }
  },
  actions: {
    async LOGIN_USER({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async SIGN_USER({ dispatch }, { email, password, name }) {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch("GET_UID");
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set({
          name
        })
        .then(function() {
          console.log("Sucsessful");
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    GET_UID() {
      const data = firebase.auth().currentUser;
      return data ? data.uid : null;
    },
    async LOGOUT() {
      await firebase.auth().signOut();
    }
  }
};
