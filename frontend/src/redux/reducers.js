import { combineReducers } from 'redux';
import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART } from './actions';

const initialProducts = [
    { id: 1, name: 'Lounge Chair', price: 2000, category: 'Chairs', image: "https://rukminim2.flixcart.com/image/416/416/xif0q/living-room-chair/k/t/x/light-blue-velvet-accent-modern-study-chair-chair-craft-light-original-imah29qj7mtk5dpe.jpeg?q=70&crop=false" },
    { id: 2, name: 'Dining Chair', price: 1800, category: 'Chairs', image: "https://m.media-amazon.com/images/I/2170L0L599S.jpg" },
    { id: 3, name: 'Table1', price: 3000, category: 'Table', image: "https://m.media-amazon.com/images/I/317O8IJ5VGL._SY300_SX300_QL70_FMwebp_.jpg" },
    { id: 4, name: 'Table2', price: 3200, category: 'Table', image: "https://m.media-amazon.com/images/I/51OBU94CMKL.jpg" },
    { id: 5, name: 'Table3', price: 3100, category: 'Table', image: "https://m.media-amazon.com/images/I/41ghENUU25S._SY300_SX300_QL70_FMwebp_.jpg" },
    { id: 6, name: 'Dining Top', price: 900, category: 'Top', image: "https://m.media-amazon.com/images/I/41RMdqIAvzL._SX300_SY300_QL70_FMwebp_.jpg" },
];

const productsReducer = (state = initialProducts, action) => {
    return state;
};

const cartReducer = (state = JSON.parse(localStorage.getItem("cart")) || [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.product];
        case GET_CART:
            return action.cart;
        case REMOVE_FROM_CART:
            return action.updatedCart;
        default:
            return state;
    }
};

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
});
