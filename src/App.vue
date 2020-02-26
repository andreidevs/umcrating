<template>
  <v-app>
    <v-container>
      <login></login>
    </v-container>
  </v-app>
</template>

<script>
import Login from "@/components/Login";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    Login
  }
};
</script>
