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
      outlined
    >
      <v-icon>mdi-login</v-icon>
      Войти
    </v-btn>
    <router-link to="/restore">
      <v-btn class="mr-4" outlined color="warning">
        Забыли пароль?
      </v-btn>
    </router-link>

    <noty :messages="notification" />
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
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
    ...mapActions({
      LOGIN: "LOGIN_USER",
      LOGOUT: "LOGOUT"
    }),
    async submit() {
      this.$v.$touch();
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.LOGIN(formData);
        this.$notify({
          group: "app",
          type: "success",
          text: "Вы успешно вошли в аккаунт"
        });
      } catch (error) {
        this.$notify({
          group: "app",
          type: "error",
          text: "Ошибка входа в аккаунт"
        });
      }
    },
    async logout() {
      await this.LOGOUT();
      this.$notify({
        group: "app",
        type: "info",
        text: "Вы вышли из аккаунта"
      });
    }
  }
};
</script>
