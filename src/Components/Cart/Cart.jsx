import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContextt";
import { Link } from "react-router-dom";

const Cart = () => {
  const { Products, tottalPrice, updateCount, deleteItem , clearCart} =
    useContext(cartContext);
 

  return (
    <section className="py-[80px]">
      <div className="w-full md:w-[80%] mx-auto bg-slate-200 p-12">
        {Products != 0 ? (
          <>
            {" "}
            <h2 className="text-green-600 text-2xl font-mono">
              Tottal Price : {tottalPrice}
            </h2>
            <button
              onClick={clearCart}
            
              type="button"
              className="mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              clear cart
            </button>{" "}
            
            <Link
              to='/payment'
              className=" text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
            >
              Payment
            </Link>{" "}
            {Products?.map((item, idx) => (
              <div
                key={idx}
                className="md:flex flex-wrap justify-center items-center border-b-2 border-green-500"
              >
                <div className="md:w-1/6 p-5">
                  <img
                    src={item.product.imageCover}
                    alt=""
                    className="w-full"
                  />
                </div>

                <div className="md:w-3/6 lg:w-4/6 p-5">
                  <h2 className="mb-3 text-xl">{item.product.title} </h2>
                  <h2 className="mb-3 text-xl">{item.price} EGP</h2>
                  <button
                    onClick={() => deleteItem(item.product.id)}
                    type="button"
                    className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    remove
                  </button>
                </div>

                <div className="md:w-2/6 lg:w-1/6  p-5 ">
                  <div className="flex   items-center justify-normal">
                    <button
                      onClick={() =>
                        updateCount(item.product.id, item.count + 1)
                      }
                      type="button"
                      className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    >
                      +
                    </button>
                    <h2 className="mx-3">{item.count}</h2>
                    <button
                      onClick={() =>
                        updateCount(item.product.id, item.count - 1)
                      }
                      type="button"
                      disabled={item.count == 0 ? true : false}
                      className={`${
                        item.count == 0 ? "disabled:opacity-25" : ""
                      }  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800`}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="py-5 text-center text-green-600 ">
            <h2 className="text-3xl font-bold">No Data to display</h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
