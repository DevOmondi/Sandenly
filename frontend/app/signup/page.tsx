"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import axios from "axios";

import sandenlyLogo from "../../public/sandenly_logo.png";
import { config } from "../../config";
const SignUpForm = () => {
  const router = useRouter();
  // Inputs state management
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  type categoryObj = {
    Individual: {
      categoryName: string;
    };
    Company: {
      categoryName: string;
    };
  };

  // Categories object
  const categories: categoryObj = {
    Individual: { categoryName: "Individual" },
    Company: { categoryName: "Company" },
  };

  // TODO: Func to handle categories change
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const _category = event.target.value;
    setCategory(event.target.value);
    // console.log("selected category: ", _category);
  };

  // TODO: Func to handle form submission
  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const url = config.DEV_API_URL;
    if (password !== cPassword) {
      return alert("Password does not match confirm password");
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !category ||
      !contact ||
      !password ||
      !cPassword
    ) {
      return alert("Please fill in all the details");
    } else {
      try {
        const response = await axios.post(`${url}/api/auth/register`, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          category: category,
          contact: contact,
          password: password,
        });
        if (response.data && response.data.message) {
          // return alert(response.data.message);
          router.push("/login");
        }

        if (response.data && response.data.errorMessage){
          return alert(response.data.errorMessage)
        }
        
      } catch (error) {
        return alert("Ooops! something went wrong, Try again :(");
        // console.log("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white">
        <div className="flex justify-center items-center">
          <Image
            src={sandenlyLogo}
            width={150}
            height={150}
            alt="Sandenly Logo"
            priority={true}
          />
        </div>
        <form>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-primary-brown"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="form-input"
                placeholder="John"
                required
                value={firstName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(event.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-primary-brown"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                className="form-input"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium text-primary-brown"
              >
                Category
              </label>
              <select
                id="categories"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-brown focus:border-secondary-brown focus:outline-none block w-full p-2.5"
                required
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="" hidden disabled>
                  --Select category--
                </option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-primary-brown"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="contact"
                className="form-input"
                placeholder="+254123456789"
                required
                value={contact}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setContact(event.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-primary-brown"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                className="form-input"
                placeholder="Sandenly"
                value={company}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCompany(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-primary-brown"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="john.doe@company.com"
              required
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-primary-brown"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder=""
              required
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-primary-brown"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="form-input"
              placeholder=""
              required
              value={cPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCPassword(event.target.value);
              }}
            />
          </div>
          <div className="flex items-start mb-6">
            <label
              htmlFor="remember"
              className="text-sm font-medium text-gray-900"
            >
              Have an account?{" "}
              <Link
                href={"/login"}
                className="text-secondary-brown font-bold hover:underline "
              >
                Log In
              </Link>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-secondary-brown hover:bg-primary-brown  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
