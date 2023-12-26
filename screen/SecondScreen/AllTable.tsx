import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
const EmployeeTableLazy = lazy(() => import("../../pages/employee/EmployeeTable"))
const DetailTableEmpLazy = lazy(() => import("../../component/EmpComp/Table/DetailTableEmp"))
const AddTableItemLazy = lazy(() => import("../../component/EmpComp/Table/AddTableItem"))
const ChangeTableEmpLazy = lazy(() => import("../../component/EmpComp/Table/ChangeTableEmp"))
const DetailHistoryTableLazy = lazy(() => import("../../component/EmpComp/Table/DetailHistoryTable"))

function AllTable() {
    const Stack = createNativeStackNavigator();
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='EmployeeTable' component={EmployeeTableLazy}></Stack.Screen>
                <Stack.Screen name='DetailTableEmp' component={DetailTableEmpLazy}></Stack.Screen>
                <Stack.Screen name='AddTableItem' component={AddTableItemLazy}></Stack.Screen>
                <Stack.Screen name='ChangeTableEmp' component={ChangeTableEmpLazy}></Stack.Screen>
                <Stack.Screen name='DetailHistoryTable' component={DetailHistoryTableLazy}></Stack.Screen>
            </Stack.Navigator>
        </Suspense>
    )
}

export default AllTable