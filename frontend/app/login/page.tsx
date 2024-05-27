"use client";

import React from "react";

import { useState } from "react";

import axios from "axios";

import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";

import sandenlyLogo from "../../public/sandenly_logo.png";
import { config } from "../../config";

const LoginForm = () => {
  // const router = useRouter();
  // Inputs state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Func to handle login
  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const url = config.DEV_API_URL;
    if (!email || !password) {
      return alert("Please fill in all the credentials");
    } else {
      try {
        const response = await axios.post(`${url}/api/auth/login`, {
          email: email,
          password: password,
        });

        if (response.data && response.data.message) {
          return alert(response.data.message);
        }

        if (response.data && response.data.errorMessage) {
          return alert(response.data.errorMessage);
        }
      } catch (error) {
        return alert("An error occured, Please try again :(");
      }
    }
  };

  // TODO: Func to handle navigation to google Auth window.
  function navigate(url: string) {
    window.location.href = url;
  }

  // TODO: Func to handle login with google
  const handleLoginWithGoogle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const url = config.DEV_API_URL;
    try {
      const response = await fetch(`${url}/api/auth/googleAuthUrl`, {
        method: "POST",
      });
      const data = await response.json();
      const googleAuthUrl = data.url;
      // console.log("AuthUrl:", googleAuthUrl);
      navigate(googleAuthUrl);
      // router.push(`/${googleAuthUrl}`);
    } catch (err) {
      console.log("AuthUrl error occured:", err);
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto my-10 bg-white px-8 pb-3 rounded-xl shadow shadow-slate-300">
        <div className="flex justify-center items-center">
          <Image
            src={sandenlyLogo}
            width={150}
            height={150}
            alt="Sandenly Logo"
          />
        </div>
        <p className="text-primary-brown font-bold">Hi, Welcome back 👋</p>

        <div className="my-5">
          <button
            onClick={handleLoginWithGoogle}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-secondary-brown hover:text-slate-900 hover:shadow transition duration-150"
          >
            <Image
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              width={20}
              height={20}
              alt="Google icon"
            />{" "}
            <span className="text-secondary-brown">Login with Google</span>
          </button>
        </div>
        <form action="" className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-primary-brown pb-2">
                Email address
              </p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-secondary-brown hover:shadow"
                placeholder="jon.doe@company.com"
                required
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-primary-brown pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-secondary-brown hover:shadow"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
            <div className="flex flex-row justify-between">
              {/* <div>
                <label htmlFor="remember" className="">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                  />
                  Remember me
                </label>
              </div> */}
              <div>
                <a href="#" className="font-medium text-primary-brown">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 font-medium text-white bg-primary-brown hover:bg-secondary-brown rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
            <p className="text-center text-primary-brown">
              Not registered yet?{" "}
              <Link
                href={"/signup"}
                className="text-secondary-brown font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
