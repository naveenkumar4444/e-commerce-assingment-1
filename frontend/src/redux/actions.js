import axios from "axios"

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const GET_CART = 'GET_CART';

export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Product added to cart")

    return {
        type: ADD_TO_CART,
        product,
    };
};

export const removeFromCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(i => i.id != product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    alert("Product removed from cart")

    return {
        type: REMOVE_FROM_CART,
        updatedCart,
    };
};

export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return {
        type: GET_CART,
        cart,
    };
};

export const placeOrder = (body) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:8000/checkout", body);
        alert(res.data.message);
        localStorage.removeItem('cart');
        dispatch({ type: GET_CART, cart: [] });
        window.location.replace("/")
    } catch (error) {
        alert(error.message);
    }
};
