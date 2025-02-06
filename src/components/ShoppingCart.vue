<template>
    <div class ="container my-5">
            <div  v-if="cartItems && cartItems.length > 0">
                <h1 class="mb-4 fw-bold">Shopping Cart</h1> 
                <button class="btn custom-btn mb-3 justify-content-end" v-on:click="clearCart"> 
                    Clear cart
                    <font-awesome-icon :icon="faTrash" />  
                </button>
            <div class="table-responsive">
                <table class="table table-bordered table-hover shadow-sm">
                    <thead class="custom-table-header">
                        <tr>
                            <th>Quantity </th> 
                            <th>Product</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cartItem,index) in cartItems" :key="index">
                            <td> {{cartItem.quantity}} </td>
                            <td> {{cartItem.product_name}} </td>
                            <td> ${{cartItem.product_price}} </td>
                            <td> ${{calculateAmount(cartItem.quantity, cartItem.product_price)}}  </td>
                            <td>
                                <button class="btn btn-sm btn-outline-danger" @click="deleteItem(cartItem.cartItemId)">
                                   Delete <font-awesome-icon :icon="faTrash" /> 
                                </button> 
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
            <div class="mt-4 p-3 bg-light rounded shadow-sm text-end">
                <div class="fs-5" > Subtotal: ${{cart.subtotal}} </div>
                <div class="fs-5" > Sales Tax: ${{cart.salesTax}} </div>
                <div class= "fs-4 fw-bold text-primary"> Total: ${{cart.total}} </div>
            </div>    
        </div>

        <div v-else> 
            <h1>Your cart is empty.</h1> 
        </div>
    </div> 
</template>


<script>
import cartService from "../services/CartService";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default {
    props: ['cart'],
    components: { FontAwesomeIcon },
    data() {
        return {
            faTrash,
            cartItems: Array,
            subtotal: 0,
            tax: 0,
            total: 0
        };
    },
    created (){
            
            console.log("🛒 ShoppingCart.vue - Received cartItems:", this.cart);
            if (this.cart && this.cart.items) {  // ✅ Check if `cart.items` exists
        this.cartItems = this.cart.items;  // ✅ Copy from props
    this.subtotal = this.cart.itemSubtotal;
    this.tax = this.cart.tax;
    this.total = this.cart.total;
            }
           
    },
    watch: {
    cart: {
        handler(newCart) {
            console.log("🔄 Cart updated in ShoppingCart.vue:", newCart);
            if (newCart && newCart.items) {  // ✅ Only update when cart has items
                this.updateCart();
            }
        },
        deep: true, // ✅ Watch for nested changes
        immediate: true // ✅ Run when component is first created
    }
},

    methods: {
        calculateAmount(quantity,price){
            return quantity*price;
        },
    

        deleteItem(id){
            cartService.deleteItem(id)
                .then (response => {
                    if (response.status === 200 ) {
                        this.$emit("cart-updated");
                    }
                })
                .catch(error => {
                    console.error('error', error);
                })
        },

        clearCart(){
            cartService.clearCart()
                .then (response => {
                    if (response.status === 200 ) {
                        this.$emit("cart-updated");
                        
                    }
                })
                .catch(error => {
                    console.error('error', error);
                })
        },
        
    },
    
}
</script>

<style scoped>
.table th, .table td {
  text-align: right;
  vertical-align: middle;
}
.table th {
  text-align: center;
  vertical-align: middle;
}

::v-deep(.table)  {
    background-color: transparent; 
    border: 2px solid #d5bdaf;
    border-radius: 10px;
    overflow: hidden;
}

::v-deep(.table thead th) {
    background-color: #d6ccc2 !important;
    color: #3d3d3d !important;
    font-weight: bold;
    border-bottom: 2px solid #d5bdaf !important;
}
.bg-light {
    background-color: #f5ebe0 !important; 
    border: 1px solid #d5bdaf;
    border-radius: 10px;
    padding: 15px;
}
.text-primary {
    color: #4a5759 !important;
    font-weight: bold;
}
h1 {
     color: #4a5759;
}
.btn-outline-danger {
    color: #b08968;
    border-color: #b08968;
}

.btn-outline-danger:hover {
    background-color: #b08968;
    color: white;
}
.custom-btn {
  border-color: #d5bdaf;
  border-width: 2px;
  transition: all 0.3s ease-in-out;
}
.custom-btn:hover {
  background-color:#ba937c;
}
</style>
