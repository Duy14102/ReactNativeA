import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import DatePicker from 'react-native-date-picker'
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import ActiveCartEmp from "../../component/EmpComp/Cart/ActiveCartEmp";
import HistoryCartEmp from "../../component/EmpComp/Cart/HistoryCartEmp";

function EmployeeCart() {
    const navigation = useNavigation<any>()
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const datenow = Date.now()
    const [date, setDate] = useState<any>(new Date(datenow))
    const [routes] = useState([
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'History' },
    ]);

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <ActiveCartEmp index={index} />;
            case 'second':
                return <HistoryCartEmp index={index} />;
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
        navigation.navigate("FindCartEmp", { date: `${date}` })
    }
    return (
        <>
            <DrawerHeader title={"Cart Management"} />
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
                <View style={{ borderWidth: 1, borderColor: "gray", width: "100%", flexDirection: "row", alignItems: "center", borderRadius: 6, height: 45 }}>
                    <TouchableOpacity onPress={() => setOpen(true)} style={{ padding: 10, width: "90%", height: "100%", justifyContent: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, color: "#0F172B" }}>{new Date(date).toLocaleDateString()}</Text>
                            <Text style={{ fontSize: 15 }}>▼</Text>
                        </View>
                    </TouchableOpacity>
                    <DatePicker
                        mode="date"
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TouchableOpacity style={{ width: "10%", }} onPress={() => searchNow()}>
                        <Icon name="search" size={20} style={{ textAlign: "center", backgroundColor: "#E1E1E1", height: "100%", verticalAlign: "middle", borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <TabView
                lazy={true}
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

export default EmployeeCart