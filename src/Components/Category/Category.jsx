import axios from "axios";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";

const Category = () => {
  async function getAllCategory() {
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        params: {
          limit: 10,
          page: 1,
        },
      }
    );
  }

  const { data, isLoading, isFetching, error } = useQuery(
    "category",
    getAllCategory
  );
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
    <section className="py-[100px]">
      <div className="w-[80%] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 justify-start gap-5">
          {data?.data.data.map((cate, idx) => (
            <div key={idx} className="border rounded-lg  hover:shadow-lg  hover:shadow-green-600 transe duration-500	">
              <img src={cate.image} className="w-full aspect-[1/1] rounded-t-lg" alt="" />
              <div className="w-full h-20 flex justify-center items-center  ">
                <h1 className="text-3xl text-green-600">{cate.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
