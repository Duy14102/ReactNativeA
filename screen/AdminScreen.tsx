import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNav from '../custom/DrawerNav';
import Icon from 'react-native-vector-icons/FontAwesome6'
import Customize from './SecondScreen/Customize';
import UserManage from './SecondScreen/UserManage';

const Drawer = createDrawerNavigator();
function AdminScreen() {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: { marginLeft: -20, fontSize: 15 }, drawerActiveTintColor: "#fff", drawerActiveBackgroundColor: "#FEA116", drawerInactiveTintColor: "#333" }} drawerContent={props => <DrawerNav props={props} />}>
            <Drawer.Screen name="AdminPanels" component={UserManage} options={{
                drawerIcon: ({ color }) => (
                    <Icon name='user' size={22} color={color} solid />
                ),
                title: "User Management"
            }} />
            <Drawer.Screen name='CustomizeAdmins' component={Customize} options={{ drawerItemStyle: { display: "none" } }} />
        </Drawer.Navigator>
    )
}
export default AdminScreen