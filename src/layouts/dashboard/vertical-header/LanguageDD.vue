<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';

const customizer = useCustomizerStore();
const languageDD = shallowRef([
  { title: 'English', subtext: 'UK', value: 'en' },
  { title: 'Farsi', subtext: 'Persian', value: 'fa' },
  { title: 'Arabic', subtext: 'Arabic', value: 'ar' }
]);

function changeLocale(item) {
  customizer.SET_LOCALE(item.value);
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-list class="py-0" aria-label="language list" aria-busy="true">
    <v-list-item
      v-for="(item, index) in languageDD"
      :key="index"
      color="primary"
      :active="$i18n.locale == item.value"
      class="d-flex align-center"
      @click="
        () => {
          $i18n.locale = item.value;
          changeLocale(item);
        }
      "
    >
      <v-list-item-title class="text-subtitle-1 font-weight-regular">
        {{ item.title }}
        <span class="text-lightText text-caption pl-2">({{ item.subtext }})</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
