import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, Image } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Clipboard from '@react-native-clipboard/clipboard';

function DetailHistoryTable({ route }: { route: any }) {
    const { item } = route.params
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    var total2 = 0

    const date = new Date(item.tabledate).toLocaleDateString()
    const time = new Date(item.tabledate).toLocaleTimeString()
    const datetime = date + " - " + time
    const date2 = new Date(item.datefinish).toLocaleDateString()
    const time2 = new Date(item.datefinish).toLocaleTimeString()
    const datetime2 = date2 + " - " + time2

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "#03ba5f", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The table is complete</Text>
                            <Text style={{ fontSize: 17, color: "#fff", }}>Served well, money well!</Text>
                        </View>
                        <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ marginVertical: 10 }}>
                            {item.tableitems?.map((r: any) => {
                                var total = r.quantity * r.item.foodprice
                                total2 += total
                                return (
                                    <View key={r.item._id} style={{ flexDirection: "row", gap: 10, position: "relative", paddingVertical: 10 }}>
                                        <Image source={{ uri: r.item.foodimage }} height={70} width={70} />
                                        <View style={{ flexDirection: "column", gap: 7 }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{r.item.foodname}</Text>
                                            <Text style={{ fontSize: 15 }}>{r.item.foodcategory}</Text>
                                        </View>
                                        <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {r.quantity}</Text>
                                        <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(r.item.foodprice)}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ backgroundColor: "gray", padding: 0.2 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fulltotal</Text>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{VND.format(total2)}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Icon name="users" size={20} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer type</Text>
                        </View>
                        {item.customerid ? (
                            <Text style={{ fontSize: 15, paddingLeft: 35 }}>Account guest</Text>
                        ) : (
                            <Text style={{ fontSize: 15, paddingLeft: 35 }}>Visiting guest</Text>
                        )}
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table id</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Text style={{ fontSize: 15 }}>{item._id}</Text>
                                <TouchableOpacity onPress={() => copyToClipboardid(item._id)}>
                                    <Text style={{ color: "#FEA116", fontSize: 17 }}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table name</Text>
                            <Text style={{ fontSize: 15 }}>{item.tablename}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table date</Text>
                            <Text style={{ fontSize: 15 }}>{datetime}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Finish date</Text>
                            <Text style={{ fontSize: 15 }}>{datetime2}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailHistoryTable