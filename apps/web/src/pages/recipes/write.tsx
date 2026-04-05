import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { DefaultLayout } from '@/components/layout';

const RecipeWritePage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t('레시피 만들기')} | JollyPot</title>
            </Head>
            <div style={{ padding: '100px 0', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                    {t('레시피 직접 만들기')}
                </h1>
                <p style={{ color: '#666' }}>
                    {t('준비 중인 페이지입니다. 멋진 공사가 곧 시작됩니다!')}
                </p>
            </div>
        </>
    );
};

RecipeWritePage.getLayout = (page: React.ReactElement) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export default RecipeWritePage;
