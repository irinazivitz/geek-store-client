<template>
  <div class="container mt-4">
    <h4 v-if="!isLoggedIn" class="alert alert-info">
          Welcome! You may browse anonymously as much as you wish, but you must
          <router-link class="login-link" v-bind:to="{ name: 'login' }">
            login</router-link> to add items to your shopping cart.
    </h4>
    <div class="row  mt-4">
      <div class="col-md-8">
        <h1>Products</h1>
      
      </div>

      <div class="col-md-4 text-end">
        <input
          class="form-control"
          id="searchBar"
          type="text"
          placeholder="Search...                  🔍"
          v-model="searchTerm"
          @input="getProductByName" />
      </div>
    </div>
    
      <section id = "product-cards">
          <product-card v-bind:productList="productList"   />
      </section>

  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import productService from "../services/ProductService";
import ProductCard from "../components/ProductCard.vue";


export default {
  components: {
     ProductCard,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      searchTerm: "",
      productList: [],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    getProducts(){
       console.log("🟡 Calling productService.getProducts()...");
      productService.getProducts()
    .then(response => {
      console.log("✅ Raw API Response:", response);
      
      if (response && response.data) {
      this.productList = [...response.data]; 
      console.log("✅ Updated productList:", this.productList);
      }
      
      this.isLoading = false;
      });
    },

    getProductByName(){
      if(this.searchTerm === ''){
        this.getProducts();
        return;
      }
      productService.getProductByName(this.searchTerm)
      .then(response => {
      this.productList = response.data;
      this.isLoading = false;

      if (this.productList.length === 0){
        console.log("no products found for:", this.searchTerm);
      }
      })
      .catch (error => {
        console.error('error', error);
      });
    },
  },
  
  created() {
   this.getProducts();
       console.log("✅ productList received in ProductsView:", this.productList);

  }
}

</script>

<style scoped>

.alert{
  background-color: #e3d5ca;
  border: none;
}

.login-link {
  text-decoration: underline;  
  color: inherit; 
  font-weight: inherit;
  font-size: inherit; 
  cursor: pointer; 
}

.login-link:hover {
  text-decoration: none;
}
</style>