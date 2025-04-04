<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'description' });
const breadcrumbs = shallowRef([
  {
    title: 'description',
    disabled: true,
    href:''
  },
]);
</script>

<template>
  <BaseBreadcrumb :title="$t(page.title)" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-card :title="$t('project title')" >
        <v-card-text>
          <p v-html="$t('Init Description')"></p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
