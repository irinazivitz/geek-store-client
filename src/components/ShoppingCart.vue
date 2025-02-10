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
                        <tr v-for="(cartItem,index) in cart.items" :key="index">
                            <td> {{cartItem.quantity}} </td>
                            <td> {{cartItem.product.name}} </td>
                            <td> ${{cartItem.product.price}} </td>
                            <td> ${{calculateAmount(cartItem.quantity, cartItem.product.price)}}  </td>
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
                <div class="fs-5" > Sales Tax: ${{cart.tax}} </div>
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
            
            if (!this.cart) {
                console.warn("⚠️ cart is undefined!");
                return;
            }
                console.log("📦 ShoppingCart.vue - Checking cart structure:", {
                    items: this.cart.items,
                    subtotal: this.cart.subtotal,
                    tax: this.cart.tax,
                    total: this.cart.total
            });
            if (this.cart && this.cart.items) { 
                    this.cartItems = this.cart.items;  
                    this.subtotal = this.cart.subtotal;
                    this.tax = this.cart.tax;
                    this.total = this.cart.total;

                console.log("✅ Assigned cartItems:", this.cartItems);
            }
            else {
                console.warn("⚠️ cart.items is missing or empty");
            }
           
    },
    watch: {
    cart: {
        handler(newCart) {
            console.log("🔄 Cart updated in ShoppingCart.vue:", newCart);
            if (newCart && newCart.items) {  
                this.updateCart(newCart);
            }
            else {
                console.warn("⚠️ Cart is empty or missing items:", newCart);
            }
        },
        deep: true, 
        immediate: true 
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

        updateCart(newCart) {
            console.log("🔄 Cart updated in ShoppingCart.vue:", newCart);

            if (!newCart || typeof newCart !== "object") {
            console.warn("⚠️ updateCart() received invalid cart data:", newCart);
            return;
            }

            this.cartItems = newCart.items || [];
            this.subtotal = newCart.subtotal ?? newCart.itemSubtotal ?? 0; 
            this.tax = newCart.tax ?? 0;
            this.total = newCart.total ?? 0;
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
