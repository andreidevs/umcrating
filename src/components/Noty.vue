<template>
  <v-container class="position">
    <v-alert
      transition="scale-transition"
      outlined
      v-for="message in messages"
      :key="message.text"
      :color="message.color"
      :icon="message.icon"
      :type="message.type"
      width="33%"
    >
      {{ message.text }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => {
        return [];
      }
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {};
  },
  methods: {
    hideNotification() {
      let vm = this;
      if (this.messages.length) {
        setTimeout(function() {
          vm.messages.splice(vm.messages.length - 1, 1);
        }, vm.timeout);
      }
    }
  },
  watch: {
    messages() {
      this.hideNotification();
    }
  },
  mounted() {
    this.hideNotification();
  }
};
</script>

<style lang="scss">
.position {
  position: fixed;
  top: 1vh;
  left: 68vw;
  z-index: 10;
  @media (max-width: 1000px) {
    top: 1vh;
    left: 60vw;
  }
}
</style>
