"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const FirstNovel = ({ firstNovel }) => {
  return (
    <section>
      <Link href={`/novel/${firstNovel?._id}`}>
        <div className="flex-col md:flex-row items-center gap-8">
          
          <div className="w-full lg:w-2/5">
            <Image
              src={firstNovel.image?.url || "/img1.jpg"}
              alt={`Image of ${firstNovel.title}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg"
            />
          </div>

          <div className="w-full lg:w-3/5 space-y-5">
            <div className="flex items-center gap-3 text-xs">
              <p>{firstNovel?.category}</p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default FirstNovel;
