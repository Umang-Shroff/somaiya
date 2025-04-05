import React, { useEffect, useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

const Navbar = () => {

  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // To track the open/close state of the mobile menu

  const openMenu = () => {
    setMenuOpen(true); // Open the mobile menu
  };

  const closeMenu = () => {
    setMenuOpen(false); // Close the mobile menu
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <nav
        className={`w-screen bg-black/40 text-white fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50
                      ${
                        isScroll
                          ? "bg-black bg-opacity-50 backdrop-blur-lg shadow-sm dark:backdrop-blur-lg dark:bg-darkTheme/50 dark:shadow-white/20"
                          : ""
                      }`}
      >
        
        <a href="#top" className="">
        <img src="#" alt="#" className="w-28 scale-125 cursor-pointer mr-14" />
          
        </a>
        <ul
          className={`hidden backdrop-blur-none md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll
              ? ""
              : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent dark:backdrop-blur-[2px]"
          } `}
        >
          <li>
            <a className="font-Ovo" href="#top">
              Home
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#experience">
              Experience
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#contact">
              Contact me
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">

          <a
            href="#contact"
            className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 bg-white bg-opacity-40 rounded-full ml-4 dark:hover:backdrop-blur-lg dark:border-white/50 dark:bg-transparent ${
              isScroll ? "" : "dark:backdrop-blur-[5px]"
            }`}
          >
            Contact <ArrowOutwardIcon className="w-3" />
          </a>
          <button className="block md:hidden ml-3" onClick={openMenu}>
            <img
              src="#"
              alt="#"
              className="w-6"
            />
          </button>
        </div>

        {/* ---------------mobile menu-------------- */}

        <ul
          className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed right-0 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white overflow-y-auto transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div onClick={closeMenu} className="absolute right-6 top-6">
            <CloseIcon className="w-5 cursor-pointer" />
          </div>

          <li>
            <a className="font-Ovo" onClick={closeMenu} href="#top">
              Home
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#experience">
              Experience
            </a>
          </li>
          <li>
            <a className="font-Ovo" onClick={closeMenu} href="#about">
              About
            </a>
          </li>
          <li>
            <a className="font-Ovo" onClick={closeMenu} href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="font-Ovo" onClick={closeMenu} href="#contact">
              Contact me
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
