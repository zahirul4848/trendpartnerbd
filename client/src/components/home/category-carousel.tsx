"use client"
import React from 'react'
import CategoryBox from './category-box';
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './embla-carousel-arrow-button';

import useGetCategories from '@/lib/hooks/get-categories';
import Skeleton from '../skeleton';

const CategoryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 'auto' });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const {categories, isLoading} = useGetCategories();

  return (
    <div>
      <div className="flex justify-start md:justify-center items-center relative my-4">
        <h1 className="text-3xl font-semibold">Trending Categories</h1>
        <div className="flex gap-2 absolute right-0">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      {isLoading && (
        <div className="flex gap-2">
          <Skeleton onlyImage />
          <Skeleton onlyImage />
          <Skeleton onlyImage />
        </div>
      )}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-[1rem] touch-pan-y touch-pinch-zoom">
          {categories && categories.map((category)=> (
            <div className="min-w-0 grow-0 shrink-0 basis-full md:basis-1/4" key={category._id}>
              <CategoryBox category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCarousel;