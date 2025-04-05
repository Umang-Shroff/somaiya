import React from "react";
import Spline from "@splinetool/react-spline";

const SplineModelLogin = () => {
  return (
    <div className="relative w-full h-full">
      <Spline
        scene="https://prod.spline.design/e63YVvsfIScwzvn7/scene.splinecode"
        className="relative border scale-75 border-transparent pointer-events-none" // Prevent interactions with the model
      />

      {/* Overlay to block interactions */}
      <div className="absolute inset-0  bg-black opacity-0 z-30 pointer-events-auto" />

      <div className="absolute bottom-0 right-0 w-38 h-13 z-40 backdrop-blur-2xl bg-black/20 text-white m-4">
        {/* black div to hide watermark */}
      </div>
      <hr className="h-[2px] relative bottom-2  bg-gradient-to-r opacity-60 from-gray-600 via-white to-gray-600 mx-auto w-1/2 mb-6" />
    </div>
  );
};

export default SplineModelLogin;
