<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
// icons
import {
  MenuFoldOutlined,
  WindowsOutlined,
  TranslationOutlined,
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons-vue';
import { BrightnessDownIcon, MoonStarsIcon } from 'vue-tabler-icons';

// dropdown imports
import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import MegaMenuDD from './MegaMenuDD.vue';
import Searchbar from './SearchBarPanel.vue';
import MessageDD from './MessageDD.vue';
import FullScreen from './FullScreen.vue';

const customizer = useCustomizerStore();
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});

function darkToggle() {
  if (customizer.actTheme === 'dark') customizer.actTheme = 'light';
  else customizer.actTheme = 'dark';
  customizer.SET_THEME(customizer.actTheme);
}

</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="60">
    <v-btn
      class="hidden-md-and-down text-secondary me-3"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>

    <!-- search mobile -->
    <v-menu :close-on-content-click="false" class="hidden-lg-and-up" offset="10, 0">
      <template v-slot:activator="{ props }">
        <v-btn
          class="hidden-lg-and-up text-secondary ms-1"
          color="lightsecondary"
          icon
          rounded="sm"
          variant="flat"
          size="small"
          v-bind="props"
        >
          <SearchOutlined :style="{ fontSize: '17px' }" />
        </v-btn>
      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" width="320">
        <v-text-field persistent-placeholder placeholder="Search here.." color="primary" variant="solo" hide-details>
          <template v-slot:prepend-inner>
            <SearchOutlined :style="{ fontSize: '17px' }" />
          </template>
        </v-text-field>
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="d-none d-lg-block" width="250">
      <Searchbar />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Messages -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="10, 320">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="text-secondary hidden-sm-and-down d-lg-block d-none"
          color="darkText"
          rounded="sm"
          size="small"
          variant="text"
          v-bind="props"
        >
          <WindowsOutlined :style="{ fontSize: '16px' }" />
        </v-btn>
      </template>
      <v-sheet width="1024" height="325" rounded="md" class="d-lg-block d-none">
        <MegaMenuDD />
      </v-sheet>
    </v-menu>
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" location="bottom" offset="6, 80">
      <template v-slot:activator="{ props }">
        <v-btn icon class="ml-sm-2 ms-1" color="darkText" rounded="sm" size="small" v-bind="props">
          <TranslationOutlined :style="{ fontSize: '16px' }" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200">
        <LanguageDD />
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />

    <!-- ---------------------------------------------- -->
    <!-- Message -->
    <!-- ---------------------------------------------- -->
    <MessageDD />

    <!-- ---------------------------------------------- -->
    <!-- Fullscreen -->
    <!-- ---------------------------------------------- -->
    <FullScreen />

    <!-- ---------------------------------------------- -->
    <!-- Customizer -->
    <!-- ---------------todo : d-none working on it later------------------------------- -->
    <v-btn
      disabled
      class="customizer-btn ml-sm-2 ms-1 d-none"
      icon
      color="darkText"
      rounded="sm"
      size="small"
      variant="text"
      @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
    >
      <SettingOutlined class="icon" :style="{ fontSize: '16px' }" />
    </v-btn>

    <v-btn @click="darkToggle()" icon>
      <Transition name="slide-right">
        <BrightnessDownIcon class="position-absolute" v-if="customizer.actTheme === 'dark'"/>
<!--        <v-icon  :icon="BrightnessDownIcon" class=" position-absolute"></v-icon>-->
        <MoonStarsIcon v-else  class="position-absolute"></MoonStarsIcon>
      </Transition>
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="me-sm-2 me-0 py-2">
              <img src="@/assets/images/users/avatar-1.png" alt="Julia" />
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">Mohammad Nadr</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
<style>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
