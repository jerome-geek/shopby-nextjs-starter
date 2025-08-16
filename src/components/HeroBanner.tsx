'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface BannerSlide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    link?: string;
    buttonText?: string;
}

const bannerSlides: BannerSlide[] = [
    {
        id: 1,
        image: '/hero-banner-1.jpg',
        title: '새로운 컬렉션',
        subtitle: '2024 Spring Collection',
        link: '/collection/spring',
        buttonText: '컬렉션 보기',
    },
    {
        id: 2,
        image: '/hero-banner-2.jpg',
        title: '특별 할인',
        subtitle: '최대 50% 할인 혜택',
        link: '/sale',
        buttonText: '할인 상품 보기',
    },
    {
        id: 3,
        image: '/hero-banner-3.jpg',
        title: '신상품 출시',
        subtitle: '트렌디한 새로운 아이템',
        link: '/new-arrivals',
        buttonText: '신상품 보기',
    },
];

export default function HeroBanner() {
    return (
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet-custom',
                    bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                loop={true}
                className="h-full"
            >
                {bannerSlides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* 배경 이미지 */}
                        <div className="relative w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                            {/* 실제 이미지가 없을 때의 플레이스홀더 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                        <span className="text-4xl">🖼️</span>
                                    </div>
                                    <p className="text-sm">
                                        Banner Image {slide.id}
                                    </p>
                                </div>
                            </div>

                            {/* 오버레이 */}
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                            {/* 콘텐츠 */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white px-4 max-w-4xl">
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg md:text-xl lg:text-2xl mb-8 animate-fade-in-up animation-delay-200">
                                        {slide.subtitle}
                                    </p>
                                    {slide.buttonText && slide.link && (
                                        <a
                                            href={slide.link}
                                            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 animate-fade-in-up animation-delay-400"
                                        >
                                            {slide.buttonText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 커스텀 네비게이션 버튼 */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* 커스텀 페이지네이션 스타일 */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 20px !important;
                }

                .swiper-pagination-bullet-custom {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    margin: 0 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .swiper-pagination-bullet-active-custom {
                    background: white;
                    transform: scale(1.2);
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
