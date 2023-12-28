import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import Home from '../pages/Home';
const bookingLazy = lazy(() => import("../pages/Booking"))

const HomeStack = createNativeStackNavigator();
function HomeScreen() {
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name='Home' component={Home}></HomeStack.Screen>
                <HomeStack.Screen name='Booking' component={bookingLazy}></HomeStack.Screen>
            </HomeStack.Navigator>
        </Suspense>
    )
}
export default HomeScreen