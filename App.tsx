import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSreen from './pages/Home';
import Notification from './pages/Notification';
import Cart from './pages/Cart';
import { View, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useRef } from 'react';
import SettingScreen from './screen/SettingScreen';
import CategoryScreen from './screen/CategoryScreen';
import SearchScreen from './screen/SearchScreen';

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
        <Tabs.Screen name='Notification' component={Notification} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='Home' component={HomeSreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='house' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
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
              <Icon name='cart-shopping' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: (e: any) => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1.06,
              useNativeDriver: true
            }).start();
          },
        })}></Tabs.Screen>
        <Tabs.Screen name='Categorys' component={CategoryScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 50, height: 50, backgroundColor: "#FEA116", borderRadius: 50, alignItems: "center", justifyContent: "center", marginBottom: 55 }}>
              <Icon name='bowl-food' size={20} color={"#fff"}></Icon>
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
        <Tabs.Screen name='Searchs' component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='magnifying-glass' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
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
        <Tabs.Screen name='Settings' component={SettingScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='user' size={20} color={focused ? "#FEA116" : "gray"} solid></Icon>
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
