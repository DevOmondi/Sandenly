import React from "react";

import Image from "next/image";
import Link from "next/link";

import sandenlyLogo from "../../public/sandenly_logo.png";

const Header = () => {
  return (
    <div className="flex lg:flex-row justify-between w-[90%] mx-auto items-center">
      <div>
        <Image
          src={sandenlyLogo}
          width={150}
          height={150}
          alt="Sandenly Logo"
        />
      </div>
      <div className="text-white flex items-center gap-[2rem]">
        <p className="hover:text-secondary-brown hover:cursor-pointer">
          About Us
        </p>
        <p className="hover:text-secondary-brown hover:cursor-pointer">
          Products
        </p>
        <p className="hover:text-secondary-brown hover:cursor-pointer">
          Contact Us
        </p>
        <Link href={"/signup"}>
          {" "}
          <button className="text-white rounded-md text-[0.8rem] py-[0.6rem] px-[1rem] transition ease-in-out delay-150 bg-primary-brown hover:-translate-y-1 hover:scale-110 hover:bg-secondary-brown duration-300 ">
            Sign Up
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="text-white rounded-md text-[0.8rem] py-[0.6rem] px-[1rem] transition ease-in-out delay-150 bg-secondary-brown hover:-translate-y-1 hover:scale-110 hover:bg-primary-brown duration-300 ">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
