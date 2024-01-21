import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import SectionTitle from "@/components/UI/SectionTitle";
import { Photo } from "@/types/types";

type CarouselProps = {
  title: string;
  images: Photo[];
};

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function CarouselGallery({ title, images }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <section className="mb-section">
      <SectionTitle mb="mb-8 lg:mb-12">{title}</SectionTitle>
      <div className="mx-container flex items-center justify-center" data-carousel="slide" >
        <div className="relative">
          <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevSlide}>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
            </span>
          </button>
          <div className="w-full h-[50vh] flex justify-center items-center relative m-auto overflow-hidden rounded-4xl border border-grey3 md:w-[750px]">
            <Swipe
              onSwipeLeft={handleNextSlide}
              onSwipeRight={handlePrevSlide}
              className="relative z-10 w-full h-full" 
            >
              {images.map((image, i) => {
                if (i === currentSlide) {
                  return (
                    <Image
                    key={`child-${i}`}
                    src={image.image} 
                    alt=""
                    layout="fill"
                    className="animate-fadeIn aspect-[7/3] object-cover"
                  />
                  );
                }
              })}
            </Swipe>
          </div>
          {/* <AiOutlineRight
            onClick={handleNextSlide}
            className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
          /> */}
          <button type="button" onClick={handleNextSlide} className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
            </span>
          </button>

          <div className="relative flex justify-center p-2">
            {images.map((child, i) => {
              return (
                <div
                  className={
                    i === currentSlide
                      ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={`child-${i}`}
                  onClick={() => {
                    setCurrentSlide(i);
                  }}
                />
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
    
  );
}