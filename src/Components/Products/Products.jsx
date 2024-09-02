import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContextt";
import { wishListContext } from "../../Context/WishListContext";

const Products = () => {
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { addProductToCart } = useContext(cartContext);
  const { ToggledItem ,   handelClick} = useContext(wishListContext);
  

  async function addProduct(id) {
    const data = await addProductToCart(id);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  const { data, isLoading } = useQuery("products", getAllProducts);
 
 

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-400 ">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }
  return (
    <>
      <section className="py-[80px]">
        <div className="w-full md:w-[90%] m-auto">
          <HomeSlider />
          <CategorySlider />
          <div className="flex flex-wrap justify-center items-center">
            {data.data.data.map((item, idx) => (
              <div key={idx} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4">
                <div className="inner p-3 bg-slate-200">
                  <Link to={`/productDetails/${item.id}`}>
                    <img src={item.imageCover} alt="" className="w-full" />
                    <h2 className="text-green-600 mt-3 ">
                      {" "}
                      {item.category.name}
                    </h2>
                    <h2 className="mt-3">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex flex-wrap justify-between items-center mt-3">
                      <div>
                        <h4>{item.price} EGP</h4>
                      </div>
                      <div>
                        <h4>
                          <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                          {item.ratingsAverage}
                        </h4>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-center items-center">
                    {" "}
                    <button
                      onClick={() => addProduct(item.id)}
                      type="button"
                      className="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    >
                      Add to cart
                    </button>
                    <button onClick={()=>handelClick(item.id)}>
                      {ToggledItem[item.id] ? (
                        <i className="fa-solid fa-heart fa-xl mt-3 text-red-700"></i>
                      ) : (
                        <i className="fa-regular fa-heart fa-xl mt-3"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;


