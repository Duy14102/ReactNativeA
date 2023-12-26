import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import Customize from './SecondScreen/Customize';
import MagDash from './SecondScreen/MagDash';
import MagUI from './SecondScreen/MagUI';
import MagMenu from './SecondScreen/MagMenu';
import AllCart from './SecondScreen/AllCart';
import AllBook from './SecondScreen/AllBook';
import AllTable from './SecondScreen/AllTable';

const Drawer = createDrawerNavigator();
function ManagerScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#FEA116", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="ManagerPanels" component={MagDash} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "Dashboard"
            }} />
            <Drawer.Screen name="ManagerUIs" component={MagUI} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='palette' size={22} color={color} solid />
                ),
                title: "UI management"
            }} />
            <Drawer.Screen name="ManagerMenus" component={MagMenu} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='bowl-food' size={22} color={color} solid />
                ),
                title: "Menu management"
            }} />
            <Drawer.Screen name="ManagerCarts" component={AllCart} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='cart-shopping' size={22} color={color} solid />
                ),
                title: "Cart management"
            }} />
            <Drawer.Screen name="ManagerBookings" component={AllBook} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='address-book' size={22} color={color} solid />
                ),
                title: "Booking Management"
            }} />
            <Drawer.Screen name="ManagerTables" component={AllTable} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='bell-concierge' size={22} color={color} solid />
                ),
                title: "Table Management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Customize} options={{ lazy: true, drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default ManagerScreen