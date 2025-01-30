<template>
    <div class="container my-5">
        <div class="card shadow-lg p-4" v-if="product">
            <h2 class ="text-center"> {{product.name}} </h2>
            <div class="row align-items-start my-4">
                <div class="col-md-6">
                     <div class = "sku-price d-flex align-items-center mb-3">
                        <div class="sku me-3 text-secondary fw-bold"> SKU: {{product.productSku}}  </div>
                        <div class ="price text-secondary fw-bold"> ${{product.price}} </div>
                    </div>
                </div>
                <div class="col-md-6 text-center">
                    <img src ="../img/product_350x250.jpg" class="img-fluid rounded shadow-lg" alt="Product Image">
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
    
    methods: {
        addToCart(product){
            cartService.addProductToCart(product)
                .then (response => {
                    if (response.status === 201 ) {
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
