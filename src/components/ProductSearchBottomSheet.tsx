import BottomSheetLayout, {
    DefaultBottomSheetProps,
} from '@/components/layout/bottomSheet';

export function ProductSearchBottomSheet(props: DefaultBottomSheetProps) {
    return (
        <BottomSheetLayout {...props} type="partial">
            test
        </BottomSheetLayout>
    );
}
