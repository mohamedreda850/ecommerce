import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

const AllOrderss = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allOrder, setAllOrder] = useState(null);
  const { id } = jwtDecode(localStorage.getItem("tkn"));
  async function getAllOrders() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setAllOrder(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getAllOrders();
  }, []);
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
    <section className="py-[80px]">
      <div className="w-full md:w-[80%] mx-auto">
        {allOrder? allOrder.map((order , idx)=><div>
            <div className="p-5 mb-3 bg-slate-200">
                <div className="flex flex-wrap justify-center items-center">
                    {order.cartItems?.map((item , idx)=><div key={idx} className="w-1/6">
                    <img src={item.product.imageCover} alt="" className="w-full"/>
                        
                    </div>)}
                </div>
                <h2>total order price :{order.totalOrderPrice} EGP</h2>
                <h2>payment method type :{order.paymentMethodType}</h2>
            </div>
        </div>):''}
      </div>
    </section>
  );
};

export default AllOrderss;
