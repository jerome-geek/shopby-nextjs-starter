import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from 'overlay-kit';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { HttpStatusCode, isAxiosError } from 'axios';

import { ScrollToTop } from '@/components/common/ScrollToTop';
import { PATHS } from '@/const/paths';
import AppLayout from '@/layout/AppLayout';
import SignIn from '@/pages/AuthPages/SignIn';
import Home from '@/pages/Dashboard/Home';
import CollectionGroupList from '@/pages/CollectionGroup/CollectionGroupList';
import CollectionGroupDetail from '@/pages/CollectionGroup/CollectionGroupDetail';
import RecipeGroupList from '@/pages/RecipeGroup/RecipeGroupList';
import RecipeGroupDetail from '@/pages/RecipeGroup/RecipeGroupDetail';
import UserCollections from '@/pages/UserCollection/UserCollections';
import UserCollectionDetail from '@/pages/UserCollection/UserCollectionDetail';
import UserRecipeList from '@/pages/UserRecipe/UserRecipeList';
import UserRecipeDetail from '@/pages/UserRecipe/UserRecipeDetail';
import NotFound from '@/pages/OtherPage/NotFound';
import AuthLayout from '@/pages/AuthPages/AuthPageLayout';
import { useAxiosInterceptor } from '@/hooks/utils';

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useAxiosInterceptor();

    if (!isLoading) {
        return null;
    }

    return children;
};

export default function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: import.meta.env.PROD,
                        refetchOnMount: import.meta.env.PROD,
                        refetchOnReconnect: true,
                        retry: (failureCount, error) => {
                            if (process.env.NODE_ENV === 'development') {
                                return false;
                            }

                            if (
                                isAxiosError(error) &&
                                error.response?.status ===
                                    HttpStatusCode.BadRequest
                            ) {
                                return false;
                            }

                            if (
                                error.name === 'AbortError' ||
                                error.name === 'CanceledError'
                            ) {
                                return false;
                            }

                            return failureCount < 3;
                        },
                    },
                    mutations: { throwOnError: false },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <OverlayProvider>
                <AxiosInterceptor>
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
                                <Route
                                    path={PATHS.APP.COLLECTION_GROUP.LIST}
                                    element={<CollectionGroupList />}
                                />
                                <Route
                                    path={PATHS.APP.COLLECTION_GROUP.DETAIL}
                                    element={<CollectionGroupDetail />}
                                />
                                <Route
                                    path={PATHS.APP.RECIPE_GROUP.LIST}
                                    element={<RecipeGroupList />}
                                />
                                <Route
                                    path={PATHS.APP.RECIPE_GROUP.DETAIL}
                                    element={<RecipeGroupDetail />}
                                />
                                <Route
                                    path={PATHS.APP.USER_COLLECTION.LIST}
                                    element={<UserCollections />}
                                />
                                <Route
                                    path={PATHS.APP.USER_COLLECTION.DETAIL}
                                    element={<UserCollectionDetail />}
                                />
                                <Route
                                    path={PATHS.APP.USER_RECIPE.LIST}
                                    element={<UserRecipeList />}
                                />
                                <Route
                                    path={PATHS.APP.USER_RECIPE.DETAIL}
                                    element={<UserRecipeDetail />}
                                />
                            </Route>

                            {/* Auth Layout */}
                            <Route element={<AuthLayout />}>
                                <Route
                                    path={PATHS.AUTH.LOGIN}
                                    element={<SignIn />}
                                />
                            </Route>

                            {/* Fallback Route */}
                            <Route
                                path={PATHS.ERROR_400}
                                element={<NotFound />}
                            />
                        </Routes>
                    </Router>
                </AxiosInterceptor>
            </OverlayProvider>
        </QueryClientProvider>
    );
}
