import firebase from "firebase/app";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch }, { email, password, name }) {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch("getUid");
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
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
