import { defineStore } from 'pinia';
// project imports
// import axios from '@/utils/axios';
import axios from 'axios';
// types
import type { ProductStateProps, Products } from '@/types/ecommerce';
import { filter, sum } from 'lodash';
import product1 from '@/assets/images/e-commerce/prod-1.png';

export const useEcomStore = defineStore({
  id: 'eCommerce',
  state: (): ProductStateProps => ({
    products: [{
      id: 1,
      image: product1,
      name: 'Keith Cunningham ',
      description: 'Zohbi tespus jic fob midze umew zawi toconkuh vuci wagojse bibwefel piko tu. Wefmeh pu zinnoir do bok debnomgit vijofecu tudnu to hunku ko za id ko sukodu.',
      rating: 2.1,
      discount: 25,
      salePrice: 350,
      offerPrice: 275,
      gender: 'male',
      categories: ['fashion', 'books'],
      colors: ['error', 'warning', 'primary', 'secondary'],
      popularity: 20,
      date: 1404.1201,
      created: new Date(),
      isStock: true,
      qty: 1
    },],
    cart: [],
    gender: '',
    category: [],
    price: '',
    subTotal: 0,
    discount: 5,
    total: 0,
    addresses: []
  }),
  getters: {},
  actions: {
    // Fetch Customers from action
    async fetchProducts() {
      try {
        const data = await axios.get('/api/products/list');
        // todo temporary comment
        // this.products = data.data;
        console.log(data);
      } catch (error) {
        alert(error);
      }
    },
    // Fetch Customers from addresses
    async fetchAddress() {
      try {
        const data = await axios.get('/api/address/list');
        this.addresses = data.data;
      } catch (error) {
        alert(error);
      }
    },
    //select gender
    SelectGender(items: object | [] | string) {
      this.gender = items;
    },
    //select category
    SelectCategory(items: object | [] | string) {
      this.category = items;
    },
    //AddToCart
    AddToCart(item: Products[]) {
      const product = item;
      this.cart = [...this.cart, product];
    },
    //qty
    incrementQty(item: Products, cart: Products[]): void {
      const productId: number = item.id;
      const updateCart: Products[] = cart.map((product: Products) => {
        if (product.id === productId) {
          const updatedQty = (product.qty || 0) + 1; // Ensure qty is defined and increment it
          return {
            ...product,
            qty: updatedQty
          };
        }
        return product;
      });

      // Update cart
      this.cart = updateCart;

      // Recalculate subtotal, discount, and total
      this.subTotal = sum(
        this.cart.map((product: Products) => {
          const price = product.salePrice ?? 0; // Default to 0 if salePrice is undefined
          return price * (product.qty || 0);
        })
      );

      // Check if subTotal is defined before calculating discount and total
      if (typeof this.subTotal === 'number') {
        // Recalculate discount
        this.discount = Math.round(this.subTotal * (5 / 100));

        // Recalculate total
        this.total = this.subTotal - this.discount;
      } else {
        // Handle case where subTotal is not defined
        this.discount = 0;
        this.total = 0;
      }
    },
    //qty
    decrementQty(item: number | string | undefined) {
      if (typeof item !== 'number' && typeof item !== 'string') return;

      const productId = item;
      const updateCart = this.cart.map((product: Products) => {
        if (product.id === productId) {
          const newQty = typeof product.qty === 'number' && product.qty - 1 >= 0 ? product.qty - 1 : 0; // Ensure qty doesn't go below 0
          return {
            ...product,
            qty: newQty
          };
        }
        return product;
      });

      this.cart = updateCart;

      // Calculate subtotal only if product.qty and product.salePrice are defined
      this.subTotal =
        sum(
          this.cart.map((product: Products) => {
            if (typeof product.qty === 'number' && typeof product.salePrice === 'number') {
              return product.salePrice * product.qty;
            } else {
              return 0;
            }
          })
        ) ?? 0; // Use optional chaining and nullish coalescing to handle possible undefined

      this.discount = typeof this.subTotal === 'number' ? Math.round(this.subTotal * (5 / 100)) : 0;
      this.total = typeof this.subTotal === 'number' && typeof this.discount === 'number' ? this.subTotal - this.discount : 0;
    },
    // delete Cart
    deleteCart(itemId: number) {
      const updateCart = filter(this.cart, (p: Products) => p.id !== itemId);
      this.cart = updateCart;
    },
    //subtotal
    getsubTotal() {
      this.subTotal = sum(
        this.cart.map((product: Products) => {
          if (typeof product.salePrice === 'number' && typeof product.qty === 'number') {
            return product.salePrice * product.qty;
          } else {
            return 0;
          }
        })
      );
    },
    //total
    getTotal() {
      if (typeof this.subTotal === 'number' && typeof this.discount === 'number') {
        this.total = this.subTotal - this.discount;
      } else {
        // Handle case where either this.subTotal or this.discount is undefined
        this.total = 0;
      }
    },
    //discount
    getDiscount() {
      if (typeof this.subTotal === 'number') {
        this.discount = Math.round(this.subTotal * (5 / 100));
      } else {
        // Handle case where this.subTotal is undefined
        this.discount = 0;
      }
    }
  }
});
