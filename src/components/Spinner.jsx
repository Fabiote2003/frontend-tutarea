import React from "react";
import { ThreeCircles } from  'react-loader-spinner'
export const Spinner = () => {
  return (
    // <div className="">dar clase para que aparecza centrado y con un backgroun transparente
    <div className="flex justify-center items-center h-screen"> 
    <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#4D9C9C"
        innerCircleColor="#6BDBD4"
        middleCircleColor="#22333B"
      />
    </div>
  );
};
