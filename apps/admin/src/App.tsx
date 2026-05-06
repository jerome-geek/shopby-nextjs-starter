import { pipe, some, values } from '@fxts/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import { OverlayProvider, useOverlayData } from 'overlay-kit';
import { useEffect, useState } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from 'react-router';
import { Toaster } from 'sonner';
import { useScrollLock } from 'usehooks-ts';

import { PATHS } from '@/const/paths';
import { useAxiosInterceptor } from '@/hooks/utils';
import AppLayout from '@/layout/AppLayout';
import AuthLayout from '@/pages/AuthPages/AuthPageLayout';
import SignIn from '@/pages/AuthPages/SignIn';
import CollectionGroupDetail from '@/pages/CollectionGroup/CollectionGroupDetail';
import CollectionGroupList from '@/pages/CollectionGroup/CollectionGroupList';
import Home from '@/pages/Dashboard/Home';
import NotFound from '@/pages/OtherPage/NotFound';
import RecipeGroupDetail from '@/pages/RecipeGroup/RecipeGroupDetail';
import RecipeGroupList from '@/pages/RecipeGroup/RecipeGroupList';
import RecipeSettings from '@/pages/RecipeSettings/RecipeSettings';
import CommentList from '@/pages/Comment/CommentList';
import CommentBlacklist from '@/pages/Comment/CommentBlacklist';
import UserCollectionDetail from '@/pages/UserCollection/UserCollectionDetail';
import UserCollections from '@/pages/UserCollection/UserCollections';
import UserRecipeDetail from '@/pages/UserRecipe/UserRecipeDetail';
import UserRecipeList from '@/pages/UserRecipe/UserRecipeList';

export default function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false,
                        refetchOnMount: true,
                        refetchOnReconnect: true,
                        retry: (failureCount, error) => {
                            if (import.meta.env.DEV) {
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
                        <Settings />
                        <Routes>
                            {/* Dashboard Layout */}
                            <Route element={<AppLayout />}>
                                <Route
                                    index
                                    path={PATHS.DASHBOARD}
                                    element={<Home />}
                                />
                                <Route
                                    path={PATHS.APP.RECIPE_SETTINGS}
                                    element={<RecipeSettings />}
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
                                <Route
                                    path={PATHS.APP.COMMENT.LIST}
                                    element={<CommentList />}
                                />
                                <Route
                                    path={PATHS.APP.COMMENT.BLACKLIST}
                                    element={<CommentBlacklist />}
                                />

                                {/* Fallback Route */}
                                <Route
                                    path={PATHS.ERROR_400}
                                    element={<NotFound />}
                                />
                            </Route>

                            {/* Auth Layout */}
                            <Route element={<AuthLayout />}>
                                <Route
                                    path={PATHS.AUTH.LOGIN}
                                    element={<SignIn />}
                                />
                            </Route>
                        </Routes>

                        <Toaster
                            richColors
                            position='bottom-center'
                            duration={1500}
                        />
                    </Router>
                </AxiosInterceptor>
            </OverlayProvider>
        </QueryClientProvider>
    );
}

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useAxiosInterceptor();

    if (!isLoading) {
        return null;
    }

    return children;
};

const Settings = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    const overlayData = useOverlayData();

    const isOverlayOpen = pipe(
        overlayData,
        values,
        some((item) => item.isOpen),
    );

    useScrollLock({
        autoLock: isOverlayOpen,
    });

    return null;
};
