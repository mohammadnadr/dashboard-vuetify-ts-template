<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import profileBg from '@/assets/images/profile/Banana.jpeg';
import UserImage from '@/assets/images/profile/avatar.jpeg';

// تعریف props
const props = defineProps({
  modelValue: {
    type: String,
    required:true
  }
});

// تعریف emits
const emit = defineEmits(['update:modelValue']);
const tab = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

// icons
import {
  PlusOutlined,
  ProfileOutlined,
  TeamOutlined,
  SolutionOutlined,
  FileImageOutlined,
  UserAddOutlined
} from '@ant-design/icons-vue';

const items = ref([
  { tab: 'Profile', icon: ProfileOutlined, href: '' },
  { tab: 'followers', icon: TeamOutlined, href: '' },
  { tab: 'friends', icon: SolutionOutlined, href: '' },
  { tab: 'gallery', icon: FileImageOutlined, href: '' },
  { tab: 'friend_request', icon: UserAddOutlined, href: '' },
]);
</script>

<template>
  <v-card elevation="0" variant="outlined" class="bg-surface overflow-hidden">
    <div class="pb-0">
      <img :src="profileBg" alt="profile" class="w-100" />
      <v-row class="mt-4">
        <v-col lg="3" md="3" cols="12" class="text-center text-md-end">
          <div class="userImage w-md-75"><img :src="UserImage" width="150" alt="profile" class="rounded-md" /></div
          >
        </v-col>
        <v-col lg="9" md="9" cols="12">
          <v-row class="me-0">
            <v-col md="5" cols="12" class="text-center text-md-start">
              <h4 class="text-h4">Mohammad Nadr</h4>
              <small class="opacity-50">Web Developer</small>
            </v-col>
            <v-col md="7" cols="12">
              <div class="text-center text-md-end">
                <v-btn color="secondary"
                       variant="outlined"
                       class="me-2"
                       :append-icon="PlusOutlined"
                       href="https://www.linkedin.com/in/mohammad-nadr"
                >
                  Message
                </v-btn>
              </div>
            </v-col>
            <v-col md="12">
              <v-tabs v-model="tab" color="primary" class="profiletab" scrollable>
                <v-tab v-for="item in items" :key="item.tab" :to="item.href">
                  <component :is="item.icon" class="me-2 text-subtitle-1"></component>
                  {{ $t(item.tab) }}
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<style lang="scss">
.userImage {
  margin: -70px 0px 0px auto;

  [dir='rtl'] & {
    margin: -70px auto 0px 0px;
  }
}

.profiletab .v-slide-group__content {
  justify-content: end;

}

@media (max-width: 600px) {
  .userImage img {
    width: 100px;
    height: 100px;
  }
}
</style>
