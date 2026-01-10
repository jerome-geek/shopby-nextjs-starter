import { getTranslation } from '@/i18n/server';

export default async function NotFound() {
    const { t } = await getTranslation();

    return <div>{t('카테고리를 찾을 수 없습니다.')}</div>;
}
