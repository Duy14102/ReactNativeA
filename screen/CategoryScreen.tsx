import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
const detailPageLazy = lazy(() => import("../pages/DetailPage"))
const categoryLazy = lazy(() => import("../pages/Category"))
const settingLazy = lazy(() => import("../pages/Setting"))
const writeReviewLazy = lazy(() => import("../component/WriteReview"))

const CategoryStack = createNativeStackNavigator();
function CategoryScreen() {
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
                <CategoryStack.Screen name='Category' component={categoryLazy}></CategoryStack.Screen>
                <CategoryStack.Screen name='DetailPage' component={detailPageLazy}></CategoryStack.Screen>
                <CategoryStack.Screen name='WriteReview' component={writeReviewLazy}></CategoryStack.Screen>
                <CategoryStack.Screen name='Setting' component={settingLazy}></CategoryStack.Screen>
            </CategoryStack.Navigator>
        </Suspense>
    )
}
export default CategoryScreen