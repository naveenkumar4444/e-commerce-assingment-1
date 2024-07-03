import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder, removeFromCart } from '../redux/actions';

const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;

        dispatch(placeOrder({
            name, email, cart
        }))

    };

    function totalCart(total, val) {
        return total + Number(val.price);
    }

    return (
        <div className="">
            <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h1 className="sr-only">Checkout</h1>

                    <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        {/* Checkout List */}
                        <div className="">
                            <h2 className="text-lg font-medium text-gray-900">Checkout List</h2>

                            {cart && cart.length > 0 ?
                                <div className="mt-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h3 className="sr-only">Items in your cart</h3>
                                    <ul role="list" className="divide-y divide-gray-200">
                                        {cart.map((product) => (
                                            <li key={product.id} className="flex px-4 py-6 sm:px-6">
                                                <div className="flex-shrink-0">
                                                    <img src={product.image} alt={product.image} className="w-16 rounded-md" />
                                                </div>

                                                <div className="ml-6 flex flex-1 flex-col">
                                                    <div className="flex">
                                                        <div className="min-w-0 flex-1">
                                                            <h4 className="text-sm">
                                                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                                                    {product.name}
                                                                </p>
                                                            </h4>
                                                        </div>

                                                        <div className="ml-4 flow-root flex-shrink-0">
                                                            <button
                                                                onClick={() => dispatch(removeFromCart(product))}
                                                                type="button"
                                                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-1 items-end justify-between pt-2">
                                                        <p className="mt-1 text-sm font-medium text-gray-900">₹ {product.price.toLocaleString("en-in")}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-base font-medium">Total</dt>
                                            <dd className="text-base font-medium text-gray-900">₹ {cart.reduce(totalCart, 0).toLocaleString("en-in")}</dd>
                                        </div>
                                    </dl>
                                </div>
                                : <div className='mt-4 flex justify-center items-center rounded-lg border border-gray-200 h-[20vh] shadow-sm'>
                                    <h2 className='font-bold'>No items in CART</h2></div>
                            }

                        </div>

                        <div className='mt-10 lg:mt-0'>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">User information</h2>

                                <div className="mt-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            autoComplete="name"
                                            className="block w-full rounded-md border border-gray-300 outline-none shadow-sm h-9 px-4 focus:border-gray-600 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border border-gray-300 outline-none shadow-sm h-9 px-4 focus:border-gray-600 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {cart && cart.length > 0 &&
                                    <div className="border-t border-gray-200 py-6">
                                        <button
                                            type="submit"
                                            className="w-full rounded-md border border-transparent bg-gray-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            Confirm order
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
