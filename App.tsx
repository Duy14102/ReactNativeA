import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSreen from './pages/Home';
import SearchScreen from './pages/Search';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Category from './pages/Category';
import Signup from './pages/Signup';
import DetailPage from './pages/DetailPage';
import Cart from './pages/Cart';
import PrivacyAndTerm from './pages/PrivacyAndTerm';
import Contact from './pages/Contact';
import WriteReview from './component/WriteReview';
import UserDetail from './component/UserDetail';
import EditAddress from './component/UserComp/EditAddress';
import EditPassword from './component/UserComp/EditPassword';
import ActiveCart from './component/UserComp/ActiveCart';
import DetailCart from './component/UserComp/DetailCart';
import WhyCancel from './component/UserComp/WhyCancel';
import HistoryCart from './component/UserComp/HistoryCart';
import FindOrder from './component/UserComp/FindOrder';
import { View, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useRef } from 'react';

function App(): JSX.Element {
  const Tabs = createBottomTabNavigator();

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  function getWidth() {
    let width = Dimensions.get("window").width

    width = width - 50

    return width / 5
  }
  return (
    <NavigationContainer>
      <Tabs.Navigator backBehavior='history' initialRouteName='Home' screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#fff", position: "absolute", height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 10, height: 10 }, paddingHorizontal: 10 } }}>
        <Tabs.Screen name='Signup' component={Signup} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='DetailPage' component={DetailPage} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='Notification' component={Notification} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='WriteReview' component={WriteReview} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='PnT' component={PrivacyAndTerm} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='Contact' component={Contact} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='UserDetail' component={UserDetail} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='EditAddress' component={EditAddress} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='EditPassword' component={EditPassword} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='ActiveCart' component={ActiveCart} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='DetailCart' component={DetailCart} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='WhyCancel' component={WhyCancel} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='HistoryCart' component={HistoryCart} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='FindOrder' component={FindOrder} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='Home' component={HomeSreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='home' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
        <Tabs.Screen name='Cart' component={Cart} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='shopping-cart' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1.06,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
        <Tabs.Screen name='Category' component={Category} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 50, height: 50, backgroundColor: "#FEA116", borderRadius: 50, alignItems: "center", justifyContent: "center", marginBottom: 55 }}>
              <Icon name='list-ul' size={20} color={"#fff"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * -500,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
        <Tabs.Screen name='Search' component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='search' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3.2,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
        <Tabs.Screen name='Setting' component={Setting} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='user-alt' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4.3,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
      </Tabs.Navigator>
      <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: "#FEA116",
        position: "absolute",
        bottom: 58,
        left: 25,
        borderRadius: 50,
        transform: [{
          translateX: tabOffsetValue
        }]
      }} />
    </NavigationContainer>
  );
}


export default App;
