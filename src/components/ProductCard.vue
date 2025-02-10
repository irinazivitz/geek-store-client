<template>
    <div class="container" >
        <div class="row row-cols-1 row-cols-md-3 g-4">

            <div class="col"
                v-for="product in productList"
                v-bind:key="product.id">
                <div class="card h-100 shadow-sm border-dark">
                    <img src="../img/product_350x250.jpg" class="card-img-top img-fluid rounded" 
                        alt="Product Image" v-on:click="goToProductDetail(product)" />
                    <div class="card-body text-center" v-on:click="goToProductDetail(product)">
                        <h5 class="card-title text-dark">{{ product.name }}</h5>
                        <p class="card-text">${{ product.price }}</p>
                    </div>
                    <div class="card-footer  d-flex justify-content-center" v-if="isLoggedIn">
                        <button class="btn btn-outline-dark" @click.stop="addToCart(product)">
                            <font-awesome-icon icon="fa-solid fa-cart-plus" title="Add item to cart" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="alertMessage" class=" alert alert-success text-center mt-3" role="alert">
            {{ alertMessage}}
        </div>
    </div>
</template>

<script>
import cartService from "../services/CartService";

export default {
    props: {
        productList:{
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            alertMessage: null,
        };
    },
     mounted() {
    console.log("✅ Received productList in ProductCard.vue:", this.productList);
  },
    computed: {
        isLoggedIn() {
            return this.$store.state.token.length > 0;
        },
    },
    methods: {


        goToProductDetail(product) {
            this.$router.push(`/products/${product.productId}`);
        },

        addToCart(product) {
            console.log("🛒 Adding product to cart:", product);
            cartService.addProductToCart(product)
                .then (response => {
                    if (response.status === 200) {
                        console.log(`✅ ${product.name} added to cart!`);
                        this.alertMessage = `${product.name} added to cart!`;
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.alertMessage = null;
                            }, 3000);
                        });
                        
                    }
                })
                .catch (error => {
                    console.error('error', error);
                });
        }

    }

}
</script>


<style scoped>
.card {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.03);
}

.card-img-top {
  max-height: 250px;
  object-fit: cover;
}

.card-footer button {
  font-size: 0.9rem;
}
.card-body {
    background-color: #f5ebe0;
}

.card-footer {
    background-color: #d6ccc2;
}
.alert {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    background-color: #f8f8f2;
    color: #6b5b4e;
    border: 1px solid #c4aead;
    font-weight: bold;
    border-radius: 8px;
    padding: 12px;
}
</style>
