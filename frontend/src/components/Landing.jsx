import React, { useState } from "react";
import Navbar from "../utils/Navbar";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SplineModelLanding from "../utils/SplineModelLanding"; // Make sure the path is correct based on your folder structure
import LogoCloud from "../utils/LogoCloud";
import Testimonial from "../utils/Testimonial";
import Footer from "../utils/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center relative">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/stock-footage-abstract-and-technology-dots-wave-background-dot-pattern-with-halftone-effect-abstract-wave.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        {/* 3D Model */}
        {/* <SplineModel /> */}

        {/* Text on top of the video */}

        <div className="relative text-center">
          <p className="absolute px-3 py-1 rounded-lg bg-black/50 border border-gray-400/60 top-0 text-white left-1/2 transform -translate-x-1/2 text-md flex justify-center items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-gallery-horizontal-end"
            >
              <path d="M2 7v10" />
              <path d="M6 5v14" />
              <rect width="12" height="18" x="10" y="3" rx="2" />
            </svg>
            <span
              className="text-lg opacity-90"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Elon Flask
            </span>
          </p>
          <h1
            className="text-7xl mt-10 z-10 text-white opacity-90"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Accelerate your Progress
          </h1>

          {/* Get Started Button */}
          <div className="mt-10">
            <button className="relative w-36 h-10 border border-gray-500/10 rounded-lg bg-gradient-to-r from-gray-500 via-black to-gray-500 text-white overflow-hidden cursor-pointer transform duration-1000 ease-in-out hover:scale-95">
              {/* Button Text */}
              <span className="relative z-10">Get Started</span>

              {/* Pseudo-element using Tailwind (Before element equivalent) */}
              <span className="absolute inset-0 bg-black/80 opacity-80 transition-all duration-1000 group-hover:opacity-100"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-black pb-36 text-white pt-32 p-10">
        <h2
          className="text-6xl mb-6 text-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Key Services
        </h2>

        {/* Border with shadow */}
        <hr className="h-[2px] bg-gradient-to-r opacity-60 from-black via-white to-black mx-auto w-1/2 mb-6" />

        <p className="text-xl opacity-80 font-serif mb-10 text-center">
          This is what I focus on. <br /> Additional services are available upon
          request.
        </p>

        <div className="flex flex-col gap-0">
          {/* First Row */}
          <div className="flex">
            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold flex-1 h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "40vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/art-direction.jpg"
                alt="art"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-90 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-0 transition-opacity duration-500"></div>

              <div className="relative z-10">Art Direction</div>
            </div>

            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold flex-1 h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "30vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/uiux.jpg"
                alt="UX/UI"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-0 transition-opacity duration-500"></div>

              <div className="relative z-10">UX/UI</div>
            </div>

            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "30vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/branding.jpeg"
                alt="Branding"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-90 group-hover:opacity-20 transition-opacity duration-500"></div>

              <div className="relative z-10">Branding</div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex">
            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold flex-1 h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "60vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/development.png"
                alt="Development"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-20 transition-opacity duration-500"></div>

              <div className="relative z-10">Development</div>
            </div>

            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "20vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/3d.jpg"
                alt="3D"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative z-10">3D</div>
            </div>

            <div
              className="group border font-serif border-white/50 p-6 text-3xl font-semibold h-[50vh] flex justify-start items-end duration-1000 cursor-pointer relative"
              style={{ flexBasis: "20vw" }}
            >
              <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
              <img
                src="/motion.jpg"
                alt="Motion"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
              />

              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-0 transition-opacity duration-500"></div>

              <div className="relative z-10">Motion</div>
            </div>
          </div>

          {/* Third Row */}
          <div className="group border font-serif border-white/50 p-6 text-3xl font-semibold flex justify-start items-end col-span-3 h-[50vh] duration-1000 cursor-pointer relative">
            <RadioButtonUncheckedIcon className="absolute opacity-30 z-50 top-4 left-4 text-white" />
            <img
              src="/web.png"
              alt="Web & App"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            />

            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>

            <div className="absolute inset-0 bg-black opacity-70 group-hover:opacity-0 transition-opacity duration-500"></div>

            <div className="relative z-10">Web & App</div>
          </div>
        </div>
      </div>

      <div className="relative pt-0 bg-black h-screen text-white">
        {/* Background with SVG */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: "transparent",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            maskImage: "radial-gradient(circle, white 10%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(circle, white 10%, transparent 90%)",
          }}
        />

        {/* Spline Model */}
        <SplineModelLanding />

        {/* Logo Cloud */}
        <div className="absolute inset-0 bottom-5 z-30 flex justify-center opacity-90 items-center">
          <LogoCloud/>
        </div>
      </div>

      <div className="h-[50vh] w-full bg-black">
        <Testimonial/>
      </div>

      <div className="h-full w-full bg-black">
        <Footer/>
      </div>
    </>
  );
};

export default Landing;
