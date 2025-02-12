<template>
  <div>
    <loading-spinner :spin="isLoading" />
    <shopping-cart 
      v-if="!isLoading"
      v-bind:cart="{ items: cartItems, subtotal, tax, total }"
      @cart-updated="refreshCart"/>
  </div>
</template>


<script>
import cartService from "../services/CartService";
import ShoppingCart from "../components/ShoppingCart.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
    components: {
        ShoppingCart,
        LoadingSpinner
    },
    
    data() {
    return {
        cartItems: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        isLoading: true,
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
        this.isLoading = true;

        cartService.getCart()
          .then(response => {
            if (response) {
              this.cartItems = response.items || [];
               this.subtotal = response.itemSubtotal || 0;
                    this.tax = response.tax || 0;
                    this.total = response.total || 0;
            } else {
                console.warn("⚠️ No data found in response!");
            }
          })
          .catch(error => {
            console.error('error', error);
            this.cartItems = []; 
          })
          .finally(() => {
            this.isLoading = false; 
          });
      },
    

      refreshCart() {
        this.getCart();
      }
      
    },
}

</script>


