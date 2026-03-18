import { AuthLayout } from '@/components/layout/AuthLayout';
import { NextPageWithLayout } from '@/pages/_app';

const SignupComplete: NextPageWithLayout = () => {
    return <div>SignupComplete</div>;
};

SignupComplete.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default SignupComplete;
