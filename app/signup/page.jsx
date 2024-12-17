import SignupForm from '@/components/authentication/Signupform';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';


const Signup = async () => {

  const session = await getServerSession(authOptions);

  if(session)redirect('/')
    return (
        <div>
          <SignupForm/>   
        </div>
    );
};

export default Signup;