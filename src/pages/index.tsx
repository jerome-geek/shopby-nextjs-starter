import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';

import { HeroBanner } from '@/components/hero-banner';
import * as styles from '@/styles/Home.css';
import IconBanner from '@/components/banner/icon';
import { Suspense } from 'react';
import TimeSale from '@/components/section/timeSale';
import Best from '@/components/section/best';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function Home() {
    return (
        <>
            <Head>
                <title>Wannamake</title>
                <meta
                    name="description"
                    content="Welcome to our online store"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
            >
                {/* Full-width HeroBanner */}
                <HeroBanner />

                <Suspense>
                    <IconBanner />
                </Suspense>

                <TimeSale />

                <Best />

                {/* <ProductSection /> */}

                {/* Max-width container for main content */}
                <section className={styles.main}>
                    <Image
                        className={styles.logo}
                        src="/next.svg"
                        alt="Next.js logo"
                        width={100}
                        height={20}
                        priority
                    />
                    <div className={styles.intro}>
                        <p>
                            Looking for a starting point or more instructions?
                            Head over to{' '}
                            <a
                                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Templates
                            </a>{' '}
                            or the{' '}
                            <a
                                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learning
                            </a>{' '}
                            center.
                        </p>
                    </div>
                    <div className={styles.ctas}>
                        <a
                            className={styles.primary}
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                className={styles.logo}
                                src="/vercel.svg"
                                alt="Vercel logomark"
                                width={16}
                                height={16}
                            />
                            Deploy Now
                        </a>
                        <a
                            className={styles.secondary}
                            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Documentation
                        </a>
                    </div>
                    <div
                        style={{
                            marginTop: '40px',
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Link
                            href="/products/new"
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#0070f3',
                                color: 'white',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            New Products (Skeleton Demo)
                        </Link>
                        <Link
                            href="/products/best"
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#10b981',
                                color: 'white',
                                borderRadius: '5px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Best Products (Skeleton Demo)
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
