<script setup lang="ts">
import ProductDetail from '@/components/ecommrece/detail/ProductDetail.vue';
import RelatedProducts from '../../../components/ecommrece/detail/RelatedProducts.vue';
import ProductTab from '../../../components/ecommrece/detail/ProductTab.vue';
</script>

<template>
  <v-card elevation="0" variant="outlined" class="bg-surface mt-2 mb-4">
    <v-card-text>
      <ProductDetail />
    </v-card-text>
  </v-card>
  <v-row>
    <v-col cols="12" md="8">
      <v-card elevation="0" variant="outlined" class="bg-surface">
        <v-card-text>
          <ProductTab />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <RelatedProducts />
    </v-col>
  </v-row>
</template>
