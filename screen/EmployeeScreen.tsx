import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import AllCart from './SecondScreen/AllCart';
import AllBook from './SecondScreen/AllBook';
import AllTable from './SecondScreen/AllTable';
import Customize from './SecondScreen/Customize';
import EmpTask from './SecondScreen/EmpTask';

const Drawer = createDrawerNavigator();
function EmployeeScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#FEA116", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="EmployeeTasks" component={EmpTask} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "Dashboard"
            }} />
            <Drawer.Screen name="EmployeeCarts" component={AllCart} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='cart-shopping' size={22} color={color} solid />
                ),
                title: "Cart Management"
            }} />
            <Drawer.Screen name="EmployeeBookings" component={AllBook} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='address-book' size={22} color={color} solid />
                ),
                title: "Booking Management"
            }} />
            <Drawer.Screen name="EmployeeTables" component={AllTable} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='bell-concierge' size={22} color={color} solid />
                ),
                title: "Table Management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Customize} options={{ lazy: true, drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default EmployeeScreen