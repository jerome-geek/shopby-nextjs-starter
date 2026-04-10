import SignInForm from '../../components/auth/SignInForm';
import PageMeta from '../../components/common/PageMeta';

const SignIn = () => {
    return (
        <>
            <PageMeta
                title='React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template'
                description='This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
            />

            <SignInForm />
        </>
    );
};

export default SignIn;
