import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Setting from '../pages/Setting';
import Signup from '../pages/Signup';
import PrivacyAndTerm from '../pages/PrivacyAndTerm';
import Contact from '../pages/Contact';
import UserDetail from '../component/UserDetail';
import EditAddress from '../component/UserComp/EditAddress';
import EditPassword from '../component/UserComp/EditPassword';
import ActiveCart from '../component/UserComp/ActiveCart';
import DetailCart from '../component/UserComp/DetailCart';
import WhyCancel from '../component/UserComp/WhyCancel';
import HistoryCart from '../component/UserComp/HistoryCart';
import FindOrder from '../component/UserComp/FindOrder';
import ActiveBooking from '../component/UserComp/ActiveBooking';
import HistoryBooking from '../component/UserComp/HistoryBooking';
import DetailBooking from '../component/UserComp/DetailBooking';

const SettingStack = createNativeStackNavigator();
function SettingScreen() {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen name='Setting' component={Setting} />
            <SettingStack.Screen name='Signup' component={Signup} />
            <SettingStack.Screen name="ActiveBooking" component={ActiveBooking} />
            <SettingStack.Screen name="HistoryBooking" component={HistoryBooking} />
            <SettingStack.Screen name="DetailBooking" component={DetailBooking} />
            <SettingStack.Screen name="WhyCancel" component={WhyCancel} />
            <SettingStack.Screen name="HistoryCart" component={HistoryCart} />
            <SettingStack.Screen name="FindOrder" component={FindOrder} />
            <SettingStack.Screen name='PnT' component={PrivacyAndTerm} />
            <SettingStack.Screen name='Contact' component={Contact} />
            <SettingStack.Screen name='UserDetail' component={UserDetail} />
            <SettingStack.Screen name='EditAddress' component={EditAddress} />
            <SettingStack.Screen name='EditPassword' component={EditPassword} />
            <SettingStack.Screen name='ActiveCart' component={ActiveCart} />
            <SettingStack.Screen name='DetailCart' component={DetailCart} />
        </SettingStack.Navigator>
    );
}
export default SettingScreen