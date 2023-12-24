import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { TabView, TabBar } from 'react-native-tab-view';
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import Icon from "react-native-vector-icons/FontAwesome5";
import MenuManager from "../../component/ManagerComp/Menu/MenuManager";
import { useNavigation } from "@react-navigation/native";

function DefaultPages() {
    const navigation = useNavigation<any>()
    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState("")
    const [check, setCheck] = useState(false)
    const [routes] = useState([
        { key: 'first', title: 'Meat' },
        { key: 'second', title: 'Vegetables' },
        { key: 'third', title: 'Drink' },
    ]);

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <MenuManager cate={"Meat"} index={index} />;
            case 'second':
                return <MenuManager cate={"Vegetables"} index={index} />;
            case 'third':
                return <MenuManager cate={"Drink"} index={index} />;
            default:
                return null;
        }
    };

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FEA116' }}
            style={{ backgroundColor: '#fff' }}
            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? "#FEA116" : "#0F172B", fontSize: 17 }}>{route.title}</Text>
            )}
        />
    );

    function searchNow() {
        if (search === "") {
            setCheck(true)
            return false
        } else {
            setCheck(false)
            navigation.navigate("SearchMenuManager", { name: search })
        }
    }
    return (
        <>
            <DrawerHeader title={"Menu management"} />
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc", flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ borderWidth: 1, borderColor: "gray", width: "85%", flexDirection: "row", alignItems: "center", borderRadius: 6, height: 45 }}>
                    <TextInput style={{ padding: 10, width: "90%", height: "100%" }} placeholder="Input item name to search..." onChange={(e) => setSearch(e.nativeEvent.text)} />
                    <TouchableOpacity style={{ width: "10%", }} onPress={() => searchNow()}>
                        <Icon name="search" size={20} style={{ textAlign: "center", backgroundColor: "#E1E1E1", height: "100%", verticalAlign: "middle", borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "gray", width: 0.5, height: "100%" }} />
                <TouchableOpacity style={{ width: "14%" }} onPress={() => navigation.navigate("CreateMenuManager")}>
                    <Icon name="plus-square" size={33} color={"#FEA116"} solid />
                </TouchableOpacity>
                {check ? (
                    <Text style={{ color: "red", paddingLeft: 5 }}>This field cant be blank</Text>
                ) : null}
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get("screen").width }}
                renderTabBar={renderTabBar}
                style={{ flex: 1 }}
            />
        </>
    )
}

export default DefaultPages