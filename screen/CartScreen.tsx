import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../pages/Cart';

const CartStack = createNativeStackNavigator();
function CartScreen() {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen name='Cart' component={Cart}></CartStack.Screen>
        </CartStack.Navigator>
    )
}
export default CartScreen