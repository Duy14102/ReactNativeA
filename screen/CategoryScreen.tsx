import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import DetailPage from '../pages/DetailPage';
import WriteReview from '../component/WriteReview';
import Category from '../pages/Category';
import Setting from '../pages/Setting';

const CategoryStack = createNativeStackNavigator();
function CategoryScreen() {
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
            <CategoryStack.Screen name='Category' component={Category}></CategoryStack.Screen>
            <CategoryStack.Screen name='DetailPage' component={DetailPage}></CategoryStack.Screen>
            <CategoryStack.Screen name='WriteReview' component={WriteReview}></CategoryStack.Screen>
            <CategoryStack.Screen name='Setting' component={Setting}></CategoryStack.Screen>
        </CategoryStack.Navigator>
    )
}
export default CategoryScreen