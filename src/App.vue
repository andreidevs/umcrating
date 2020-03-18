<template>
  <v-app>
    <router-view></router-view>
    <notifications
      group="app"
      position="bottom right"
      animation-type="velocity"
    />
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
