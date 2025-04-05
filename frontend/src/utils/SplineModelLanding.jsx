import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineModelLanding = () => {
  return (
    <div className="relative w-full h-full">
      {/* Spline model */}
      <Spline
        scene="https://prod.spline.design/t2Vn4gpCyeD8-0mb/scene.splinecode"
        className="w-full h-full pointer-events-none" // Prevent interactions with the model
      />
      
      {/* Overlay to block interactions */}
      <div className="absolute inset-0 bg-black opacity-0 z-30 pointer-events-auto" />
    
      <div className="absolute bottom-0 right-0 w-50 h-20 z-40 bg-black text-white p-4 m-4">
        {/* black div to hide watermark */}
      </div>

    </div>
  );
};

export default SplineModelLanding;
