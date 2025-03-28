"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type TProductImage = {
  imageUrls: {
    url: string;
    public_id: string;
  }[]
}

const ProductImageCarousel = ({imageUrls}: TProductImage) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: true,
  })


  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])


  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {imageUrls.map((imageUrl)=> (
            <Image
              key={imageUrl.public_id} 
              className="w-full rounded" 
              src={imageUrl.url} alt={imageUrl.public_id}
              width={500}
              height={500} 
            />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div ref={emblaThumbsRef} className="flex gap-3">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={imageUrl.public_id}
              onClick={() => onThumbClick(index)}
              // selected={index === selectedIndex}
              // index={index}
            >
              <Image
                key={imageUrl.public_id} 
                className={`w-20 h-16 object-cover rounded ${selectedIndex === index ? "border" : "border-none"}`} 
                src={imageUrl.url} alt={imageUrl.public_id}
                width={500}
                height={500}        
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductImageCarousel;


