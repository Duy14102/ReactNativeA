import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useNavigation, useIsFocused } from "@react-navigation/native";

function EmployeeTask() {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [CountData, setCountData] = useState<any>()
    const [candecode, SetCandecode] = useState<any>()
    const [GetUser, setGetUser] = useState<any>([])
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const dataType = async () => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            const called: any = jwtDecode(token)
            SetCandecode(jwtDecode(token))
            const configuration2 = {
                method: "get",
                url: 'http://localhost:3000/GetDetailUser',
                params: {
                    userid: called.userId
                }
            }
            axios(configuration2)
                .then((res) => {
                    setGetUser(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        if (isfocused) {
            const configuration = {
                method: "get",
                url: "http://localhost:3000/GetData4Employee",
            }
            axios(configuration)
                .then((res) => {
                    setCountData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
            dataType()
        }
    }, [isfocused])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Dashboard"} />
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 15, flexDirection: "column", gap: 20 }}>
                        <View>
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Booking</Text>
                            <View style={{ backgroundColor: "#2298F1", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.actBookingLength}</Text>
                                </View>
                                <View style={{ backgroundColor: "#fff", padding: 1.2, marginVertical: 7 }} />
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Serving</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.waitBookingLength}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Cart</Text>
                            <View style={{ backgroundColor: "#66B92E", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.orderLength}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Table</Text>
                            <View style={{ backgroundColor: "#FEA116", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.tableLength}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Task</Text>
                            <View style={{ backgroundColor: "#D65B4A", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{GetUser.task?.length}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 15, backgroundColor: "#fff", marginVertical: 15 }}>
                        <Text style={{ textAlign: "center", fontSize: 18 }}>Task for you</Text>
                        {GetUser.task?.length > 0 ? (
                            GetUser.task?.sort((a: any, b: any) => a.task.status - b.task.status).map((i: any) => {
                                return (
                                    <TouchableOpacity key={i.id} style={style.shadow} onPress={() => navigation.navigate("TaskHandle", { i: i, id: GetUser._id })}>
                                        <View style={{ backgroundColor: "#fff", padding: 15 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Title</Text> : {i.task.title}</Text>
                                                {i.task.status === 1 ? (
                                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}> Status</Text> : <Text style={{ color: "black" }}>🟢</Text></Text>
                                                ) : (
                                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}> Status</Text> : <Text style={{ color: "black" }}>🟡</Text></Text>
                                                )}
                                            </View>
                                            <View style={{ padding: 0.2, backgroundColor: "gray", marginVertical: 10 }} />
                                            <View style={{ flexDirection: "column", gap: 10 }}>
                                                <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {i.task.date}</Text>
                                                {i.task.status === 2 ? (
                                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Date complete</Text> : {i.task.datefinish}</Text>
                                                ) : null}
                                                <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Message</Text> : {i.task.message}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        ) : (
                            <Text style={{ fontSize: 15, textAlign: "center" }}>There's no task for you!</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: "transparent"
    }
})

export default EmployeeTask