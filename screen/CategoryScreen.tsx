import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailPage from '../pages/DetailPage';
import WriteReview from '../component/WriteReview';
import Category from '../pages/Category';

const CategoryStack = createNativeStackNavigator();
function CategoryScreen() {
    return (
        <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
            <CategoryStack.Screen name='Category' component={Category}></CategoryStack.Screen>
            <CategoryStack.Screen name='DetailPage' component={DetailPage}></CategoryStack.Screen>
            <CategoryStack.Screen name='WriteReview' component={WriteReview}></CategoryStack.Screen>
        </CategoryStack.Navigator>
    )
}
export default CategoryScreen