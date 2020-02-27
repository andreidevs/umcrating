<template>
  <v-form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      clearable
      required
      outlined
      shaped
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      class="input-group--focused"
      @click:append="show1 = !show1"
      v-model="password"
      :error-messages="passErrors"
      label="Пароль"
      required
      clearable
      outlined
      shaped
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="submit"
      :disabled="this.$v.$invalid"
      color="success"
    >
      Войти
    </v-btn>
    <v-btn class="mr-4" @click="logout" color="warning">
      Выйти
    </v-btn>
    <noty :messages="notification" />
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import Noty from "@/components/Noty";
export default {
  components: {
    Noty
  },
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },

  data: () => ({
    showPassword: false,
    email: "",
    password: "",
    show1: false,
    alert: false,
    notification: []
  }),
  computed: {
    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Введите пароль");
      !this.$v.password.minLength && errors.push("");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Вы ввели не корректный Email");
      !this.$v.email.required && errors.push("Введите Email");
      return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);
        this.notification.unshift({
          text: "Вы успешно вошли в аккаунт",
          type: "success"
        });
      } catch (error) {
        this.notification.unshift({
          text: "Ошибка входа в аккаунт",
          type: "error"
        });
        console.log("error");
      }
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.notification.unshift({
        text: "Вы вышли из аккаунта",
        type: "info"
      });
    }
  }
};
</script>
