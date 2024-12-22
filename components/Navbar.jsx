"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "@/public/image/img1.jpg";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  // Toggle dropdown
  const handleToggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);

  // Toggle mobile menu
  const handleMobileMenu = () => setShowMobileMenu((prev) => !prev);
  const handleCloseMobileMenu = () => setShowMobileMenu(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        handleCloseDropdown();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 h-16 flex items-center justify-between relative">
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
            href="/novel"
            className={
              pathname === "/novel" ? "text-primaryColor font-bold" : ""
            }
          >
            Story
          </Link>
        </li>
        {session?.user ? (
          <>
            <li>
              <Link
                href="/create-novel"
                className={
                  pathname === "/create-novel"
                    ? "text-primaryColor font-bold"
                    : ""
                }
              >
                Create
              </Link>
            </li>
            {/* Profile Dropdown */}
            <div className="relative dropdown-container">
              <Image
                onClick={handleToggleDropdown}
                src={session?.user?.image || img1}
                width={40}
                height={40}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute top-full right-0 bg-white shadow-md rounded-md p-4 z-20">
                  <Link
                    href="/user"
                    onClick={handleCloseDropdown}
                    className="block text-sm text-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block text-sm text-gray-700 mb-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "text-primaryColor font-bold" : ""
                }
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "text-primaryColor font-bold" : ""
                }
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
          <ul className="flex flex-col text-center gap-4">
            <li>
              <Link
                href="/"
                onClick={handleCloseMobileMenu}
                className={
                  pathname === "/" ? "text-primaryColor font-bold" : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={handleCloseMobileMenu}
                className={
                  pathname === "/blog" ? "text-primaryColor font-bold" : ""
                }
              >
                Blog
              </Link>
            </li>
            {session?.user ? (
              <>
                <li>
                  <Link
                    href="/create-blog"
                    onClick={handleCloseMobileMenu}
                    className={
                      pathname === "/create-blog"
                        ? "text-primaryColor font-bold"
                        : ""
                    }
                  >
                    Create
                  </Link>
                </li>

                {/* Centered Profile Avatar */}
                <div className="flex flex-col items-center justify-center gap-2 mt-4 dropdown-container">
                  <Image
                    onClick={handleToggleDropdown}
                    src={session?.user?.image || img1}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="w-16 h-16 rounded-full cursor-pointer"
                  />
                  {showDropdown && (
                    <div className="absolute top-full mt-2 bg-white shadow-md rounded-md p-4 z-20 text-center">
                      <Link
                        href="/user"
                        onClick={handleCloseDropdown}
                        className="block text-sm text-gray-700"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="block text-sm text-gray-700 mb-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signup"
                    onClick={handleCloseMobileMenu}
                    className={
                      pathname === "/signup"
                        ? "text-primaryColor font-bold"
                        : ""
                    }
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={handleCloseMobileMenu}
                    className={
                      pathname === "/login" ? "text-primaryColor font-bold" : ""
                    }
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
