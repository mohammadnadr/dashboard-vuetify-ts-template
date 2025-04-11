<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'description' });
const breadcrumbs = shallowRef([
  {
    title: 'description',
    disabled: true,
    href:''
  },
]);

// فرض می‌کنیم این متن بزرگ را از جایی دریافت می‌کنیم
const fullText = ref("<h1>Technologies and Libraries</h1>  \n\n<h2>1. Vue.js</h2>  \n<p><strong>Version:</strong> 3.5.12</p>  \n<p>The Progressive\nJavaScript Framework\nAn approachable, performant and versatile framework for building web user interfaces.</p>  \n\n<h2>2. Vuetify</h2>  \n<p><strong>Version:</strong> 3.7.4</p>  \n<p>A UI library for Vue.js that facilitates designing based on Material Design.</p>  \n\n<h2>3. TypeScript</h2>  \n<p><strong>Version:</strong> 5.6.3</p>  \n<p>Enhances safe coding and testing, making use of static typing.</p>  \n\n<h2>4. Vite</h2>  \n<p><strong>Version:</strong> 5.4.11</p>  \n<p>A modern tool for building and developing web projects that optimizes load and rebuild speed.</p>  \n\n<h2>5. Pinia</h2>  \n<p><strong>Version:</strong> 2.2.6</p>  \n<p>A library for state management in Vue 3 applications.</p>  \n\n<h2>6. Vue Router</h2>  \n<p><strong>Version:</strong> 4.4.5</p>  \n<p>Used for managing routes and navigation in Vue applications.</p>  \n\n<h2>7. Axios</h2>  \n<p><strong>Version:</strong> 1.7.9</p>  \n<p>A library for making HTTP requests.</p>  \n\n<h2>8. Vee-Validate</h2>  \n<p><strong>Version:</strong> 4.14.7</p>  \n<p>Used for managing form validation in Vue.</p>  \n\n<h2>9. vue-i18n</h2>  \n<p><strong>Version:</strong> 10.0.4</p>  \n<p>Supports multilingual capabilities and localization in the application.</p>  \n\n<h2>10. Sass</h2>  \n<p>Used for CSS preprocessing, enabling writing cleaner and more organized code.</p>  \n\n<h2>11. ESLint and Prettier</h2>  \n<p>Linting and formatting tools for improving code quality.</p>  \n\n<h2>Images and Icons</h2>  \n<ul>  \n  <li><strong>Ant Design Vue:</strong> A library of UI components based on Ant Design for Vue.</li>  \n  <li><strong>mdi/js</strong> and <strong>mdi/font:</strong> Material Design icons.</li>  \n  <li><strong>Vue Tabler Icons:</strong> A collection of icons for Vue.</li>  \n</ul>  \n\n<h2>Scripts</h2>  \n<p>In the <code>scripts</code> of this project, several scripts are available for development, building, and code validation, which include:</p>  \n<ul>  \n  <li><code>dev</code>: For starting the development server with Vite</li>  \n  <li><code>build</code>: For building the application</li>  \n  <li><code>lint</code>: For checking and fixing code with ESLint</li>  \n</ul>  "); // متن واقعی شما
const limit = 1200; // تعداد کاراکترهایی که در هر بار نمایش داده می‌شود
const visibleText = ref(''); // متنی که باید نمایش داده شود
const start = ref(0); // نقطه شروع
const loading = ref(false); // وضعیت بارگزاری
const hasMore = ref(true); // آیا هنوز متن بیشتری وجود دارد؟

// تابع بارگذاری بیشتر متن
const loadMore = async () => {
  if (loading.value) return; // اگر در حال بارگذاری است، تابع را متوقف کن
  loading.value = true; // تغییر وضعیت به در حال بارگذاری

  // شبیه‌سازی بارگذاری (می‌توانید API واقعی خود را اینجا فراخوانی کنید)
  await new Promise((resolve) => setTimeout(resolve, 1000)); // ۱ ثانیه تأخیر برای بارگذاری

  // محاسبه طول متن قابل نمایش
  const nextSegment = fullText.value.slice(start.value, start.value + limit);
  visibleText.value += nextSegment; // اضافه کردن بخش جدید به متن موجود
  start.value += nextSegment.length; // به‌روزرسانی نقطه شروع

  // بررسی اینکه آیا متن بیشتری وجود دارد یا خیر
  if (start.value >= fullText.value.length) {
    hasMore.value = false; // اگر متن کامل بارگذاری شده باشد
  }

  loading.value = false; // تغییر وضعیت به بارگزاری تمام شده
};

// بارگذاری اولیه
loadMore();
// اضافه کردن event listener برای اسکرول
const handleScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 10) { // 10px padding
    loadMore();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <BaseBreadcrumb :title="$t(page.title)" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <v-card :title="$t('project title')" >
        <v-card-text>
          <p dir="ltr" v-html="visibleText"></p>
        </v-card-text>
        <v-card-actions v-if="hasMore"  class="d-flex justify-center">
            <v-progress-circular   indeterminate></v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
