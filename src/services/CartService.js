import axios from 'axios';

export default {
    getCart(){
        return axios.get(`/cart`);
    },

    addProductToCart(product){
        let productObject= 
            {
                "product_id": product.id,
                "quantity": 1,
            }      
        return axios.post(`/cart/items`, productObject)
    },

    deleteItem(id){
        return axios.delete(`/cart/items/${id}`);
    },

    clearCart(){
        return axios.delete(`/cart/`);
    }
    

}