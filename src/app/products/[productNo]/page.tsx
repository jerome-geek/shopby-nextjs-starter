export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ productNo: string }>;
}) {
    const { productNo } = await params;

    return <div>ProductDetailPage: {productNo}</div>;
}
