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
        cartItems: []
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
        cartService.getCart()
          .then(response => {
            this.cartItems = response.data;
            this.isLoading = false;
          })
          .catch(error => {
            console.error('error', error);
          });
      },
      refreshCart() {
        this.getCart();
      }
      
    },
}

</script>


