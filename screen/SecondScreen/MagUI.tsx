import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
const UImanagerLazy = lazy(() => import("../../pages/manager/UImanager"))

function MagUI() {
    const Stack = createNativeStackNavigator();
    return (
        <Suspense fallback={<ActivityIndicator size={40} color={"#FEA116"} />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='UImanager' component={UImanagerLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default MagUI