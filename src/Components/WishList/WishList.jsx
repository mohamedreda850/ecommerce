import React from 'react'
import { useContext } from 'react';
import { wishListContext } from './../../Context/WishListContext';
import { cartContext } from './../../Context/CartContextt';


export default function WishList() {
  const {products , handelClick } = useContext(wishListContext)
  const { addProductToCart } = useContext(cartContext);

  return (
    <section className='py-[120px]'>
      <div className='w-full md:w-[80%] mx-auto bg-slate-200 p-12'>
        <div>
          <h1 className='text-3xl font-semibold'>
            My Wish List
            </h1>
            </div>
            {products?.map((item , idx)=><div
                key={idx}
                className="md:flex flex-wrap justify-center items-center border-b-2 border-green-500"
              >
                <div className="md:w-1/6 p-5">
                  <img
                    src={item.imageCover}
                    alt=""
                    className="w-full"
                  />
                </div>

                <div className="md:w-3/6 lg:w-4/6 p-5">
                  <h2 className="mb-3 text-xl">{item.title} </h2>
                  <h2 className="mb-3 text-xl">{item.price} EGP</h2>
                <button onClick={() => handelClick(item._id)} className='text-red-700'><i className="fa-solid fa-trash fa-sm"></i> remove</button>
                </div>

                <div className="md:w-2/6 lg:w-1/6  p-5 ">
                  <div className="flex   items-center justify-normal">
                  <button
                    onClick={()=>addProductToCart(item._id)}
                    type="button"
                    className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                  >
                    Add to cart
                  </button>
                  </div>
                </div>
              </div>)}
      </div>
    </section>
  )
}
