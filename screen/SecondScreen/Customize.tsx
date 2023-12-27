import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const EditAdminPassLazy = lazy(() => import("../../component/AdminComp/EditAdminPass"))
const CustomizeAdminLazy = lazy(() => import("../../component/AdminComp/CustomizeAdmin"))

function Customize() {
    const Stack = createNativeStackNavigator();
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='CustomizeAdmin' component={CustomizeAdminLazy}></Stack.Screen>
                <Stack.Screen name='EditAdminPass' component={EditAdminPassLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}
export default Customize