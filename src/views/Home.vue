<template>
  <v-vontainer fluid>
    <v-row>
      <v-col>
        <h1 class="display-3 font-weight-black text-uppercase" width="10%">
          <span class=" mdi mdi-star-circle-outline">рейтинг</span>
          <span class=" mdi mdi-emoticon-happy-outline">твоего</span>
          <span class=" mdi mdi-school-outline">колледжа</span>
        </h1>
      </v-col>
      <v-col>
        <login class="login" />
      </v-col>
    </v-row>
    <router-link class="rlink" to="/signup">
      <v-btn rounded color="primary" depressed large>
        <v-icon>mdi-account-plus-outline</v-icon>Регистрация</v-btn
      >
    </router-link>
  </v-vontainer>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "Home",
  components: {
    Login
  }
};
</script>

<style lang="scss" scoped>
h1 {
  // padding-top: 10%;
  display: inline-flex;
  flex-direction: column;
  // padding-left: 5%;
}
h1 span {
  padding-bottom: 0.2em;
}
// .login {
//   // display: inline-flex;
//   padding-left: 45%;
//   width: 90%;
//   margin-top: -18%;
// }
// .rlink {
//   padding-top: 25%;
//   padding-left: 40%;
// }
</style>
