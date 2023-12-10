import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

import './Banner.css'
import axios from 'axios';


const Banner = () => {

    const [i, setI] = useState([]);

    const [currentImage, setCurrentImage] = useState(null);
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        axios.get('https://online-group-study-server-three.vercel.app/assignmentsImages')
            .then(data => {
                setI(data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    useEffect(() => {
        setCurrentImage('https://i.ibb.co/d4Mf2YG/assignment-1.jpg');
    }, []);

    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex;
        setCurrentImage(i[currentIndex].photoUrl);
    };

    const handleSlideClick = (index) => {
        if (swiper) {
            swiper.slideTo(index);
        }
    };


    return (
        <div className='relative mt-6'>
            <img src={currentImage} alt="Background Image" className="w-full h-[450px] md:h-[550px] object-cover" />
            <div className="absolute inset-0 bg-white opacity-60 h-[450px] md:h-[550px]"></div>
            <div className='absolute inset-0 flex flex-col-reverse md:flex-row justify-center items-center'>
                <div className='w-2/5 text-center'>
                    <button className='text-xl btn btn-neutral'>ASSIGNMENTS</button>
                </div>
                <div className='w-3/5'>
                    <Swiper
                        onSlideChange={handleSlideChange}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        // loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                        onSwiper={(swiper) => setSwiper(swiper)}
                    >
                        {i.map((image, index) => (
                            <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
                                <img src={image.photoUrl} alt={`Slide ${index + 1}`} />
                                <h2 className='text-black text-lg font-medium text-center'>{image.title}</h2>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;