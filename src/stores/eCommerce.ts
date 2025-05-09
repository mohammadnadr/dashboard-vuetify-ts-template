import { defineStore } from 'pinia';
// project imports
// import axios from '@/utils/axios';
import axios from 'axios';
// types
import type { ProductStateProps, Products } from '@/types/ecommerce';
import { filter, sum } from 'lodash';
import product1 from '@/assets/images/e-commerce/prod-1.png';
import product2 from '@/assets/images/e-commerce/prod-2.png';
import product3 from '@/assets/images/e-commerce/prod-3.png';

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
      salePrice: 275,
      offerPrice: 350,
      gender: 'male',
      categories: ['fashion', 'books'],
      colors: ['error', 'warning', 'primary', 'secondary'],
      popularity: 20,
      date: 1404.1201,
      created: new Date(),
      isStock: true,
      qty: 1
    },
      {
      id: 2,
      image: product2,
      name: 'Keith Cunningham2 ',
      description: 'Zohbi tesp dasdas usads gf dhf jic fob midze umew zawi toconkuh vuci wagojse bibwefel piko tu. Wefmeh pu zinnoir do bok debnomgit vijofecu tudnu to hunku ko za id ko sukodu.',
      rating: 2,
      discount: 0,
      salePrice: 145,
      offerPrice: 150,
      gender: 'female',
      categories: ['fashion', 'books'],
      colors: ['error', 'warning', 'secondary'],
      popularity: 20,
      date: 1404,
      created: new Date(),
      isStock: false,
      qty: 1
    },
      {
      id: 3,
      image: product3,
      name: 'Keith3 Cunningham2 ',
      description: ' loremZohbi tesp dasdas usads gf dhf jic fob midze umew zawi toconkuh vuci wagojse bibwefel piko tu. Wefmeh pu zinnoir do bok debnomgit vijofecu tudnu to hunku ko za id ko sukodu.',
      rating: 4,
      discount: 10,
      salePrice: 120,
      offerPrice: 190,
      gender: 'kids',
      categories: ['fashion', 'books'],
      colors: ['error', 'warning', 'secondary'],
      popularity: 20,
      date: 1404,
      created: new Date(),
      isStock: false,
      qty: 1
    }],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    gender: '',
    category: [],
    price: '',
    subTotal: 0,
    discount: 5,
    total: 0,
    addresses: [
      {
        id: 1,
        name: 'reza',
        destination: 'Home',
        building: 'building',
        street: 'street',
        city: 'Tehran',
        state: 'Tehran',
        country: 'Iran',
        post: 'POST',
        phone: '09371094039',
        isDefault: true
      },{
        id: 2,
        name: 'reza2',
        destination: 'Home2',
        building: 'building2',
        street: 'street2',
        city: 'Tehran2',
        state: 'Tehran2',
        country: 'Iran2',
        post: 'POST2',
        phone: '09371094040',
        isDefault: false
      },
    ]
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
        // todo temporary comment
        // this.addresses = data.data;
        console.log(data);
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
      const existingProduct = this.cart.find((p: Products) => p.id === product.id);

      if (existingProduct) {
        // اگر محصول وجود دارد، مقدار آن را افزایش بده
        this.incrementQty(existingProduct, this.cart);
      } else {
        // اگر محصول وجود ندارد، آن را به کارت اضافه کن
        // لازم است که qty را مقداردهی کنید
        this.cart = [...this.cart, { ...product, qty: 1 }];
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
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
      localStorage.setItem('cart', JSON.stringify(this.cart));
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
      localStorage.setItem('cart', JSON.stringify(this.cart));
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
