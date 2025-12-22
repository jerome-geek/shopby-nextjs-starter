import { product } from '@/api/product';

export default async function BestPage() {
    const data = await product.getBestSellerProducts().json();
    console.log('🚀 ~ BestPage ~ data:', data);

    return (
        <section>
            <h1>Best Products</h1>
            <ul>
                {data.items.map((item) => (
                    <li key={item.productNo}>{item.productName}</li>
                ))}
            </ul>
        </section>
    );
}
