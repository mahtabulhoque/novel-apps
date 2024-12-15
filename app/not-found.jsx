import React from 'react';
import Image from 'next/image';
import notfound from '@/public/image/notfind.gif'

const notFound = () => {
    return (
        <div className='container h-screen px-32 py-20 justify-between items-center'>
          <div>
          <Image
           src={notfound}
           alt='notFound'
           className=''
           /> 
          </div>
        </div>
    );
};

export default notFound;