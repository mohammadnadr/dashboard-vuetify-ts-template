// ===============================|| Blank Layout ||=============================== //
<template>
  <v-locale-provider :rtl="customizer.isRtl">
    <v-app>
      <!-- Loader start -->
      <LoaderWrapper />
      <!-- Loader end -->
      <RouterView />
    </v-app>
  </v-locale-provider>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoaderWrapper from '../dashboard/LoaderWrapper.vue';
import { useCustomizerStore } from '@/stores/customizer.ts';

const customizer = useCustomizerStore();
</script>
