import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const adminPanelLazy = lazy(() => import("../../pages/admin/AdminPanel"))
const detailUserLazy = lazy(() => import("../../component/AdminComp/DetailUser"))
const searchUserLazy = lazy(() => import("../../component/AdminComp/SearchUser"))
const createAccountLazy = lazy(() => import("../../component/AdminComp/CreateAccount"))

function UserManage() {
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
                <Stack.Screen name='AdminPanel' component={adminPanelLazy}></Stack.Screen>
                <Stack.Screen name='DetailUser' component={detailUserLazy}></Stack.Screen>
                <Stack.Screen name='SearchUser' component={searchUserLazy}></Stack.Screen>
                <Stack.Screen name='CreateAccount' component={createAccountLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default UserManage