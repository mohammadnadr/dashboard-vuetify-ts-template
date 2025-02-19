<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // دسترسی به تابع t برای ترجمه
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';

const valid = ref(false);
const logform = ref();
const password = ref('');
const conpassword = ref('');
const show1 = ref(false);
const passwordRules = ref([
  (v: string) => !!v || t('passwordRequired'),
  (v: string) => (v && v.length <= 10) || t('passwordLength')
]);
const confirmpasswordRules = ref([
  (v: string) => !!v || t('passwordRequired'),
  (v: string) => (v && v.length <= 10) || t('passwordLength')
]);

const router = useRouter();

function validate() {
  if (logform.value && logform.value.validate()) {
    router.push('/starter');
  }
}
</script>

<template>
  <v-form ref="logform" lazy-validation v-model="valid" action="/starter" @submit.prevent="validate" class="mt-7 loginForm">
    <div class="mb-6">
      <v-label>{{ $t('password') }}</v-label>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        required
        :placeholder="$t('enterPassword')"
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="mt-2 mb-4"
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>
    <div class="mb-6">
      <v-label>{{ $t('confirmPassword') }}</v-label>
      <v-text-field
        v-model="conpassword"
        :rules="confirmpasswordRules"
        :placeholder="$t('enterConfirmPassword')"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        class="mt-2"
      ></v-text-field>
    </div>
    <v-btn color="primary" block class="mt-5" variant="flat" size="large" :disabled="!valid" type="submit">{{ $t('resetPassword') }}</v-btn>
  </v-form>
</template>

<style lang="scss">
.loginForm {
  .v-field--appended {
    padding-inline-end: 0;
  }
}
</style>