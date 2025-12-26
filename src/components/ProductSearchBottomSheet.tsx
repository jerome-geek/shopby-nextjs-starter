import BottomSheetLayout, {
    DefaultBottomSheetProps,
} from '@/components/BottomSheetLayout';

export function ProductSearchBottomSheet(props: DefaultBottomSheetProps) {
    return (
        <BottomSheetLayout {...props} type="partial">
            test
        </BottomSheetLayout>
    );
}
