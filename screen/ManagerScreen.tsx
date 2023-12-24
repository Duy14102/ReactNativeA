import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import CustomizeAdmin from '../component/AdminComp/CustomizeAdmin';
import EditAdminPass from '../component/AdminComp/EditAdminPass';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import DetailContact from '../component/ManagerComp/Dashboard/Contact/DetailContact';
import TotalEmpManager from '../component/ManagerComp/Dashboard/TotalEmployee/TotalEmpManager';
import DetailTotalEmpManager from '../component/ManagerComp/Dashboard/TotalEmployee/DetailTotalEmpManager';
import DetailTaskManager from '../component/ManagerComp/Dashboard/TotalEmployee/DetailTaskManager';
import ManagerMenu from '../pages/manager/ManagerMenu';
import DetailMenuManager from '../component/ManagerComp/Menu/DetailMenuManager';
import CreateMenuManager from '../component/ManagerComp/Menu/CreateMenuManager';
import SearchMenuManager from '../component/ManagerComp/Menu/SearchMenuManager';


const Stack = createNativeStackNavigator();
function Screen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ManagerDashboard' component={ManagerDashboard}></Stack.Screen>
            <Stack.Screen name='TotalEmpManager' component={TotalEmpManager}></Stack.Screen>
            <Stack.Screen name='DetailContact' component={DetailContact}></Stack.Screen>
            <Stack.Screen name='DetailTotalEmpManager' component={DetailTotalEmpManager}></Stack.Screen>
            <Stack.Screen name='DetailTaskManager' component={DetailTaskManager}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen2() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ManagerMenu' component={ManagerMenu}></Stack.Screen>
            <Stack.Screen name='DetailMenuManager' component={DetailMenuManager}></Stack.Screen>
            <Stack.Screen name='CreateMenuManager' component={CreateMenuManager}></Stack.Screen>
            <Stack.Screen name='SearchMenuManager' component={SearchMenuManager}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen3() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CustomizeAdmin' component={CustomizeAdmin}></Stack.Screen>
            <Stack.Screen name='EditAdminPass' component={EditAdminPass}></Stack.Screen>
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function ManagerScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#e820a5", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="ManagerPanels" component={Screen} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "Dashboard"
            }} />
            <Drawer.Screen name="ManagerMenus" component={Screen2} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "Menu management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Screen3} options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default ManagerScreen