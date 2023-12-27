import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ManagerDashboard from '../../pages/manager/ManagerDashboard';
import SplashScreen from 'react-native-splash-screen';
const DetailContactLazy = lazy(() => import("../../component/ManagerComp/Dashboard/Contact/DetailContact"))
const TotalEmpManagerLazy = lazy(() => import("../../component/ManagerComp/Dashboard/TotalEmployee/TotalEmpManager"))
const DetailTotalEmpManagerLazy = lazy(() => import("../../component/ManagerComp/Dashboard/TotalEmployee/DetailTotalEmpManager"))
const DetailTaskManagerLazy = lazy(() => import("../../component/ManagerComp/Dashboard/TotalEmployee/DetailTaskManager"))

function MagDash() {
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
                <Stack.Screen name='ManagerDashboard' component={ManagerDashboard}></Stack.Screen>
                <Stack.Screen name='TotalEmpManager' component={TotalEmpManagerLazy}></Stack.Screen>
                <Stack.Screen name='DetailContact' component={DetailContactLazy}></Stack.Screen>
                <Stack.Screen name='DetailTotalEmpManager' component={DetailTotalEmpManagerLazy}></Stack.Screen>
                <Stack.Screen name='DetailTaskManager' component={DetailTaskManagerLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}
export default MagDash