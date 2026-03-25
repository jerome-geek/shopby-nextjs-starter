import { Route, BrowserRouter as Router, Routes } from 'react-router';

import { ScrollToTop } from '@/components/common/ScrollToTop';
import { PATHS } from '@/const/paths';
import AppLayout from '@/layout/AppLayout';
import SignIn from '@/pages/AuthPages/SignIn';
import Home from '@/pages/Dashboard/Home';
import NotFound from '@/pages/OtherPage/NotFound';

export default function App() {
    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            path={PATHS.DASHBOARD}
                            element={<Home />}
                        />
                    </Route>

                    {/* Auth Layout */}
                    <Route path={PATHS.AUTH.LOGIN} element={<SignIn />} />

                    {/* Fallback Route */}
                    <Route path={PATHS.ERROR_400} element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
