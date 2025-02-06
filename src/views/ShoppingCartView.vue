<template>
  <div>
   <shopping-cart v-bind:cart="cartItems" @cart-updated="refreshCart"/>
  </div>
</template>


<script>
import cartService from "../services/CartService";
import ShoppingCart from "../components/ShoppingCart.vue";

export default {
    components: {
        ShoppingCart,
    },
    
    data() {
    return {
        cartItems: [],
        subtotal: 0,
        tax: 0,
        total: 0
        };
    },

    created (){
        this.getCart();
    },
    beforeRouteEnter(to, from, next) {
        next (vm => {
          vm.getCart();
        })
    },

    methods: {
      getCart(){
        console.log("🛒 Fetching cart in ShoppingCartView.vue...");
        cartService.getCart()
          .then(response => {
            console.log("✅ ShoppingCartView.vue - Cart API Response:", response);
            this.cartItems = response.items || [];
               this.subtotal = response.itemSubtotal || 0;
                    this.tax = response.tax || 0;
                    this.total = response.total || 0;

          })
          .catch(error => {
            console.error('error', error);
            this.cartItems = []; // ✅ Prevents undefined issues
          });
      },
      refreshCart() {
        this.getCart();
      }
      
    },
}

</script>


