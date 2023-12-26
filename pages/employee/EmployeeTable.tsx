import { View, Text, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TabView, TabBar } from 'react-native-tab-view';
import ActiveTableEmp from "../../component/EmpComp/Table/ActiveTableEmp";
import HistoryTableEmp from "../../component/EmpComp/Table/HistoryTableEmp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function EmployeeTable() {
    const [index, setIndex] = useState(0);
    const [wantAdd, setWantAdd] = useState(false)
    const [load, setLoad] = useState(false)
    const [candecode, setCandecode] = useState<any>()
    const [tableName, setTableName] = useState("")
    const [checkTableName, setCheckTableName] = useState(false)
    const [success, setSuccess] = useState(false)
    const [routes] = useState([
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'History' },
    ]);

    useEffect(() => {
        async function dataSynb() {
            const token = await AsyncStorage.getItem("TOKEN")
            if (token) {
                setCandecode(jwtDecode(token))
            }
        }
        dataSynb()
    }, [])

    useEffect(() => {
        if (success) {
            setTableName("")
            setCheckTableName(false)
            setSuccess(false)
            setWantAdd(false)
        }
    }, [success])

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <ActiveTableEmp index={index} success={success} />;
            case 'second':
                return <HistoryTableEmp index={index} />;
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

    const addtable = () => {
        if (tableName === "") {
            setCheckTableName(true)
            return false
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/AddTableByHand",
            data: {
                tablename: tableName
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setSuccess(true)
                }).catch((err) => {
                    setLoad(false)
                    console.log(err);
                })
        }, 1000);
    }
    return (
        <>
            <DrawerHeader title={"Table Management"} />
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
                {candecode?.userRole === 3 ? (
                    wantAdd ? (
                        <>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5, paddingBottom: 3 }}>Table name</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setTableName(e.nativeEvent.text)} />
                            {checkTableName ? (
                                <Text style={{ color: "red", textAlign: "center", paddingTop: 10 }}>This field cant be blank!</Text>
                            ) : null}
                            <View style={{ marginVertical: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => addtable()}>
                                    <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => { setWantAdd(false); setTableName(""); setCheckTableName(false) }}>
                                    <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            {load ? (
                                <ActivityIndicator size={25} color={"#FEA116"} />
                            ) : null}
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={{ backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 8 }} onPress={() => setWantAdd(true)}>
                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Add new table</Text>
                            </TouchableOpacity>
                        </>
                    )
                ) : null}
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

export default EmployeeTable