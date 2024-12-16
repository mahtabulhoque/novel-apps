import React from 'react';
import Input from '../Input';
import Link from 'next/link';

const SignupForm = () => {
    return (
        <section className='container'>
            <form className='border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5'>
               <h2 className='text-center special-word'>Sign up</h2>
               <Input label="Name" type="text" name="name" placeholder="Your Name"/>
               <Input label="Email" type="text" name="email" placeholder="Your Email"/>
               <Input label="Password" type="password" name="name" placeholder="Password"/>
               <button type='submit' className='btn w-full'>Sign Up</button>
               <p className='text-blue-500 text-center'>Already have account?{" "}
                <Link href={"/login"}>Login</Link>
               </p>
            </form>
        </section>
    );
};

export default SignupForm;