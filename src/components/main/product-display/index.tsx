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

import { ErrorBoundary } from '@suspensive/react';
import { Suspense } from 'react';

import EventSection from '@/components/event/Section';
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
                    <div>
                        <div>브랜드1</div>
                        <div>브랜드2</div>
                        <div>브랜드3</div>
                    </div>
                    <div>
                        <div>아티클1</div>
                        <div>아티클2</div>
                    </div>
                    <EventSection eventId='MAIN_EVENT_01' />
                    <NewSection />
                    <Section index={1} />
                    <EventSection eventId='MAIN_EVENT_01' />
                    <Section index={2} />
                    <div>세일</div>
                    <div>
                        <div>브랜드1</div>
                        <div>브랜드2</div>
                        <div>브랜드3</div>
                    </div>
                    <div>
                        <div>브랜드1</div>
                        <div>브랜드2</div>
                        <div>브랜드3</div>
                    </div>
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
                    <div>브랜드1</div>
                    <div>아티클1</div>
                    <EventSection eventId='MAIN_EVENT_01' />
                    <NewSection />
                    <div>브랜드2</div>
                    <Section index={1} />
                    <EventSection eventId='MAIN_EVENT_01' />
                    <Section index={2} />
                    <div>아티클2</div>
                    <div>브랜드3</div>
                    <div>세일</div>
                    <div>브랜드4</div>
                    <div>브랜드5</div>
                    <div>브랜드6</div>
                    <div>브랜드7</div>
                    <div>브랜드8</div>
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
