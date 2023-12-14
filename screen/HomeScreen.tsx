import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Booking from '../pages/Booking';

const HomeStack = createNativeStackNavigator();
function HomeScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='Home' component={Home}></HomeStack.Screen>
            <HomeStack.Screen name='Booking' component={Booking}></HomeStack.Screen>
        </HomeStack.Navigator>
    )
}
export default HomeScreen