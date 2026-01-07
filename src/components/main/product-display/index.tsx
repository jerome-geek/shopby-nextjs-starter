// import { ErrorBoundary } from '@suspensive/react';
// import { Suspense } from 'react';

// import Section from '@/components/main/product-display/Section';
// import SectionList from '@/components/main/product-display/SectionList';
// import { MainPageLayout } from '@/config/mainPageLayouts';

// interface ProductDisplayProps {
//     layout: MainPageLayout;
// }

// const ProductDisplaySection = async ({ layout }: ProductDisplayProps) => {
//     const desktopSections = layout.desktop.sections.map((section) => (
//         <ErrorBoundary key={section.id} fallback={<div>Error</div>}>
//             <Suspense fallback={null}>
//                 <Section sectionId={section.sectionId} />
//             </Suspense>
//         </ErrorBoundary>
//     ));

//     const mobileSections = layout.mobile.sections.map((section) => (
//         <ErrorBoundary key={section.id} fallback={<div>Error</div>}>
//             <Suspense fallback={null}>
//                 <Section sectionId={section.sectionId} />
//             </Suspense>
//         </ErrorBoundary>
//     ));

//     return (
//         <SectionList
//             desktopSections={desktopSections}
//             mobileSections={mobileSections}
//         />
//     );
// };

// export default ProductDisplaySection;

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { ErrorBoundary } from '@suspensive/react';
import { Suspense } from 'react';

import BrandSection from '@/components/brand/Section';
import SectionList from '@/components/main/product-display/SectionList';
import BestSection from '@/components/product/Best/Section';
import Section from '@/components/product/display-section/Section';
import NewSection from '@/components/product/new/Section';

const ProductDisplaySection = async () => {
    const desktopSections = () => {
        return (
            <ErrorBoundary fallback={<div>Error</div>}>
                <Suspense fallback={null}>
                    <Section index={0} />
                    <BestSection />
                    <section
                        className={css({
                            display: 'flex',
                            gap: token('spacing.6'),
                        })}
                    >
                        <BrandSection index={0} />
                        <BrandSection index={1} />
                        <BrandSection index={2} />
                    </section>
                    <div>
                        <div>아티클1</div>
                        <div>아티클2</div>
                    </div>
                    <div>기획전</div>
                    <NewSection />
                    <Section index={1} />
                    <div>기획전</div>
                    <Section index={2} />
                    <div>세일</div>
                    <section
                        className={css({
                            display: 'flex',
                            gap: token('spacing.6'),
                        })}
                    >
                        <BrandSection index={0} />
                        <BrandSection index={1} />
                        <BrandSection index={2} />
                    </section>
                    <section
                        className={css({
                            display: 'flex',
                            gap: token('spacing.6'),
                        })}
                    >
                        <BrandSection index={0} />
                        <BrandSection index={1} />
                        <BrandSection index={2} />
                    </section>
                    <div>
                        <div>아티클1</div>
                        <div>아티클2</div>
                        <div>아티클3</div>
                        <div>아티클4</div>
                    </div>
                </Suspense>
            </ErrorBoundary>
        );
    };

    const mobileSections = () => {
        return (
            <ErrorBoundary fallback={<div>Error</div>}>
                <Suspense fallback={null}>
                    <Section index={0} />
                    <BestSection />
                    <BrandSection index={0} />
                    <div>아티클1</div>
                    <div>기획전</div>
                    <NewSection />
                    <BrandSection index={1} />
                    <Section index={1} />
                    <div>기획전</div>
                    <Section index={2} />
                    <div>아티클2</div>
                    <BrandSection index={2} />
                    <div>세일</div>
                    <BrandSection index={3} />
                    <BrandSection index={0} />
                    <BrandSection index={1} />
                    <BrandSection index={2} />
                    <BrandSection index={3} />
                    <div>아티클3</div>
                    <div>아티클4</div>
                    <div>아티클5</div>
                    <div>아티클6</div>
                </Suspense>
            </ErrorBoundary>
        );
    };

    return (
        <SectionList
            desktopSections={desktopSections()}
            mobileSections={mobileSections()}
        />
    );
};
export default ProductDisplaySection;
