import Link from 'next/link';

const RecipeSection = () => {
    return (
        <section>
            <div>
                <div>
                    <h3>반찬 따라 만들기</h3>
                    <p>매일 먹어도 질리지 않는 반찬</p>
                </div>

                <Link href="/recipe">자세히보기</Link>
            </div>

            <ul></ul>
        </section>
    );
};

export default RecipeSection;
