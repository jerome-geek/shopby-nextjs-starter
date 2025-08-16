import Link from 'next/link';

export default function Header() {
    return (
        <header className="w-full border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-xl font-bold hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        min's mall
                    </Link>
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="/"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* 데스크톱 메뉴 */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href="/mypage"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                            >
                                마이페이지
                            </Link>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                            >
                                로그인
                            </Link>
                            <Link
                                href="/cart"
                                className="relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                            >
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
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l1.5 1.5M13 19a1 1 0 11-2 0 1 1 0 012 0zM21 19a1 1 0 11-2 0 1 1 0 012 0z"
                                    />
                                </svg>
                                {/* 장바구니 아이템 수 표시 (예시) */}
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </Link>
                        </div>

                        {/* 모바일 메뉴 버튼 */}
                        <button className="md:hidden">☰</button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
