import React, { useContext, useState } from "react";
import img1 from "./../../assets/images/blog-img-1.jpeg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContextt";
import toast from "react-hot-toast";

const ProductsDetails = () => {
  const [loader, setloader] = useState(false);
  const { id } = useParams();
  async function getProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  const { data, isLoading } = useQuery(`product${id}`, getProduct);

  const { addProductToCart } = useContext(cartContext);
  async function addProduct() {
    setloader(true);
    const data = await addProductToCart(id);

    if (data) {
      toast.success(data.message);
      setloader(false);
    } else {
      toast.error("error");
      setloader(false);
    }
  }
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
    <section className="py-8">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/3 p-5">
            <div className="inner">
              <img src={data?.data.data.imageCover} className="w-full" alt="" />
            </div>
          </div>
          <div className="w-full md:w-2/3 p-5">
            <div>
              <h2 className=" text-2xl mb-3 font-semibold">
                {data?.data.data.title}
              </h2>
              <p className="text-xl mb-3">{data?.data.data.description}</p>
              <h2 className=" text-xl mb-3 text-green-600 font-mono">
                {data?.data.data.category.name}
              </h2>
              <div className="flex flex-wrap justify-between items-center mt-3">
                <div>
                  <h4>{data?.data.data.price} EGP</h4>
                </div>
                <div>
                  <h4>
                    <i className="fa-solid fa-star text-yellow-400 mr-2"></i>{" "}
                    {data?.data.data.ratingsAverage}
                  </h4>
                </div>
                <button
                  onClick={addProduct}
                  type="button"
                  className="w-full mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  {loader ? (
                    <i className="fa-solid fa-spinner fa-spin text-white"></i>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsDetails;
