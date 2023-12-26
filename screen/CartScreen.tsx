import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
const cartLazy = lazy(() => import("../pages/Cart"))

const CartStack = createNativeStackNavigator();
function CartScreen() {
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <CartStack.Navigator screenOptions={{ headerShown: false }}>
                <CartStack.Screen name='Cart' component={cartLazy}></CartStack.Screen>
            </CartStack.Navigator>
        </Suspense>
    )
}
export default CartScreen