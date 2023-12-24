import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { useRef, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6'
import Notification from './pages/Notification';
import SettingScreen from './screen/SettingScreen';
import CategoryScreen from './screen/CategoryScreen';
import SearchScreen from './screen/SearchScreen';
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import AdminScreen from './screen/AdminScreen';
import EmployeeScreen from './screen/EmployeeScreen';
import ManagerScreen from './screen/ManagerScreen';

function App(): JSX.Element {
  const Tabs = createBottomTabNavigator();
  const [routeName, SetRouteName] = useState<any>("")
  const [load, setLoad] = useState(true)
  useEffect(() => {
    const dataTransfer = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
          const called: any = jwtDecode(token)
          if (called.userRole === 4) {
            SetRouteName("Admin")
          } else if (called.userRole === 3) {
            SetRouteName("Manager")
          } else if (called.userRole === 2) {
            SetRouteName("Employee")
          } else {
            SetRouteName("Homes")
          }
        } else {
          SetRouteName("Homes")
        }
        setLoad(false)
      } catch (e) {
        setLoad(false)
        console.log(e);
      }
    }
    dataTransfer()
  }, [])

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  function getWidth() {
    let width = Dimensions.get("window").width

    width = width - 50

    return width / 5
  }

  return (
    <>
      {load ? (
        <ActivityIndicator style={{ top: Dimensions.get("screen").width / 2, alignItems: "center" }} size={40} color={"#FEA116"} />
      ) : (
        <NavigationContainer>
          <Tabs.Navigator backBehavior='history' initialRouteName={routeName} screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#fff", position: "absolute", height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 10, height: 10 }, paddingHorizontal: 10 } }}>
            <Tabs.Screen name='Notification' component={Notification} options={{ tabBarButton: () => null }} />
            <Tabs.Screen name='Admin' component={AdminScreen} options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }} listeners={({ navigation, route }) => ({ focus: (e: any) => { Animated.spring(tabOffsetValue, { toValue: getWidth() * -500, useNativeDriver: true }).start() } })} />
            <Tabs.Screen name='Manager' component={ManagerScreen} options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }} listeners={({ navigation, route }) => ({ focus: (e: any) => { Animated.spring(tabOffsetValue, { toValue: getWidth() * -500, useNativeDriver: true }).start() } })} />
            <Tabs.Screen name='Employee' component={EmployeeScreen} options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }} listeners={({ navigation, route }) => ({ focus: (e: any) => { Animated.spring(tabOffsetValue, { toValue: getWidth() * -500, useNativeDriver: true }).start() } })} />
            <Tabs.Screen name='Homes' component={HomeScreen} options={{
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
            <Tabs.Screen name='Carts' component={CartScreen} options={{
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
          </Tabs.Navigator >
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
        </NavigationContainer >
      )
      }
    </>
  );
}


export default App;
