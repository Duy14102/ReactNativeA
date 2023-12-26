import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../../Header"
import Footer from "../../Footer"
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"
import { useState } from "react"

function FindOrder({ route, navigation }: { route: any, navigation: any }) {
    const { userid } = route.params
    const [Orderid, setOrderid] = useState("")
    const [Order, setOrder] = useState([])
    const [Displaytable, setDisplaytable] = useState(false)
    const [check, setCheck] = useState(false)
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)
    const [refresh, setFresh] = useState(false)

    const pulldown = () => {
        setFresh(true)
        setDisplaytable(false)
        setOrderid("")
        setOrder([])
        setCheck(false)
        setError(false)
        setTimeout(() => {
            setFresh(false)
        }, 1000)
    }

    const searchorder = () => {
        const configuration = {
            method: 'get',
            url: 'http://192.168.1.216:3000/GetThisOrderNative',
            params: {
                id: Orderid,
                userid: userid
            }
        }
        if (Orderid === "") {
            setCheck(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then((res) => {
                    setLoad(false)
                    setError(false)
                    setOrder(res.data.data)
                    setDisplaytable(true)
                }).catch((er) => {
                    setLoad(false)
                    console.log(er);
                    setError(true)
                })
        }, 1000);
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    var fulltotal = 0
    var total2 = 0
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#0F172B" }}>Find Order</Text>
                    <View style={{ paddingVertical: 15, flexDirection: "column", gap: 5 }}>
                        <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Order id :</Text>
                        <View style={{ borderWidth: 1, borderColor: "gray", height: 50, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <TextInput style={{ height: "100%", width: "90%" }} value={Orderid} onChange={(e) => setOrderid(e.nativeEvent.text)} />
                            <TouchableOpacity style={{ width: "10%", height: "100%", backgroundColor: "gray", alignItems: "center", justifyContent: "center", borderTopRightRadius: 8, borderBottomRightRadius: 8 }} onPress={() => searchorder()}>
                                <Icon name="search" style={{ color: "#fff" }} size={17} />
                            </TouchableOpacity>
                        </View>
                        {check ? (
                            <Text style={{ paddingLeft: 5, color: "red" }}>This field cant be blank!</Text>
                        ) : null}
                        {error ? (
                            <Text style={{ paddingLeft: 5, color: "red" }}>Order id not exists!</Text>
                        ) : null}
                    </View>
                    {load ? (
                        <ActivityIndicator size={21} color={"#FEA116"} />
                    ) : null}
                    {Displaytable ? (
                        <>
                            {Order.map((i: any) => {
                                i.orderitems.map((t: any) => {
                                    var total = t.quantity * t.data.foodprice
                                    total2 += total
                                    fulltotal = total2 + i.shippingfee
                                    return null
                                })
                                return (
                                    <TouchableOpacity style={cateStyle.cardStyle} key={i._id} onPress={() => navigation.navigate("DetailCart", { i: i })}>
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
                                            ) : i.status === 3 ? (
                                                <Text style={{ fontSize: 15, color: "tomato" }}>Denied</Text>
                                            ) : i.status === 5 ? (
                                                <Text style={{ fontSize: 15, color: "#03ba5f" }}>Succeeded</Text>
                                            ) : i.status === 6 ? (
                                                <Text style={{ fontSize: 15, color: "tomato" }}>Canceled</Text>
                                            ) : null}
                                        </View>
                                        <View style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                            <Image source={{ uri: i.orderitems[0].data.foodimage }} height={70} width={70} />
                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{i.orderitems[0].data.foodname}</Text>
                                            <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {i.orderitems[0].quantity}</Text>
                                            <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(i.orderitems[0].data.foodprice)}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'gray',
                                                borderBottomWidth: 0.5,
                                                left: 5,
                                                right: 5,
                                                paddingVertical: 3
                                            }}
                                        />
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text style={{ fontSize: 15 }}>{i.orderitems.length} items</Text>
                                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Fulltotal : </Text>{VND.format(fulltotal)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </>
                    ) : null}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const cateStyle = StyleSheet.create({
    cardStyle: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        gap: 10,
        padding: 10,
        shadowColor: "#000",
        marginVertical: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default FindOrder