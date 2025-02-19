<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const valid = ref(false);
const logform = ref();
const email = ref('');
// Email validation rules
const emailRules = ref([
  (v: string) => !!v.trim() || t('emailRequired'),
  (v: string) => {
    const trimmedEmail = v.trim();
    return !/\s/.test(trimmedEmail) || t('emailNoSpaces');
  },
  (v: string) => /.+@.+\..+/.test(v.trim()) || t('emailValid')
]);


const router = useRouter();

function validate() {
  if (logform.value && logform.value.validate()) {
    router.push('/starter');
  }
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h5 text-center mb-0">
      {{ $t('forgotPassword') }}
    </h3>
    <router-link
      :to="{name:'Login'}"
      class="text-primary text-decoration-none"
    >
      {{ $t('backToLogin') }}
    </router-link>
  </div>

  <v-form
    ref="logform"
    v-model="valid"
    lazy-validation
    action="/starter"
    class="mt-7 loginForm"
    @submit.prevent="validate"
  >
    <v-label>{{ $t('emailAddress') }}</v-label>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      :placeholder="$t('emailAddress')"
      class="mt-2 mb-6"
      required
      hide-details="auto"
      variant="outlined"
      color="primary"
    />

    <h6 class="text-caption">
      {{ $t('checkSpam') }}
    </h6>
    <v-btn
      color="primary"
      block
      class="mt-2"
      variant="flat"
      size="large"
      :disabled="!valid"
      type="submit"
    >
      {{$t('sendPasswordResetEmail')}}
    </v-btn>
  </v-form>
</template>
