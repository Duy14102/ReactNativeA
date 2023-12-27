import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
const cartLazy = lazy(() => import("../pages/Cart"))
import SplashScreen from 'react-native-splash-screen'

const CartStack = createNativeStackNavigator();
function CartScreen() {
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <CartStack.Navigator screenOptions={{ headerShown: false }}>
                <CartStack.Screen name='Cart' component={cartLazy}></CartStack.Screen>
            </CartStack.Navigator>
        </Suspense>
    )
}
export default CartScreen