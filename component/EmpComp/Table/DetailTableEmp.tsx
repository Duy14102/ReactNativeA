import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome6'
import { ScrollView, View, Text, RefreshControl, TouchableOpacity, Image, ActivityIndicator, TextInput } from "react-native"
import axios from "axios";

function DetailTableEmp({ route }: { route: any }) {
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const { i, candecode } = route.params
    const deliverEmployee = { id: candecode.userId, email: candecode.userEmail }
    const takeEmployee: any = []
    takeEmployee.push(deliverEmployee)
    const [refresh, setFresh] = useState(false);
    const [load2, setLoad2] = useState(false)
    const [load, setLoad] = useState(false)
    const [load3, setLoad3] = useState(false)
    const [checkNewName, setCheckNewName] = useState(false)
    const [wantChangeName, setWantChangeName] = useState(false)
    const [data, setData] = useState<any>()
    const [TBnamechange, setTBnamechange] = useState<any>()
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const calledSynb = () => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetCurrentDetailTableNative",
            params: {
                id: i._id
            }
        }
        axios(configuration)
            .then((res) => {
                setData(res.data.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    useEffect(() => {
        if (isfocused) {
            calledSynb()
        }
    }, [isfocused])

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            calledSynb()
            setFresh(false)
        }, 1000)
    }

    var total2 = 0

    const date = new Date(i.tabledate).toLocaleDateString()
    const time = new Date(i.tabledate).toLocaleTimeString()
    const datetime = date + " - " + time

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };

    const checkOut = (e: any, data: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/Checkout4Booking",
            data: {
                id: e,
                fulltotal: total2,
                tableid: data._id,
                employee: takeEmployee,
                Idhistory: data.customerid,
                TbnameHistory: data.tablename,
                TbDateHistory: data.tabledate,
                TbItemHistory: data.tableitems
            }
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.goBack()
                })
                .catch((err) => {
                    setLoad(false)
                    console.log(err);
                });
        }, 1000)
    }

    const checkOut4Normal = (data: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/Checkout4Normal",
            data: {
                id: data._id,
                employee: takeEmployee,
                Idhistory: data.customerid,
                TbnameHistory: data.tablename,
                TbDateHistory: data.tabledate,
                TbItemHistory: data.tableitems
            }
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.goBack()
                })
                .catch((err) => {
                    setLoad(false)
                    console.log(err);
                });
        }, 1000);
    }

    const deleteTable = (i: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/DeleteTableNow",
            data: {
                id: i
            }
        }
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    navigation.goBack()
                }).catch((err) => {
                    setLoad2(false)
                    console.log(err);
                })
        }, 1000);
    }

    const changeTableName = (i: any) => {
        if (TBnamechange === "") {
            setCheckNewName(true)
            return false
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeTableNameQuick",
            data: {
                id: i,
                name: TBnamechange
            }
        }
        setLoad3(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad3(false)
                    setCheckNewName(false)
                    setWantChangeName(false)
                    calledSynb()
                }).catch((err) => {
                    setLoad3(false)
                    setCheckNewName(false)
                    console.log(err);
                })
        }, 1000);
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: data?.tablestatus === 1 ? "#2298F1" : data?.tablestatus === 2 ? "#03ba5f" : data?.tablestatus === 3 ? "#FEA116" : "", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                    {data?.tablestatus === 1 ? (
                        <>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The table is pending</Text>
                                <Text style={{ fontSize: 17, color: "#fff", }}>Do something for this table..:)</Text>
                            </View>
                            <Text style={{ color: "#fff", fontSize: 35 }}>🕒</Text>
                        </>
                    ) : data?.tablestatus === 2 ? (
                        <>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>The table is being serve</Text>
                                <Text style={{ fontSize: 17, color: "#fff", }}>Served well, money well!</Text>
                            </View>
                            <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                        </>
                    ) : data?.tablestatus === 3 ? (
                        <>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Customer is ready to payment</Text>
                                <Text style={{ fontSize: 17, color: "#fff", }}>Served well, money well!</Text>
                            </View>
                            <Text style={{ color: "#fff", fontSize: 35 }}>💸</Text>
                        </>
                    ) : null}
                </View>
                <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                    {data?.tablestatus === 2 ? (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 3 }}>
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ChangeTableEmp", { item: data })}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Icon name="repeat" size={23} />
                                    <Text style={{ fontSize: 16 }}>Change table</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("AddTableItem", { item: data })}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Icon name="cart-plus" size={23} />
                                    <Text style={{ fontSize: 16 }}>Add items</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : data?.tablestatus === 1 ? (
                        <View style={{ flexDirection: "column", gap: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 3 }}>
                                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setWantChangeName(true)}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Icon name="edit" size={23} solid />
                                        <Text style={{ fontSize: 16 }}>Change table name</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("AddTableItem", { item: data })}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Icon name="cart-plus" size={23} />
                                        <Text style={{ fontSize: 16 }}>Add items</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {wantChangeName ? (
                                <>
                                    <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setTBnamechange(e.nativeEvent.text)} />
                                    {checkNewName ? (
                                        <Text style={{ color: "red", textAlign: "center" }}>This field cant be blank!</Text>
                                    ) : null}
                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                        <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => changeTableName(data?._id)}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setWantChangeName(false)} style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {load3 ? (
                                        <ActivityIndicator size={25} color={"#FEA116"} />
                                    ) : null}
                                </>
                            ) : null}
                        </View>
                    ) : null}
                    {data?.tablestatus === 2 || data?.tablestatus === 3 ? (
                        <>
                            <View style={{ backgroundColor: "gray", padding: 0.4 }} />
                            <View style={{ marginVertical: 10 }}>
                                {data?.tableitems?.map((r: any) => {
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
                        </>
                    ) : null}
                </View>
                <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Icon name="users" size={20} />
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer type</Text>
                    </View>
                    {data?.customerid ? (
                        <Text style={{ fontSize: 15, paddingLeft: 35 }}>Account guest</Text>
                    ) : data?.customerid === "None" ? (
                        <Text style={{ fontSize: 15, paddingLeft: 35 }}>Visiting guest</Text>
                    ) : (
                        <Text style={{ fontSize: 15, paddingLeft: 35 }}>None</Text>
                    )}
                </View>
                <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table id</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Text style={{ fontSize: 15 }}>{data?._id}</Text>
                            <TouchableOpacity onPress={() => copyToClipboardid(data?._id)}>
                                <Text style={{ color: "#FEA116", fontSize: 17 }}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table name</Text>
                        <Text style={{ fontSize: 15 }}>{data?.tablename}</Text>
                    </View>
                    {data?.tablestatus === 2 ? (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table date</Text>
                            <Text style={{ fontSize: 15 }}>{datetime}</Text>
                        </View>
                    ) : null}
                </View>
                {data?.tablestatus !== 1 && data?.tableitems?.length > 0 ? (
                    <TouchableOpacity style={{ alignItems: "center", paddingVertical: 9, marginTop: 5, backgroundColor: "#FEA116", marginBottom: 20 }} onPress={() => data?.customerid ? checkOut(data?.customerid, data) : checkOut4Normal(data)}>
                        {load ? (
                            <ActivityIndicator size={21} color={"#fff"} />
                        ) : (
                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Checkout</Text>
                        )}
                    </TouchableOpacity>
                ) : null}
                {data?.tablestatus === 1 && candecode.userRole === 3 ? (
                    <TouchableOpacity style={{ alignItems: "center", paddingVertical: 9, marginTop: 5, backgroundColor: "tomato", marginBottom: 20 }} onPress={() => deleteTable(data?._id)}>
                        {load2 ? (
                            <ActivityIndicator size={21} color={"#fff"} />
                        ) : (
                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Delete table</Text>
                        )}
                    </TouchableOpacity>
                ) : null}
            </View>
        </ScrollView>
    )
}
export default DetailTableEmp