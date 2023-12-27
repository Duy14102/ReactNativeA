import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const DetailCartEmpLazy = lazy(() => import("../../component/EmpComp/Cart/DetailCartEmp"))
const EmployeeCartLazy = lazy(() => import("../../pages/employee/EmployeeCart"))
const FindCartEmpLazy = lazy(() => import("../../component/EmpComp/Cart/FindCartEmp"))

function AllCart() {
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
                <Stack.Screen name='EmployeeCart' component={EmployeeCartLazy}></Stack.Screen>
                <Stack.Screen name='DetailCartEmp' component={DetailCartEmpLazy}></Stack.Screen>
                <Stack.Screen name='FindCartEmp' component={FindCartEmpLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default AllCart