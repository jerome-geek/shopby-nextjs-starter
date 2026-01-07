import { getCachedEventById } from '@/api/display/event.server';
import ArticleSectionItem from '@/components/article/SectionItem';

interface ArticleSectionProps {
    articleId: string;
}

const ArticleSection = async ({ articleId }: ArticleSectionProps) => {
    try {
        const eventData = await getCachedEventById(articleId);

        return <ArticleSectionItem events={eventData} />;
    } catch (error) {
        console.error('ArticleSection 오류 발생', error);
        return null;
    }
};

export default ArticleSection;
