import { Layout } from '@/components/layout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { NextPageWithLayout } from '@/pages/_app';

const SignupComplete: NextPageWithLayout = () => {
    return <div>SignupComplete</div>;
};

SignupComplete.getLayout = (page) => {
    return (
        <Layout>
            <AuthLayout>{page}</AuthLayout>
        </Layout>
    );
};

export default SignupComplete;
