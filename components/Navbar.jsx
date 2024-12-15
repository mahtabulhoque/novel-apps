"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "@/public/image/img1.jpg";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  
  const loggedIn = false;

  const handleShowDropdown = () => setShowDropdown(true);
  const handleHideDropdown = () => setShowDropdown(false);

  const handleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-2 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <h2 className="text-4xl font-bold">
          Novel<span className="special-word">Cove</span>
        </h2>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6">
        <li>
          <Link
            href="/"
            className={pathname === "/" ? "text-primaryColor font-bold" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={pathname === "/blog" ? "text-primaryColor font-bold" : ""}
          >
            Blog
          </Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link
                href="/create-blog"
                className={pathname === "/create-blog" ? "text-primaryColor font-bold" : ""}
              >
                Create
              </Link>
            </li>
            {/* Profile Dropdown */}
            <div className="relative">
              <Image
                onClick={handleShowDropdown}
                src={img1}
                alt="avatar"
                sizes="100vw"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute top-full right-0 bg-white shadow-md rounded-md p-4">
                  <AiOutlineClose
                    onClick={handleHideDropdown}
                    className="cursor-pointer text-gray-600"
                  />
                  <button
                    onClick={handleHideDropdown}
                    className="block mt-2 text-sm text-gray-700"
                  >
                    Logout
                  </button>
                  <Link
                    onClick={handleHideDropdown}
                    href="/user"
                    className="block mt-2 text-sm text-gray-700"
                  >
                    Profile
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/signup"
                className={pathname === "/signup" ? "text-primaryColor font-bold" : ""}
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={pathname === "/login" ? "text-primaryColor font-bold" : ""}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <AiOutlineMenu
          onClick={handleMobileMenu}
          className="text-xl cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 z-10">
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "text-primaryColor font-bold" : ""}
                onClick={handleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={pathname === "/blog" ? "text-primaryColor font-bold" : ""}
                onClick={handleMobileMenu}
              >
                Blog
              </Link>
            </li>
            {loggedIn ? (
              <>
                <li>
                  <Link
                    href="/create-blog"
                    className={pathname === "/create-blog" ? "text-primaryColor font-bold" : ""}
                    onClick={handleMobileMenu}
                  >
                    Create
                  </Link>
                </li>
                <div className="relative">
                  <Image
                    onClick={handleShowDropdown}
                    src={img1}
                    alt="avatar"
                    sizes="100vw"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  {showDropdown && (
                    <div className="absolute top-0 left-0 bg-white shadow-md rounded-md p-4">
                      <AiOutlineClose
                        onClick={handleHideDropdown}
                        className="cursor-pointer text-gray-600"
                      />
                      <button
                        onClick={handleHideDropdown}
                        className="block mt-2 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                      <Link
                        onClick={handleHideDropdown}
                        href="/user"
                        className="block mt-2 text-sm text-gray-700"
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signup"
                    className={pathname === "/signup" ? "text-primaryColor font-bold" : ""}
                    onClick={handleMobileMenu}
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className={pathname === "/login" ? "text-primaryColor font-bold" : ""}
                    onClick={handleMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
