import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
const ManagerMenuLazy = lazy(() => import("../../pages/manager/ManagerMenu"))
const DetailMenuManagerLazy = lazy(() => import("../../component/ManagerComp/Menu/DetailMenuManager"))
const CreateMenuManagerLazy = lazy(() => import("../../component/ManagerComp/Menu/CreateMenuManager"))
const SearchMenuManagerLazy = lazy(() => import("../../component/ManagerComp/Menu/SearchMenuManager"))

function MagMenu() {
    const Stack = createNativeStackNavigator();
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='ManagerMenu' component={ManagerMenuLazy}></Stack.Screen>
                <Stack.Screen name='DetailMenuManager' component={DetailMenuManagerLazy}></Stack.Screen>
                <Stack.Screen name='CreateMenuManager' component={CreateMenuManagerLazy}></Stack.Screen>
                <Stack.Screen name='SearchMenuManager' component={SearchMenuManagerLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default MagMenu