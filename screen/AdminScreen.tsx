import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import AdminPanel from '../pages/admin/AdminPanel';
import CustomizeAdmin from '../component/AdminComp/CustomizeAdmin';
import DetailUser from '../component/AdminComp/DetailUser';
import SearchUser from '../component/AdminComp/SearchUser';
import EditAdminPass from '../component/AdminComp/EditAdminPass';

const Drawer = createDrawerNavigator();
function AdminScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#e820a5", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="AdminPanel" component={AdminPanel} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "User Management"
            }} />
            <Drawer.Screen name='CustomizeAdmin' component={CustomizeAdmin} options={{ drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='DetailUser' component={DetailUser} options={{ drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='SearchUser' component={SearchUser} options={{ drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='EditAdminPass' component={EditAdminPass} options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default AdminScreen