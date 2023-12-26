import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ContactManager from "../../component/ManagerComp/Dashboard/Contact/ContactManager";

function ManagerDashboard() {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [CountData, setCountData] = useState<any>()
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            datasynb()
            setFresh(false)
        }, 1000)
    }

    const datasynb = () => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetData4Admin",
        }
        axios(configuration)
            .then((res) => {
                setCountData(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (isfocused) {
            datasynb()
        }
    }, [isfocused])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Dashboard"} />
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 15, flexDirection: "column", gap: 20 }}>
                        <View>
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Total Employee</Text>
                            <View style={{ backgroundColor: "#2298F1", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.userLength}</Text>
                                </View>
                                <View style={{ padding: 1.2, backgroundColor: "#fff", marginVertical: 7 }} />
                                <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => navigation.navigate("TotalEmpManager")}>
                                    <Text style={{ fontSize: 15, color: "#fff" }}>More detail {">>"}</Text>
                                </TouchableOpacity>
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
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Booking</Text>
                            <View style={{ backgroundColor: "#ff9999", padding: 10, borderRadius: 6 }}>
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
                            <Text style={{ paddingLeft: 5, paddingBottom: 3, fontSize: 16, fontWeight: "bold" }}>Total Menu</Text>
                            <View style={{ backgroundColor: "#D65B4A", padding: 10, borderRadius: 6 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Active</Text>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>{CountData?.menuLength}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 15, backgroundColor: "#fff", marginVertical: 15 }}>
                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>Income</Text>

                    </View>
                    <View style={{ padding: 15, backgroundColor: "#fff", marginVertical: 15 }}>
                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>Contact</Text>
                        <ContactManager />
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

export default ManagerDashboard