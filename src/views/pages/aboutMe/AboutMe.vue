<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref, shallowRef } from 'vue';
const page = ref({ title: 'About me' });
const breadcrumbs = shallowRef([
  {
    title: 'About me',
    disabled: true,
    href:''
  },
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col>
      <v-card>

      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
