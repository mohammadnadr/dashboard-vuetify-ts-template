<script setup lang="ts">
type Breadcrumb = {
  title: string;
  disabled: boolean;
  href: string;
};

defineProps({
  title: String,
  breadcrumbs: Array as () => Breadcrumb[],
  icon: String
});
</script>

<template>
  <v-row class="page-breadcrumb mb-0 mt-n2">
    <v-col cols="12" md="12">
      <v-card elevation="0" variant="text">
        <v-row no-gutters class="align-center">
          <v-col sm="12">
            <v-breadcrumbs :items="breadcrumbs" class="text-h6 pa-1 font-weight-medium mb-0">
              <template v-slot:divider>
                <div class="d-flex align-center">/</div>
              </template>
              <template v-slot:prepend>
                <router-link to="/" class="text-lightText text-h6 text-decoration-none"> {{ $t("Home") }} </router-link>
                <div class="d-flex align-center px-2">/</div>
              </template>
              <template v-slot:title="{ item }">
                {{ $t(item.title) }}
              </template>
            </v-breadcrumbs>
            <h3 class="text-h3 mt-1 mb-0">{{ $t(title) }}</h3>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">

</style>
