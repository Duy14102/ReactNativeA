import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeSreen from './pages/Home';
import SearchScreen from './pages/Search';
import Notification from './pages/Notification';
import Setting from './pages/Setting';
import Category from './pages/Category';
import Signup from './pages/Signup';
import { TouchableOpacity, View, Animated, Dimensions } from 'react-native';
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
      <Tabs.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: "#fff", position: "absolute", height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 10, height: 10 }, paddingHorizontal: 10 } }}>
        <Tabs.Screen name='Signup' component={Signup} options={{ tabBarButton: () => null }} />
        <Tabs.Screen name='Home' component={HomeSreen} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='home' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tabs.Screen>
        <Tabs.Screen name='Notification' component={Notification} options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name='bell' size={20} color={focused ? "#FEA116" : "gray"}></Icon>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          focus: e => {
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
          focus: e => {
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
          focus: e => {
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
          focus: e => {
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
