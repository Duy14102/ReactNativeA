import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Pressable } from "react-native"
import Header from "../Header"
import Footer from "../Footer"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from "react"
import Clipboard from '@react-native-clipboard/clipboard';

function SearchOrder({ route, navigation }: { route: any, navigation: any }) {
    const { i } = route.params
    const [userid, setUserId] = useState()
    const [moreDetail, setMoreDetail] = useState(false)
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        i.user.map((w: any) => {
            setUserId(w.id)
            return null
        })
    }, [i])

    var fulltotal2 = 0
    var total2 = 0

    const date = new Date(i.createdAt).toLocaleDateString()
    const time = new Date(i.createdAt).toLocaleTimeString()
    const datetime = date + " - " + time
    const date2 = new Date(i.completeAt).toLocaleDateString()
    const time2 = new Date(i.completeAt).toLocaleTimeString()
    const datetime2 = date2 + " - " + time2

    const copyToClipboardAddress = (e: any) => {
        Clipboard.setString(e);
    };

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: i.status === 1 ? "#FEA116" : i.status === 2 ? "#03ba5f" : i.status === 4 ? "gray" : i.status === 3 ? "tomato" : i.status === 6 ? "tomato" : i.status === 5 ? "#03ba5f" : "", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        {i.status === 1 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order is pending to approve</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Please wait a few minutes...</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>🕒</Text>
                            </>
                        ) : i.status === 2 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order have been approved</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Order is shipping to you!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                            </>
                        ) : i.status === 4 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order is pending to cancel</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Please wait a few minutes...</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>🕒</Text>
                            </>
                        ) : i.status === 3 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order is denied</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35, fontWeight: "bold" }}>X</Text>
                            </>
                        ) : i.status === 5 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order have been succeeded</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                            </>
                        ) : i.status === 6 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The order is canceled</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35, fontWeight: "bold" }}>X</Text>
                            </>
                        ) : null}
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Icon name="map-marker-alt" size={20} />
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Address</Text>
                            </View>
                            <TouchableOpacity onPress={() => copyToClipboardAddress(i.address)}>
                                <Text style={{ color: "#FEA116", fontSize: 17 }}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 15, paddingLeft: 24 }}>{i.address}</Text>
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                {i.user?.map((a: any) => {
                                    return (
                                        <Text key={a.id} style={{ fontSize: 15 }}>{a.fullname}</Text>
                                    )
                                })}
                            </View>
                            {i.status === 1 ? (
                                <Text style={{ fontSize: 15, color: "#fca103" }}>🕒 Pending</Text>
                            ) : i.status === 2 ? (
                                <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Approve</Text>
                            ) : i.status === 4 ? (
                                <Text style={{ fontSize: 15 }}>🕒 Pending cancel</Text>
                            ) : null}
                        </View>
                        {i.orderitems?.map((r: any) => {
                            var total = r.quantity * r.data.foodprice
                            total2 += total
                            fulltotal2 = total2 + i.shippingfee
                            return (
                                <View key={r.data._id} style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                    <Image source={{ uri: r.data.foodimage }} height={70} width={70} />
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{r.data.foodname}</Text>
                                    <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {r.quantity}</Text>
                                    <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(r.data.foodprice)}</Text>
                                </View>
                            )
                        })}
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.5,
                                left: 5,
                                right: 5,
                                paddingVertical: 3
                            }}
                        />
                        {moreDetail ? (
                            <>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15 }}>Total</Text>
                                    <Text style={{ fontSize: 15 }}>{VND.format(total2)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15 }}>Shipping fee</Text>
                                    <Text style={{ fontSize: 15 }}>{VND.format(i.shippingfee)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fulltotal</Text>
                                    <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }} onPress={() => setMoreDetail(false)}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{VND.format(fulltotal2)}</Text>
                                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>˄</Text>
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fulltotal</Text>
                                    <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8 }} onPress={() => setMoreDetail(true)}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{VND.format(fulltotal2)}</Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold" }}>v</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 5 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Icon name="money-check-alt" size={20} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Payment method</Text>
                        </View>
                        <Text style={{ fontSize: 15, paddingLeft: 35 }}>{i.paymentmethod?.type}</Text>
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Order id</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Text style={{ fontSize: 15 }}>{i._id}</Text>
                                <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                    <Text style={{ color: "#FEA116", fontSize: 17 }}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date order</Text>
                            <Text style={{ fontSize: 15 }}>{datetime}</Text>
                        </View>
                        {i.status === 5 ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date complete</Text>
                                <Text style={{ fontSize: 15 }}>{datetime2}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}
export default SearchOrder