import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const UImanagerLazy = lazy(() => import("../../pages/manager/UImanager"))

function MagUI() {
    const Stack = createNativeStackNavigator();
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <Suspense fallback={<ActivityIndicator size={40} color={"#FEA116"} />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='UImanager' component={UImanagerLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default MagUI