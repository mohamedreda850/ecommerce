import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategorySlider() {
async function getAllCatigory(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

  const {data} = useQuery('categorySlider',getAllCatigory)

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <section className="p-5">
        <Slider {...settings}>
       {data?.data.data .map((item ,idx)=><div key={idx}>
        <img src={item.image} alt="" className="w-full h-[200px] aspect-[4/3]	"/>
        <h2 className="text-green-600 ">{item.name}</h2>
        </div>)}
      </Slider>
    </section>
  );
}

export default CategorySlider;
