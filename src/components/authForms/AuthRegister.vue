<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';

const { t } = useI18n(); // دسترسی به تابع t برای ترجمه

const show = ref(false);
const password = ref('');
const email = ref('');
const Regform = ref();
const firstname = ref('');
const lastname = ref('');
// Password validation rules
const passwordRules = ref([
  (v: string) => !!v || t('passwordRequired'),
  (v: string) => v === v.trim() || t('passwordTrimSpaces'),
  (v: string) => v.length <= 10 || t('passwordLength')
]);
const firstRules = ref([(v: string) => !!v || t('firstNameRequired')]);
const lastRules = ref([(v: string) => !!v || t('lastNameRequired')]);

// Email validation rules
const emailRules = ref([
  (v: string) => !!v.trim() || t('emailRequired'),
  (v: string) => {
    const trimmedEmail = v.trim();
    return !/\s/.test(trimmedEmail) || t('emailNoSpaces');
  },
  (v: string) => /.+@.+\..+/.test(v.trim()) || t('emailValid')
]);

function validate() {
  Regform.value.validate();
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h3 text-center mb-0">
      {{ t('signUp') }}
    </h3>
    <router-link
      :to="{ name: 'Login' }"
      class="text-primary text-decoration-none"
    >
      {{ t('alreadyHaveAccount') }}
    </router-link>
  </div>
  <v-form
    ref="Regform"
    lazy-validation
    class="mt-7 loginForm"
  >
    <v-row class="my-0">
      <v-col
        cols="12"
        sm="6"
        class="py-0"
      >
        <div class="mb-6">
          <v-label>{{ t('firstName') }}</v-label>
          <v-text-field
            v-model="firstname"
            :rules="firstRules"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            :placeholder="t('firstName')"
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="py-0"
      >
        <div class="mb-6">
          <v-label>{{ t('lastName') }}</v-label>
          <v-text-field
            v-model="lastname"
            :rules="lastRules"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            :placeholder="t('lastName')"
          />
        </div>
      </v-col>
    </v-row>
    <div class="mb-6">
      <v-label>{{ t('company') }}</v-label>
      <v-text-field
        hide-details="auto"
        variant="outlined"
        class="mt-2"
        color="primary"
        :placeholder="t('company')"
      />
    </div>
    <div class="mb-6">
      <v-label>{{ t('emailAddress') }}</v-label>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        :placeholder="t('emailAddress')"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      />
    </div>
    <div class="mb-6">
      <v-label>{{ t('password') }}</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        placeholder="*****"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show ? 'text' : 'password'"
        class="mt-2"
      >
        <template #append-inner>
          <v-btn
            color="secondary"
            icon
            rounded
            variant="text"
            @click="show = !show"
          >
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show == false" @click="show = !show" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show == true" @click="show = !show" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <v-btn
      color="primary"
      block
      class="mt-4"
      variant="flat"
      size="large"
      @click="validate()"
    >
      {{ t('createAccount') }}
    </v-btn>
  </v-form>
</template>

<style lang="scss">
.loginForm {
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>
