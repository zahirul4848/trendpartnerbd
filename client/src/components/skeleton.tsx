import React from 'react';
import { FaImage } from "react-icons/fa6";

type TSkeleTon = {
  onlyImage?: boolean;
  lines?: number;
}

const Skeleton = ({onlyImage, lines = 2} : TSkeleTon) => {
  return (
    <div role="status" className="space-y-2 animate-pulse rtl:space-x-reverse w-[24rem]">
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <FaImage className="w-10 h-10 text-gray-200 dark:text-gray-600"/>
      </div>
      {!onlyImage && (
        <div className="w-full">
          {[...Array(lines).keys()].map((line)=> (
            // <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div key={line + 1} className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Skeleton;