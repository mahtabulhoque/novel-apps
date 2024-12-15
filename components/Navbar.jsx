'use client'
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "@/public/image/img1.jpg"
import {AiOutlineClose} from "react-icons/ai";

const Navbar = () => {

    const [showDropdown, setShowDropdown] = useState(false);


  const loggedIn = true;
  const handleShowDropdown = () => setShowDropdown(prev => true)
  const handleHideDropdown = () => setShowDropdown(prev => false)
  return (
    <div className="container py-2 h-16 flex items-center justify-between">
      <Link href="/">
        <h2>
          Novel<span className="special-word">Cove</span>
        </h2>
      </Link>
      <ul className="flex items-center gap-3">
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link href="/create-blog">Create</Link>
            </li>
            <div className="relative">
               <Image
                onClick={handleShowDropdown}
                src={img1}
                alt="avatar"
                sizes="100vw"
                className="w-10 h-10 rounded-full cursor-pointer"
               />
               {
                showDropdown && (
                 <div className="absolute top-0 right-0 bg-slate-300 bg-transparent p-5">
                   <AiOutlineClose onClick={handleHideDropdown} className="w-full cursor-pointer"/>
                   <button onClick={handleHideDropdown}>Logout</button>
                   <Link onClick={handleHideDropdown} href="/user">Profile</Link>
                 </div>
                )
               }
            </div>
          </>
        ) : (
          <>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
