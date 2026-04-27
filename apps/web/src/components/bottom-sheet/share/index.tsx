import ShareContent from '@/components/layer-contents/share';
import type { DefaultBottomSheetProps } from '@/components/layout';
import { BottomSheetLayout } from '@/components/layout';

type ShareBottomSheetProps = DefaultBottomSheetProps;

const ShareBottomSheet = ({ ...props }: ShareBottomSheetProps) => {
    return (
        <BottomSheetLayout {...props} title='공유하기'>
            <ShareContent />
        </BottomSheetLayout>
    );
};

export default ShareBottomSheet;
