import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";

const Brand = () => {
  async function getBrand() {
    return await axios("https://ecommerce.routemisr.com/api/v1/brands", {
      params: {
        limit: 54,
      },
    });
  }
  const { data, isLoading } = useQuery("brands", getBrand);
  if(isLoading){
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-green-400 ">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    )
   }
  return (
    <section className="py-[120px]">
      <div className="w-[80%] mx-auto">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-green-600 text-4xl font-semibold">All Brand</h1>
        </div>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5
        ">
          {data?.data.data.map((brands, idx) => 
            <div
              key={idx}
              className="border rounded-lg hover:shadow-lg hover:shadow-green-600 transe duration-500	"
            >
              <img src={brands.image} className="w-full rounded-lg" alt="" />
              <div className="h-16 flex justify-center items-center">  <p className="text-2xl ">{brands.name}</p></div>
            
            </div>   
          )}
        </div>
      </div>
    </section>
  );
};

export default Brand;
