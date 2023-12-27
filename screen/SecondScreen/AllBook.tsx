import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const EmployeeBookingLazy = lazy(() => import("../../pages/employee/EmployeeBooking"))
const DetailBookEmpLazy = lazy(() => import("../../component/EmpComp/Booking/DetailBookEmp"))
const FindBookingEmpLazy = lazy(() => import("../../component/EmpComp/Booking/FindBookingEmp"))

function AllBook() {
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
                <Stack.Screen name='EmployeeBooking' component={EmployeeBookingLazy}></Stack.Screen>
                <Stack.Screen name='DetailBookEmp' component={DetailBookEmpLazy}></Stack.Screen>
                <Stack.Screen name='FindBookingEmp' component={FindBookingEmpLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default AllBook