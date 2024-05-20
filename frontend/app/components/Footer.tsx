import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <>
      <div className="bg-primary-brown mt-[4rem] py-[4rem]">
        <div className="w-[85%] mx-auto grid lg:grid-cols-3 gap-[6rem]">
          <div className="bg-white p-[2rem] rounded-md">
            <p className="font-bold">Subscribe to newsletter</p>
            <p className="py-[1rem]">
              Subscribe now to receive tips on how to take your business to the
              next level.
            </p>
            <div className="flex flex-row gap-[2rem]">
              <input
                type="email"
                className="p-[0.5rem] border rounded-md border-[1px] outline-secondary-brown"
                placeholder="Email"
              />
              <button className="text-white rounded-md text-[0.8rem] py-[0.6rem] px-[1rem] bg-primary-brown hover:bg-secondary-brown hover:cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-[4rem] text-white justify-evenly">
            <div>
              <h3 className="font-bold text-[1rem] pb-[0.8rem]">Company</h3>
              <p className="pb-[0.8rem] ">About</p>
              <p className="pb-[0.8rem] ">Stories</p>
              <p>Contact</p>
            </div>
            <div>
              <h3 className="font-bold text-[1rem] pb-[0.8rem]">Account</h3>
              <p className="pb-[0.8rem]">Sign Up</p>
              <p>Sign In</p>
            </div>
          </div>

          <div className="text-white">
            <h3 className="font-bold text-[1rem] pb-[0.8rem]">Contact</h3>
            <p>example@company.com</p>
          </div>
        </div>
        {/* Socials icons */}
        <div className="flex gap-[1rem] mt-[2rem] text-white w-[85%] mx-auto">
          <FaFacebook/>
          <FaLinkedin/>
          <FaTwitter/>
        </div>
        <p className="text-white mt-[2rem] ml-[7%]">&copy; {`${currentYear} Sandenly. All rights reserved`}</p>
      </div>
    </>
  );
};

export default Footer;
