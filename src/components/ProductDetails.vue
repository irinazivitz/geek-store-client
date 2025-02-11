<template>
    <div class="container my-5">
        <div class="card shadow-lg p-4 product-card" v-if="product">
            <h2 class ="text-center"> {{product.name}} </h2>
            <div class="row align-items-start my-4">
                <div class="col-md-6">
                     <div class = "sku-price d-flex align-items-center mb-3">
                        <div class="sku me-3 text-secondary fw-bold"> SKU: {{product.productSku}}  </div>
                        <div class ="price text-secondary fw-bold"> ${{product.price}} </div>
                    </div>
                </div>
                <div class="col-md-6 text-center">
                    <img src ="../img/product_350x250.jpg" class="img-fluid rounded shadow-lg product-image" alt="Product Image">
                    <button class="btn custom-btn  btn-lg mt-3" v-on:click="addToCart(product)"> 
                        <font-awesome-icon icon="fa-solid fa-cart-plus" title="Add item to cart"/>   Add to cart 
                    </button>
                </div>
            </div>  
        </div>
        <div v-else class="text-center mt-5"> 
            <p>No product available</p> 
        </div>
    </div>
</template>


<script>
import cartService from "../services/CartService";

export default {
    props: ['product'],
    computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },
    
    methods: {
        addToCart(product){
            if (!this.isLoggedIn){
                this.$router.push ({ name: 'login'});
            }
            cartService.addProductToCart(product)
                .then (response => {
                    if (response.status === 200 ) {
                        this.$router.push({name: 'cart'});
                    }
                })
                .catch(error => {
                    console.error('error', error);
                })

        }
    }
}

</script>

<style scoped>
.card {
  border-radius: 15px;
  background-color: #f5ebe0;
}

.product-card {
  max-width: 900px;
  width: 100%;
  background-color: #f5ebe0;
  border-radius: 15px;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.sku {
  font-size: 1.2rem;
}
.price {
  font-size: 1.2rem;
}

.custom-btn {
  background-color: #d5bdaf;
  border: none;
  transition: all 0.3s ease-in-out;
}

.custom-btn:hover {
  background-color:#ba937c;
}

</style>
