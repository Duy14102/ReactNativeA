import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy, Suspense, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const settingLazy = lazy(() => import("../pages/Setting"))
const signupLazy = lazy(() => import("../pages/Signup"))
const privacyAndTermLazy = lazy(() => import("../pages/PrivacyAndTerm"))
const contactLazy = lazy(() => import("../pages/Contact"))
const userDetailLazy = lazy(() => import("../component/UserComp/Edit Information/UserDetail"))
const editAddressLazy = lazy(() => import("../component/UserComp/Edit Information/EditAddress"))
const editPasswordLazy = lazy(() => import("../component/UserComp/Edit Information/EditPassword"))
const activeCartLazy = lazy(() => import("../component/UserComp/Cart/ActiveCart"))
const detailCartLazy = lazy(() => import("../component/UserComp/Cart/DetailCart"))
const whyCancelLazy = lazy(() => import("../component/UserComp/Edit Information/WhyCancel"))
const historyCartLazy = lazy(() => import("../component/UserComp/Cart/HistoryCart"))
const findOrderLazy = lazy(() => import("../component/UserComp/Cart/FindOrder"))
const activeBookingLazy = lazy(() => import("../component/UserComp/Booking/ActiveBooking"))
const historyBookingLazy = lazy(() => import("../component/UserComp/Booking/HistoryBooking"))
const detailBookingLazy = lazy(() => import("../component/UserComp/Booking/DetailBooking"))

const SettingStack = createNativeStackNavigator();
function SettingScreen() {
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    return (
        <Suspense fallback={<ActivityIndicator size={25} color={"#FEA116"} />}>
            <SettingStack.Navigator screenOptions={{ headerShown: false }}>
                <SettingStack.Screen name='Setting' component={settingLazy} />
                <SettingStack.Screen name='Signup' component={signupLazy} />
                <SettingStack.Screen name="ActiveBooking" component={activeBookingLazy} />
                <SettingStack.Screen name="HistoryBooking" component={historyBookingLazy} />
                <SettingStack.Screen name="DetailBooking" component={detailBookingLazy} />
                <SettingStack.Screen name="WhyCancel" component={whyCancelLazy} />
                <SettingStack.Screen name="HistoryCart" component={historyCartLazy} />
                <SettingStack.Screen name="FindOrder" component={findOrderLazy} />
                <SettingStack.Screen name='PnT' component={privacyAndTermLazy} />
                <SettingStack.Screen name='Contact' component={contactLazy} />
                <SettingStack.Screen name='UserDetail' component={userDetailLazy} />
                <SettingStack.Screen name='EditAddress' component={editAddressLazy} />
                <SettingStack.Screen name='EditPassword' component={editPasswordLazy} />
                <SettingStack.Screen name='ActiveCart' component={activeCartLazy} />
                <SettingStack.Screen name='DetailCart' component={detailCartLazy} />
            </SettingStack.Navigator>
        </Suspense>
    );
}
export default SettingScreen