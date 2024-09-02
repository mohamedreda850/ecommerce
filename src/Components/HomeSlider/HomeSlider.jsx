import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/slider-image-1.jpeg";
import slider2 from "./../../assets/images/slider-image-2.jpeg";
import slider3 from "./../../assets/images/slider-image-3.jpeg";
import img1 from './../../assets/images/blog-img-1.jpeg'
import img2 from './../../assets/images/blog-img-2.jpeg'

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    arrows : false
  };
  return (
    <section className="pb-5 px-4">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-2/3">
          <Slider {...settings}>
            <div>
              <img src={slider1} alt="" className="w-full h-[400px]" />
            </div>
            <div>
              <img src={slider2} alt="" className="w-full h-[400px]" />
            </div>
            <div>
              <img src={slider3} alt="" className="w-full h-[400px]" />
            </div>
          </Slider>
        </div>
        <div className="w-1/3">
        <div>
            <img src={img1} alt="" className="w-full block h-[200px]"/>
        </div>
        <div>
            <img src={img2} alt="" className="w-full block h-[200px]"/>
        </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSlider;
