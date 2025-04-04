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
const tab = ref('Profile');

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col>
      <Banner v-model="tab" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item v-for="i in 5"
                            :key="i"
        >
          <v-card flat>
            <v-card-text>
              {{ $t('about me description') }}
            </v-card-text>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
