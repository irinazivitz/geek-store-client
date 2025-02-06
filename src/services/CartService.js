import axios from 'axios';

export default {
    getCart(){
        // return axios.get(`/cart`);
        console.log("🛒 Fetching cart items...");
        return axios.get(`/cart`)
            .then(response => {
                console.log("✅ Cart API Response:", response.data);  // ✅ Debug API response
                return response.data;
            })
            .catch(error => {
                console.error("🚨 Error fetching cart items:", error.response ? error.response.data : error);
                return [];
            });
    },

    addProductToCart(product){
        let productObject= 
            {
                "productId": product.productId,
                "quantity": 1,
            } 
            console.log("🛒 Sending to cart API:", productObject);
            
            return axios.post(`/cart/items`, productObject)
            .then(response => {
                console.log("✅ Cart API Response:", response);
                return response; 
            })
            .catch(error => {
                console.error("🚨 Error from API:", error.response ? error.response.data : error);
                throw error;  
            });
    },

    deleteItem(id){
        return axios.delete(`/cart/items/${id}`);
    },

    clearCart(){
        return axios.delete(`/cart/`);
    }
    

}