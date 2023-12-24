import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import CustomizeAdmin from '../component/AdminComp/CustomizeAdmin';
import EditAdminPass from '../component/AdminComp/EditAdminPass';
import EmployeeTask from '../pages/employee/EmployeeTask';
import EmployeeCart from '../pages/employee/EmployeeCart';
import EmployeeBooking from '../pages/employee/EmployeeBooking';
import EmployeeTable from '../pages/employee/EmployeeTable';
import TaskHandle from '../component/EmpComp/Task/TaskHandle';
import DetailCartEmp from '../component/EmpComp/Cart/DetailCartEmp';
import DetailBookEmp from '../component/EmpComp/Booking/DetailBookEmp';
import DetailTableEmp from '../component/EmpComp/Table/DetailTableEmp';
import AddTableItem from '../component/EmpComp/Table/AddTableItem';
import ChangeTableEmp from '../component/EmpComp/Table/ChangeTableEmp';
import DetailHistoryTable from '../component/EmpComp/Table/DetailHistoryTable';

const Stack = createNativeStackNavigator();
function Screen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmployeeTask' component={EmployeeTask}></Stack.Screen>
            <Stack.Screen name='TaskHandle' component={TaskHandle}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen2() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmployeeCart' component={EmployeeCart}></Stack.Screen>
            <Stack.Screen name='DetailCartEmp' component={DetailCartEmp}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen3() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmployeeBooking' component={EmployeeBooking}></Stack.Screen>
            <Stack.Screen name='DetailBookEmp' component={DetailBookEmp}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen4() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='EmployeeTable' component={EmployeeTable}></Stack.Screen>
            <Stack.Screen name='DetailTableEmp' component={DetailTableEmp}></Stack.Screen>
            <Stack.Screen name='AddTableItem' component={AddTableItem}></Stack.Screen>
            <Stack.Screen name='ChangeTableEmp' component={ChangeTableEmp}></Stack.Screen>
            <Stack.Screen name='DetailHistoryTable' component={DetailHistoryTable}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen5() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CustomizeAdmin' component={CustomizeAdmin}></Stack.Screen>
            <Stack.Screen name='EditAdminPass' component={EditAdminPass}></Stack.Screen>
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function EmployeeScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#e820a5", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="EmployeeTasks" component={Screen} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "Dashboard"
            }} />
            <Drawer.Screen name="EmployeeCarts" component={Screen2} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='cart-shopping' size={22} color={color} solid />
                ),
                title: "Cart Management"
            }} />
            <Drawer.Screen name="EmployeeBookings" component={Screen3} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='address-book' size={22} color={color} solid />
                ),
                title: "Booking Management"
            }} />
            <Drawer.Screen name="EmployeeTables" component={Screen4} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='bell-concierge' size={22} color={color} solid />
                ),
                title: "Table Management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Screen5} options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default EmployeeScreen