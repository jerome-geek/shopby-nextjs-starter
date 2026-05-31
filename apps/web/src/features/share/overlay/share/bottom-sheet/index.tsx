import ShareContent from '@/features/share/overlay/share/content';
import type { KakaoShareContent } from '@/features/share';
import type { DefaultBottomSheetProps } from '@/shared/components/layout';
import { BottomSheetLayout } from '@/shared/components/layout';

interface ShareBottomSheetProps extends DefaultBottomSheetProps {
    kakao?: KakaoShareContent;
}

const ShareBottomSheet = ({ kakao, ...props }: ShareBottomSheetProps) => {
    return (
        <BottomSheetLayout {...props} title='공유하기'>
            <ShareContent kakao={kakao} />
        </BottomSheetLayout>
    );
};

export default ShareBottomSheet;
