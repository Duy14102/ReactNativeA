import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const EmployeeTaskLazy = lazy(() => import("../../pages/employee/EmployeeTask"))
const TaskHandleLazy = lazy(() => import("../../component/EmpComp/Task/TaskHandle"))

function EmpTask() {
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
                <Stack.Screen name='EmployeeTask' component={EmployeeTaskLazy}></Stack.Screen>
                <Stack.Screen name='TaskHandle' component={TaskHandleLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}
export default EmpTask