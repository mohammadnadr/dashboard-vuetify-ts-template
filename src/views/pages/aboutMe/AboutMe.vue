<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref, shallowRef } from 'vue';
import Banner from '@/components/profile/Banner.vue';

const page = ref({ title: 'About me' });
const breadcrumbs = shallowRef([
  {
    title: 'About me',
    disabled: true,
    href: ''
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col>
      <Banner />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
