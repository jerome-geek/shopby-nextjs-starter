import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import * as styles from './index.css';

interface PhotoReviewProps {
    images?: { url: string }[];
}

export default function PhotoReview({ images }: PhotoReviewProps) {
    const defaultImages = [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop',
    ];

    const reviews = [
        {
            id: 1,
            rating: 5,
            text: '정말 마음에 들어요!',
            imageUrl: images?.[0]?.url || defaultImages[0],
        },
        {
            id: 2,
            rating: 5,
            text: '품질이 좋습니다',
            imageUrl: images?.[1]?.url || defaultImages[1],
        },
        {
            id: 3,
            rating: 4,
            text: '배송이 빨라서 좋아요 상품도 추천합...',
            imageUrl: images?.[2]?.url || defaultImages[2],
        },
        {
            id: 4,
            rating: 5,
            text: '가격대비 만족스러운 상품입니다',
            imageUrl: images?.[3]?.url || defaultImages[3],
        },
        {
            id: 5,
            rating: 5,
            text: '색상이 화면과 같아서 이뻐요',
            imageUrl: images?.[4]?.url || defaultImages[4],
        },
    ].slice(0, 5); // 최대 5개 노출

    return (
        <div className={styles.photoReviewSection}>
            <h2 className={styles.photoReviewTitle}>사진 리뷰</h2>
            <div className={styles.photoReviewList}>
                <Swiper
                    slidesPerView={3.2}
                    spaceBetween={12}
                    style={{ padding: '0 20px' }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 12,
                        },
                    }}
                >
                    {reviews.map((review) => (
                        <SwiperSlide
                            key={review.id}
                            className={styles.photoReviewItem}
                        >
                            <img
                                src={review.imageUrl}
                                alt="리뷰 이미지"
                                className={styles.photoReviewImage}
                            />
                            <div className={styles.photoReviewRating}>
                                <Star
                                    size={14}
                                    fill="#E2808F"
                                    stroke="#E2808F"
                                />
                                <span>{review.rating}</span>
                            </div>
                            <p className={styles.photoReviewText}>
                                {review.text}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
