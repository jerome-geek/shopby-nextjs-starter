export default function Footer() {
    return (
        <footer className="w-full bg-gray-50 dark:bg-gray-900 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 회사 정보 */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">min's mall</h2>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex gap-4">
                                <span>회사소개</span>
                                <span>이용약관</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                    개인정보처리방침
                                </span>
                            </div>
                            <p>
                                대표자명 : 김희수 · 주소 : 서울특별시 구로구
                                디지털로26길 72(구로동) 3
                            </p>
                            <p>대표전화번호 : 010-7720-9615</p>
                            <p>이메일 : heesu-kim@nhn-commerce.com</p>
                            <p>
                                사업자등록번호 : 120-86-46911 [사업자정보확인]
                            </p>
                            <p>
                                통신판매업신고번호 : 13213151515 ·
                                개인정보보호책임자 : 김희수
                            </p>
                            <p>호스팅제공 : 엔에이치엔커머스(주)</p>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-medium">
                                Copyright © 2024 min's mall all rights reserved.
                            </p>
                        </div>
                        {/* KCP 로고 */}
                        <div className="mt-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                    KCP
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 고객지원 */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            고객지원
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-bold text-lg">1:1문의</p>
                            <div>
                                <p>FAQ</p>
                                <p>상품문의</p>
                                <p>상품후기</p>
                            </div>
                        </div>
                    </div>

                    {/* CS CENTER & BANK INFO */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            CS CENTER
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-bold">1588-2541</p>
                            <p>yoomi-lee@nhn-commerce.com</p>
                        </div>

                        <h3 className="font-semibold mb-4 mt-6 text-gray-900 dark:text-gray-100">
                            BANK INFO
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>산업은행 101010101010 (예금주: 이유미)</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
