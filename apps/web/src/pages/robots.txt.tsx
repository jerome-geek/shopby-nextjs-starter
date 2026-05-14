import type { GetServerSideProps } from 'next';

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const host = req.headers.host ?? '';
    const isVercelDomain = host.endsWith('.vercel.app');

    const body = isVercelDomain
        ? `User-agent: *
Allow: /
`
        : `User-agent: *
Disallow: /
`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.write(body);
    res.end();

    return {
        props: {},
    };
};

export default Robots;
