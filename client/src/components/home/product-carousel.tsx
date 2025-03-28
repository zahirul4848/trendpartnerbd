"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, usePrevNextButtons } from './embla-carousel-arrow-button';

import ProductBox from '../product-box';
import useGetProducts from '@/lib/hooks/get-products';
import Skeleton from '../skeleton';

const ProductCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 'auto' });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const {products, isLoading} = useGetProducts({pageSize: 10});

  return (
    <div>
      <div className="flex justify-start md:justify-center items-center relative my-4">
        <h1 className="text-3xl font-semibold">Featured Products</h1>
        <div className="flex gap-2 absolute right-0">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      {isLoading && (
        <div className="flex gap-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-[1rem] touch-pan-y touch-pinch-zoom">
          {products && products.map((product)=> (
            <div className="min-w-0 grow-0 shrink-0 basis-full md:basis-1/4" key={product._id}>
              <ProductBox product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel;