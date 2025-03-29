<script setup lang="ts">
import { ref } from 'vue';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth.ts';
import { Form } from 'vee-validate';


import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // دسترسی به تابع t برای ترجمه
const checkbox = ref(false);
const valid = ref(false);
const show = ref(false);
const password = ref('12345678');
const username = ref('mohammadNadr');
// Password validation rules
const passwordRules = ref([
  (v: string) => !!v || t('passwordRequired'),
  (v: string) => v === v.trim() || t('passwordSpaces'),
  (v: string) => v.length <= 10 || t('passwordLength')
]);
// Email validation rules
const emailRules = ref([
  (v: string) => !!v.trim() || t('emailRequired'),
  (v: string) => {
    const trimmedEmail = v.trim();
    return !/\s/.test(trimmedEmail) || t('emailSpaces');
  },
  (v: string) => /.+@.+\..+/.test(v.trim()) || t('emailValid')
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {
  // Trim the username before validation
  const trimmedUsername = username.value.trim();

  // Update the username with trimmed value
  username.value = trimmedUsername;

  const authStore = useAuthStore();
  return authStore.login(trimmedUsername, password.value).catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">
      {{ $t('login') }}
    </h3>
    <router-link
      :to="{name:'Register'}"
      class="text-primary text-decoration-none"
    >
      {{ $t('dontHaveAccount') }}
    </router-link>
  </div>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>{{ $t('emailAddress') }}</v-label>
      <v-text-field
        aria-label="email address"
        v-model="username"
        :rules="emailRules"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
        @input="username"
      ></v-text-field>
    </div>
    <div>
      <v-label>{{ $t('password') }}</v-label>
      <v-text-field
        aria-label="password"
        v-model="password"
        :rules="passwordRules"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show ? 'text' : 'password'"
        class="mt-2"
        @input="password"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show == false" @click="show = !show" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show == true" @click="show = !show" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        :label="$t('keepMeSignedIn')"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ms-auto">
        <router-link  :to="{name:'Forgot Password'}" class="text-darkText link-hover"> {{ $t('forgotPassword') }}</router-link>
      </div>
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid" type="submit">
      {{ $t('login') }}
    </v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>
<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }

  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
