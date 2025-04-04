<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref, shallowRef } from 'vue';
import Banner from '@/components/profile/Banner.vue';
import {
  BrandLinkedinIcon,
  BrandGithubIcon,
  BrandStackoverflowIcon,
  BrandGitlabIcon,
  BrandDribbbleIcon,
  BrandWhatsappIcon,
  BrandGmailIcon
} from 'vue-tabler-icons';

const page = ref({ title: 'About me' });
const breadcrumbs = shallowRef([
  {
    title: 'About me',
    disabled: true,
    href: ''
  }
]);
const tab = ref('Profile');
const profiles = shallowRef([
  {
    title: 'Linkedin',
    icon: BrandLinkedinIcon,
    link: 'https://www.linkedin.com/in/mohammad-nadr/',
    color:"linkedin"
  },
  {
    title: 'Github',
    icon: BrandGithubIcon,
    link: 'https://github.com/mohammadnadr'
  },
  {
    title: 'Stackoverflow',
    icon: BrandStackoverflowIcon,
    link: 'https://stackoverflow.com/users/19033492/mohammad-nadr'
  },
  {
    title: 'Gitlab',
    icon: BrandGitlabIcon,
    link: ''
  },
  {
    title: 'Dribbble',
    icon: BrandDribbbleIcon,
    link: 'https://dribbble.com/amoonadr'
  },
  {
    title: 'Whatsapp',
    icon: BrandWhatsappIcon,
    link: 'https://wa.me/989371094039?text=سلام،%20من%20یک%20پیام%20از%20طریق%20لینک%20واتساپ%20ارسال%20کرده‌ام.  '
  },
  {
    title: 'Gmail',
    icon: BrandGmailIcon,
    link: 'amoo.nadr81@gmail.com'
  }

]);

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
        <v-tabs-window-item
          value="Profile"
        >
          <v-row>
            <v-col cols="12"
                   md="3"
                   v-for="item in profiles"
                   :key="item"
            >
              <v-card >
                <v-card-text class="text-center ">
                  <v-card-title>{{item.title}}</v-card-title>
                  <component :is="item.icon" size="48" />
                </v-card-text>
                <v-card-actions >
                  <v-btn variant="outlined" color="primary"
                         block
                         :href="item.link">{{$t('login')}}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-tabs-window-item>
        <v-tabs-window-item
          value="About me"
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
