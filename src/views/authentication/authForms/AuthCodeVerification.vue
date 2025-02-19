<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const valid = ref(false);
const logform = ref();
const otp = ref('');


function checkOTP() {
  router.push({name: 'Reset Password'})
}
</script>

<template>
  <p class="text-h6 my-6">
    {{ $t('otpSentMessage', {email: 'jone.****@company.com'}) }}
  </p>
  <v-form
    ref="logform"
    v-model="valid"
    lazy-validation
    class="mt-7 loginForm"
    @submit.prevent="checkOTP()"
  >
    <v-otp-input
      v-model="otp"
      type="number"
      length="6"
      class="mb-5"
      single-line
      height="35"
    />
    <v-btn
      color="primary"
      block
      class="mt-2"
      variant="flat"
      size="large"
      type="submit"
    >
      {{ $t('continue') }}
    </v-btn>
  </v-form>
  <div class="d-sm-flex align-start justify-space-between mt-6">
    <div class="text-subtitle-1 font-weight-regular">
      {{ $t('didNotReceiveEmail') }}
      <span class="font-weight-bold">{{ $t('checkSpamFilter') }}</span>
    </div>
    <v-btn
      variant="text"
      color="primary"
      to="/#"
      class="text-capitalize mr-n2 mt-2 mt-sm-0"
    >
      {{ $t('resendCode') }}
    </v-btn>
  </div>
</template>

<style lang="scss">
.loginForm {
  .v-otp-input {
    padding: 0;
    .v-otp-input__content {
      max-width: 100%;
      padding: 0;
    }
    .v-otp-input__field {
      font-size: 13px;
    }
  }
}
</style>
