import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Scrollbar } from 'swiper/modules';
const HeroSection = () => {
    return (
        <div className='pt-12'>
            <Swiper
                scrollbar={{
                    hide: true
                }}
                autoplay={{
                    delay: 1009038240,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Scrollbar]}
                className='mySwiper bg-green-50 md:h-[100vh] h-[442px] '
            >
                <SwiperSlide>
                    <div className=" w-full bg-image1 md:h-[100vh] h-[442px]  text-white  font-bold font-serif">
                        <div className='md:p-32 p-12 flex flex-col gap-6'>
                            <div className='md:text-2xl text-xl'>2020 Latest Collection</div>
                            <div className='md:text-6xl text-3xl'>-40% Offer All</div>
                            <div className='md:text-6xl text-3xl'> New Book</div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className=" w-full bg-image4 md:h-[100vh] h-[442px]    font-bold font-serif">
                        <div className='md:p-32 p-12 flex flex-col gap-6'>
                            <div className='md:text-2xl text-xl'>2020 Latest Collection</div>
                            <div className='md:text-6xl text-3xl'>-40% Offer All</div>
                            <div className='md:text-6xl text-3xl'> New Book</div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className=" w-full bg-image3 md:h-[100vh] h-[442px]  text-white  font-bold font-serif">
                        <div className='md:p-32 p-12 flex flex-col gap-6'>
                            <div className='md:text-2xl text-xl'>2020 Latest Collection</div>
                            <div className='md:text-6xl text-3xl'>-40% Offer All</div>
                            <div className='md:text-6xl text-3xl'> New Book</div>
                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    )
}

export default HeroSection
