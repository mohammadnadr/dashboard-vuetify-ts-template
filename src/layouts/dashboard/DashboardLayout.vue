<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { RouterView } from 'vue-router';
import { useTheme } from 'vuetify';
import LoaderWrapper from './LoaderWrapper.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import HorizontalHeader from './horizontal-header/HorizontalHeader.vue';
import HorizontalSidebar from './horizontal-sidebar/HorizontalSidebar.vue';
import Customizer from './customizer/CustomizerPanel.vue';
import { useCustomizerStore } from '@/stores/customizer.ts';
import { DirAttrSet, HexToRgb } from '@/utils/utils';

const customizer = useCustomizerStore();
const theme = useTheme();

// Set the initial direction attribute when the component is mounted
if (customizer.locale && customizer.locale === 'en') DirAttrSet('ltr');
else DirAttrSet('rtl');
if (!localStorage.getItem('locale')) customizer.SET_LOCALE('fa');

// Set actTheme
customizer.SET_THEME(localStorage.getItem('actTheme'))

// Watch for changes in the isRtl property and update the direction attribute accordingly
watch(
  () => customizer.isRtl,
  () => {
    if (customizer.locale && customizer.locale === 'en') DirAttrSet('ltr');
    else DirAttrSet('rtl');
  }
);

// Define the computed property to calculate the dynamic style object
const dynamicStyle = computed(() => ({
  '--v-theme-primary': HexToRgb(theme.current.value.colors.primary),
  '--v-theme-darkprimary': HexToRgb(theme.current.value.colors.darkprimary),
  '--v-theme-lightprimary': HexToRgb(theme.current.value.colors.lightprimary)
}));

// Method to conditionally apply the preset class
const getStyleObject = () => {
  // Define your condition here, for example:
  const condition = true; // Replace this with your actual condition

  return condition ? dynamicStyle.value : {};
};
</script>

<template>
  <v-locale-provider :rtl="customizer.isRtl">
    <v-app

      :style="getStyleObject()"
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.inputBg ? 'inputWithbg' : ''
      ]"
    >
      <Customizer />
      <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
      <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" />
      <HorizontalHeader v-if="customizer.setHorizontalLayout" />
      <HorizontalSidebar v-if="customizer.setHorizontalLayout" />

      <v-main class="page-wrapper bg-grey-lighten-3">
        <v-container fluid >
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <!-- Loader start -->
            <LoaderWrapper />
            <!-- Loader end -->
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
