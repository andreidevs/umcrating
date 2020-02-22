<template>
  <v-app>
    <v-container>
      <reg-form></reg-form>
    </v-container>
  </v-app>
</template>

<script>
import RegForm from "@/components/Reg";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    RegForm
  }
};
</script>
