import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import AdminPanel from '../pages/admin/AdminPanel';
import CustomizeAdmin from '../component/AdminComp/CustomizeAdmin';
import DetailUser from '../component/AdminComp/DetailUser';
import SearchUser from '../component/AdminComp/SearchUser';
import EditAdminPass from '../component/AdminComp/EditAdminPass';
import CreateAccount from '../component/AdminComp/CreateAccount';

const Stack = createNativeStackNavigator();
function Screen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='AdminPanel' component={AdminPanel}></Stack.Screen>
            <Stack.Screen name='DetailUser' component={DetailUser}></Stack.Screen>
            <Stack.Screen name='SearchUser' component={SearchUser}></Stack.Screen>
            <Stack.Screen name='CreateAccount' component={CreateAccount}></Stack.Screen>
        </Stack.Navigator>
    )
}

function Screen2() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='CustomizeAdmin' component={CustomizeAdmin}></Stack.Screen>
            <Stack.Screen name='EditAdminPass' component={EditAdminPass}></Stack.Screen>
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function AdminScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#e820a5", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="AdminPanels" component={Screen} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "User Management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Screen2} options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default AdminScreen