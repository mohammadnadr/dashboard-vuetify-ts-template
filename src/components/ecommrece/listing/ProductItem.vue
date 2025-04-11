<script setup lang="ts">
import { ref } from 'vue';

// icons
import { ShoppingCartOutlined, HeartOutlined, HeartFilled,PlusOutlined } from '@ant-design/icons-vue';
import { useEcomStore } from '@/stores/eCommerce.ts';
import type { Products } from '@/types/ecommerce';
const store = useEcomStore();

const props = defineProps({
  id:[String,Number],
  name: String,
  image: String,
  desc: String,
  rating: Number,
  salePrice: Number,
  offerPrice: Number,
  goto: Number || String || Object || Array
});
const emit = defineEmits(['handlecart', 'handlewishlist']);
const successsnackbar = ref(false);
const isInWishlist = ref(false);
const successsnackbar2 = ref(false);
const rate = ref(props.rating);

function toggleWishlist() {
  isInWishlist.value = !isInWishlist.value;
  emit('handlewishlist', isInWishlist.value);
  successsnackbar2.value = true;
}
</script>

<template>
  <v-card variant="outlined" class="rounded white bg-surface overflow-hidden">
    <router-link class="image-container" :to="`/ecommerce/product/detail/${goto}`">
      <img alt="product" :src="image" class="w-100 image" />
    </router-link>
    <v-btn icon color="secondary" variant="text" class="wishlist-icon" rounded @click="toggleWishlist">
      <HeartFilled v-if="isInWishlist" class="text-error" />
      <HeartOutlined v-else class="text-lightText" />
    </v-btn>
    <v-divider></v-divider>
    <v-card-item class="pb-2 px-4 pt-3">
      <v-card-title class="text-h5">{{ name }}</v-card-title>
      <p class="text-lightText mb-3 text-h6 descriptionH">{{ desc }}</p>
    </v-card-item>

    <v-card-text>
      <div class="d-flex align-end ga-2 justify-space-between flex-wrap">
        <div>
          <div class="d-flex align-center">
            <h4 class="text-h5 mb-0">${{ salePrice }}</h4>
            <p class="text-decoration-line-through text-lightText text-h6 mb-0 ms-2">${{ offerPrice }}</p>
          </div>
          <div class="text-medium-emphasis align-center d-flex ga-2">
            <v-rating color="inputBorder" active-color="warning" half-increments size="small" v-model="rate"
                      density="compact"></v-rating>
            <small>({{ rating }}+)</small>
          </div>
        </div>
        <v-btn icon rounded color="primary" variant="flat" size="small"
               @click="$emit('handlecart', (successsnackbar = true))"
        >
          <ShoppingCartOutlined v-if="!store.cart.some(p => p.id === id)" :style="{ fontSize: '18px' }" />
          <PlusOutlined v-else :style="{ fontSize: '18px' }" />
        </v-btn>
      </div>
    </v-card-text>
    <v-snackbar
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-white"
      v-model="successsnackbar"
    >
      <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
      Add To cart success
    </v-snackbar>
    <v-snackbar
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
      v-model="successsnackbar2"
    >
      <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
      {{ isInWishlist ? 'Added to favourites' : 'Removed from favourites' }}
    </v-snackbar>
  </v-card>
</template>
<style >
.descriptionH {
  height: 40px;
  overflow: hidden;
}

.wishlist-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
.image-container {
  position: relative;
  display: inline-block;
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5)); /* سایه به اطراف تصویر */

}



</style>
