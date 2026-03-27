import { Route, BrowserRouter as Router, Routes } from 'react-router';

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
                    <Route path={PATHS.AUTH.LOGIN} element={<SignIn />} />

                    {/* Fallback Route */}
                    <Route path={PATHS.ERROR_400} element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}
