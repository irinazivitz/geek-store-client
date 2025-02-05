<template>
  <loading-spinner v-if="isLoading"/>
  <div v-else class="view-container">
    <div id="view-content">
      <div class="error" v-show="error">
        <p>Sorry! Something unexpected happened. {{error}} Please try again later.</p>
      </div>
      <product-details v-show="!error" v-bind:product="productData" />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import productService from "../services/ProductService";
import ProductDetails from '../components/ProductDetails.vue';

export default {
  components: { LoadingSpinner, ProductDetails },
  data() {
    return {
      error: null,
      isLoading: true,
      productId: this.$route.params.productId,
      productData: {}
    }
  },

created() {
 console.log("🚀 ProductDetail.vue is mounted!");
 
    this.isLoading = true;
    const productId = this.$route.params.productId;
   
    
    
    productService.getProductById(productId)
      .then(response => {
        this.productData = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = `Could not get book for id ${this.productId}`;
        console.log(this.error, error.response);
      });
  }
}
</script>