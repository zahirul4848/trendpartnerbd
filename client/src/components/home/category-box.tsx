import { TCategory } from '@/lib/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

const CategoryBox = ({category}: {category: TCategory}) => {
  return (
    <div className="h-auto max-w-full relative">
      <Image className="w-full h-full rounded-lg object-cover" src={category.imageUrl.url} alt={category.name} width={500} height={500} />
      <Link
        href={`/product/search?categoryName=${category.name}`}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 group bg-gray-900 opacity-90 text-white px-7 py-2 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
      >
        <span>{category.name}</span>
        <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
      </Link>
    </div>
  )
}

export default CategoryBox;