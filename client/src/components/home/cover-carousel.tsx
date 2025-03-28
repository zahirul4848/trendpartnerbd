"use client"
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';
import Fade from 'embla-carousel-fade';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());


const CoverCarousel = () =>  {
  
  const [emblaRef] = useEmblaCarousel(OPTIONS, [Autoplay({delay: 5000}), Fade()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number h-[19rem] md:h-[28rem]">
                <Image className='w-full h-full object-cover' src={`/images/carousel_${index + 1}.jpg`} alt='carousel image' width={1024} height={1024} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoverCarousel