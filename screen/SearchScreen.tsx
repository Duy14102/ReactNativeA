import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
const searchLazy = lazy(() => import("../pages/Search"))
const detailPageLazy = lazy(() => import("../pages/DetailPage"))
const settingLazy = lazy(() => import("../pages/Setting"))
const searchMenuLazy = lazy(() => import("../component/SearchComp/SearchMenu"))
const writeReviewLazy = lazy(() => import("../component/WriteReview"))
const searchOrderLazy = lazy(() => import("../component/SearchComp/SearchOrder"))

const SearchStack = createNativeStackNavigator();
function SearchScreen() {
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <SearchStack.Navigator screenOptions={{ headerShown: false }}>
                <SearchStack.Screen name='Search' component={searchLazy}></SearchStack.Screen>
                <SearchStack.Screen name='SearchMenu' component={searchMenuLazy}></SearchStack.Screen>
                <SearchStack.Screen name='SearchOrder' component={searchOrderLazy}></SearchStack.Screen>
                <SearchStack.Screen name='DetailPage' component={detailPageLazy}></SearchStack.Screen>
                <SearchStack.Screen name='WriteReview' component={writeReviewLazy}></SearchStack.Screen>
                <SearchStack.Screen name='Setting' component={settingLazy}></SearchStack.Screen>
            </SearchStack.Navigator>
        </Suspense>
    )
}
export default SearchScreen