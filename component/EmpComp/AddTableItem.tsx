import { Text, TouchableOpacity, Dimensions } from "react-native";
import DrawerHeader from "../AdminComp/DrawerHeader";
import { TabView, TabBar } from 'react-native-tab-view';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TableItemIndex from "./TableItemIndex";

function AddTableItem({ route }: { route: any }) {
    const { item } = route.params
    const navigation = useNavigation<any>()
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Meat' },
        { key: 'second', title: 'Vegetables' },
        { key: 'third', title: 'Drink' },
    ]);

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <TableItemIndex cate={"Meat"} itemss={item} />;
            case 'second':
                return <TableItemIndex cate={"Vegetables"} itemss={item} />;
            case 'third':
                return <TableItemIndex cate={"Drink"} itemss={item} />;
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
    return (
        <>
            <DrawerHeader title={"Add table item"} />
            <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
            </TouchableOpacity>
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

export default AddTableItem