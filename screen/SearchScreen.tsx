import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../pages/Search';
import DetailPage from '../pages/DetailPage';
import Setting from '../pages/Setting';
import SearchMenu from '../component/SearchComp/SearchMenu';
import WriteReview from '../component/WriteReview';

const SearchStack = createNativeStackNavigator();
function SearchScreen() {
    return (
        <SearchStack.Navigator screenOptions={{ headerShown: false }}>
            <SearchStack.Screen name='Search' component={Search}></SearchStack.Screen>
            <SearchStack.Screen name='SearchMenu' component={SearchMenu}></SearchStack.Screen>
            <SearchStack.Screen name='DetailPage' component={DetailPage}></SearchStack.Screen>
            <SearchStack.Screen name='WriteReview' component={WriteReview}></SearchStack.Screen>
            <SearchStack.Screen name='Setting' component={Setting}></SearchStack.Screen>
        </SearchStack.Navigator>
    )
}
export default SearchScreen