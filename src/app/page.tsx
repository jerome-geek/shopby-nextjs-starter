import Image from 'next/image';
import PopupWrapper from '@/components/PopupWrapper';
import HeroBanner from '@/components/HeroBanner';

export default function Home() {
    return (
        <div>
            {/* Hero Banner Section */}
            <HeroBanner />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />

                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Welcome to Next.js!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Get started by editing src/app/page.tsx
                        </p>
                    </div>

                    <div className="flex gap-4 items-center flex-col sm:flex-row">
                        <a
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            href="https://vercel.com/new"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Deploy now
                        </a>

                        <a
                            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            href="https://nextjs.org/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read our docs
                        </a>
                    </div>
                </div>

                {/* Suspense와 ErrorBoundary로 감싸진 팝업 */}
                {/* <PopupWrapper
                    title="알림"
                    checkCondition="notification"
                    triggerCondition={true}
                >
                    <p className="mb-4">
                        React Query의 suspenseQuery를 사용한 팝업입니다.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        API 호출 중에는 스켈레톤 UI가 표시되고,
                        <br />
                        오류 발생 시 에러 바운더리가 처리합니다.
                    </p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            확인
                        </button>
                    </div>
                </PopupWrapper> */}
            </div>
        </div>
    );
}
