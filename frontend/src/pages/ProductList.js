import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const cart = useSelector(state => state.cart);

  const categorizedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center underline">List of Products</h2> */}

        {Object.keys(categorizedProducts).map(category => (
          <div key={category} className='mb-6'>
            <h2 className="text-xl font-bold underline">{category}</h2>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {categorizedProducts[category].map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.image}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-80"
                      />
                      <p className="relative text-lg font-semibold text-white">₹ {product.price.toLocaleString("en-in")}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    {cart.find(i => i.id == product.id) ?
                      <button
                        onClick={() => dispatch(removeFromCart(product))}
                        className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-red-700 px-8 py-2 text-sm font-medium text-white hover:bg-red-900"
                      >
                        Remove from cart<span className="sr-only">, {product.name}</span>
                      </button>
                      :
                      <button
                        onClick={() => dispatch(addToCart(product))}
                        className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-8 py-2 text-sm font-medium text-white hover:bg-gray-900"
                      >
                        Add to cart<span className="sr-only">, {product.name}</span>
                      </button>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/actions';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.products);

//   const categorizedProducts = products.reduce((acc, product) => {
//     acc[product.category] = acc[product.category] || [];
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   return (
//     <div>
//       {Object.keys(categorizedProducts).map(category => (
//         <div key={category}>
//           <h2>{category}</h2>
//           {categorizedProducts[category].map(product => (
//             <div key={product.id}>
//               <h3>{product.name}</h3>
//               <p>Price: ${product.price}</p>
//               <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

export default ProductList;

