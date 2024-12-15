import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='container py-2 h-16 flex items-center justify-between'>
            <Link href="/">
              <h2>
                 Novel <span className='special-word'>Cove</span>
              </h2>
            </Link>
            <ul className='flex items-center gap-3'>
                <li>
                    <Link href='/blog'>Blog</Link>
                </li>
                <li>
                    <Link href='/create-blog'>Create</Link>
                </li>
                <li>
                    <Link href='/user'>Profile</Link>
                </li>
                <li>
                    <Link href='/signup'>Signup</Link>
                </li>
                <li>
                    <Link href='/login'>Login</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;