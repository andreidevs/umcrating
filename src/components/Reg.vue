<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="120"
      :error-messages="nameErrors"
      label="Имя"
      required
      clearable
      outlined
      shaped
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
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

    <v-checkbox
      v-model="checkbox"
      label="Согласен с правилами"
      required
      :error-messages="checkboxErrors"
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn
      class="mr-4"
      @click="submit"
      :disabled="this.$v.$invalid"
      color="success"
    >
      Зарегистрироваться
    </v-btn>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(120) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    showPassword: false,
    name: "",
    email: "",
    password: "",
    checkbox: false,
    show1: false
  }),
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      return errors;
    },
    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Введите пароль");
      !this.$v.password.minLength &&
        errors.push("Пароль должен быть не меньше 8 символов");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Имя должно быть не больше 50 символов");
      !this.$v.name.required && errors.push("Заполните поле Имя");
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
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.checkbox = false;
    }
  }
};
</script>
