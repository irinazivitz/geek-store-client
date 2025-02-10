<template>
  <div>
   <shopping-cart v-bind:cart="{ items: cartItems, subtotal, tax, total }" @cart-updated="refreshCart"/>
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
          });
      },
      refreshCart() {
        this.getCart();
      }
      
    },
}

</script>


