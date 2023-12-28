import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import SearchOrder from '../component/SearchComp/SearchOrder';
import WriteReview from '../component/WriteReview';
import SearchMenu from '../component/SearchComp/SearchMenu';
import Setting from '../pages/Setting';
import DetailPage from '../pages/DetailPage';
import Search from '../pages/Search';

const SearchStack = createNativeStackNavigator();
function SearchScreen() {
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }}>
            <SearchStack.Screen name='Search' component={Search}></SearchStack.Screen>
            <SearchStack.Screen name='SearchMenu' component={SearchMenu}></SearchStack.Screen>
            <SearchStack.Screen name='SearchOrder' component={SearchOrder}></SearchStack.Screen>
            <SearchStack.Screen name='DetailPage' component={DetailPage}></SearchStack.Screen>
            <SearchStack.Screen name='WriteReview' component={WriteReview}></SearchStack.Screen>
            <SearchStack.Screen name='Setting' component={Setting}></SearchStack.Screen>
        </SearchStack.Navigator>
    )
}
export default SearchScreen