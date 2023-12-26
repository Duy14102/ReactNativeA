import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView, View, Text, RefreshControl, ActivityIndicator, TouchableOpacity, Pressable, Image, TextInput } from "react-native"
import axios from "axios";
import CancelRequest from "./CancelRequest";
import CancelByMag from "./CancelByMag";

function DetailCartEmp({ route }: { route: any }) {
    const navigation = useNavigation<any>()
    const { i, candecode } = route.params
    const deliverEmployee = { id: candecode.userId, email: candecode.userEmail }
    const [refresh, setFresh] = useState(false);
    const [moreDetail, setMoreDetail] = useState(false)
    const [wantDeny, setWantDeny] = useState(false)
    const [checkDenyBlank, setCheckDenyBlank] = useState(false)
    const [loadReject, setLoadReject] = useState(false)
    const [reject, setReject] = useState(false)
    const [cancelPaid, setCancelPaid] = useState(false)
    const [cancelAprove, setCancelAprove] = useState(false)
    const [normalCancel, setNormalCancel] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [load3, setLoad3] = useState(false)
    const [reset, setReset] = useState(false)
    const [DenyReason, setDenyReason] = useState("")
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (reset) {
            setDenyReason("")
            setCancelPaid(false)
            setCancelAprove(false)
            setNormalCancel(false)
            setReject(false)
            setMoreDetail(false)
            setWantDeny(false)
            setCheckDenyBlank(false)
            setReset(false)
        }
    }, [reset])

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

    const appoveOrder = (e: any, yolo: any) => {
        const configuration = {
            method: 'post',
            url: 'http://localhost:3000/UpdateStatusOrder',
            data: {
                id: e,
                status: 2,
                employee: deliverEmployee,
                orderitems: yolo
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.goBack()
                }).catch((er) => {
                    setLoad(false)
                    console.log(er);
                })
        }, 1000);
    }

    const completeOrder = (type: any) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/CompleteOrderByEmp",
            data: {
                id: i._id,
                date: Date.now(),
                status: 5,
                type: type
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

    const denyOrderKun = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/VnpayRefund",
            data: {
                orderId: i._id,
                transDate: i.createdAt,
                amount: fulltotal2,
                transType: "03",
                user: "Manager",
                reason: DenyReason
            }
        }
        axios(configuration).then(() => {
            setLoad3(false)
            setReset(true)
            navigation.goBack()
        }).catch((err) => {
            setLoad3(false)
            console.log(err);
        })
    }

    const denyOrderPaid = () => {
        if (DenyReason === "") {
            setCheckDenyBlank(true)
            return false
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DenyOrder",
            params: {
                id: i._id,
                reason: DenyReason,
                employee: deliverEmployee,
                status: 3,
            }
        }
        setLoad3(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    denyOrderKun()
                }).catch((e) => {
                    setLoad3(false)
                    console.log(e);
                })
        }, 1000);
    }

    const denyOrder = () => {
        if (DenyReason === "") {
            setCheckDenyBlank(true)
            return false
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DenyOrder",
            params: {
                id: i._id,
                reason: DenyReason,
                employee: deliverEmployee,
                status: 3,
            }
        }
        setLoad3(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad3(false)
                    setReset(true)
                    navigation.goBack()
                }).catch((e) => {
                    setLoad3(false)
                    setCheckDenyBlank(false)
                    console.log(e);
                })
        }, 1000);
    }

    const denyOrderWait = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DenyOrderWaiting",
            params: {
                id: i._id,
                employee: deliverEmployee,
                status: 6,
            }
        }
        setLoadReject(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoadReject(false)
                    setReset(true)
                    navigation.goBack()
                }).catch((et) => {
                    setLoadReject(false)
                    console.log(et);
                })
        }, 1000);
    }

    const cancelNormal = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DenyNormalOrder",
            params: {
                id: i._id,
                reason: "Cancel by manager",
                status: 6,
            }
        }
        setLoadReject(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoadReject(false)
                    setReset(true)
                    navigation.goBack()
                }).catch((et) => {
                    setLoadReject(false)
                    console.log(et);
                })
        }, 1000);
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
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
                    {i.employee.length > 0 ? (
                        i.employee.map((f: any) => {
                            return (
                                <View key={f.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Employee</Text>
                                    <Text style={{ fontSize: 15 }}>{f.email}</Text>
                                </View>
                            )
                        })
                    ) : null}
                    {i.denyreason ? (
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Deny reason</Text>
                            <Text style={{ fontSize: 15 }}>{i.denyreason}</Text>
                        </View>
                    ) : null}
                </View>
                {i.status === 4 && candecode.userRole === 3 ? (
                    <>
                        {candecode.userRole === 3 && i.paymentmethod?.type === "Vnpay" ? (
                            <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => setCancelPaid(true)}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel order</Text>
                            </TouchableOpacity>
                        ) : null}
                        {cancelPaid ? (
                            <CancelRequest setCancelPaid={setCancelPaid} i={i} deliverEmployee={deliverEmployee} fulltotal={fulltotal2} setReset={setReject} />
                        ) : null}
                        {candecode.userRole === 3 && i.paymentmethod?.type === "COD" ? (
                            <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => setReject(true)}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel order</Text>
                            </TouchableOpacity>
                        ) : null}
                        {reject ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => denyOrderWait()}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "gray", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setReject(false)}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </>
                ) : null}
                {i.status === 1 ? (
                    <>
                        <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#03ba5f", alignItems: "center", paddingVertical: 10 }} onPress={() => appoveOrder(i._id, i.orderitems)}>
                            {load ? (
                                <ActivityIndicator size={21} color={"#fff"} />
                            ) : (
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Accept order</Text>
                            )}
                        </TouchableOpacity>
                        {candecode.userRole === 3 && (i.paymentmethod.type === "Vnpay" || i.paymentmethod.type === "COD") ? (
                            <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => setWantDeny(true)}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Deny order</Text>
                            </TouchableOpacity>
                        ) : null}
                    </>
                ) : null}
                {wantDeny ? (
                    <View style={{ padding: 15, marginBottom: 15, flexDirection: "column", gap: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Reason deny :</Text>
                        {i.paymentmethod.type === "Vnpay" && i.paymentmethod.status === 2 ? (
                            <>
                                <TextInput multiline={true} onChange={(e) => setDenyReason(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "#fff", borderRadius: 6, height: 100, verticalAlign: "top" }} />
                                {checkDenyBlank ? (
                                    <Text style={{ color: "red", textAlign: "center" }}>This field cant be blank!</Text>
                                ) : null}
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => denyOrderPaid()}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setWantDeny(false)} style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <TextInput multiline={true} onChange={(e) => setDenyReason(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "#fff", borderRadius: 6, height: 100, verticalAlign: "top" }} />
                                {checkDenyBlank ? (
                                    <Text style={{ color: "red", textAlign: "center" }}>This field cant be blank!</Text>
                                ) : null}
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => denyOrder()}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setWantDeny(false)} style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                        {load3 ? (
                            <ActivityIndicator size={25} color={"#FEA116"} />
                        ) : null}
                    </View>
                ) : null}
                {i.employee.map((o: any) => {
                    if (o.id === candecode.userId && i.status === 2) {
                        return (
                            i.paymentmethod.status === 1 ? (
                                <TouchableOpacity key={o.id} style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 10 }} onPress={() => completeOrder(2)}>
                                    {load2 ? (
                                        <ActivityIndicator size={21} color={"#fff"} />
                                    ) : (
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Complete order</Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity key={o.id} style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 10 }} onPress={() => completeOrder(1)}>
                                    {load2 ? (
                                        <ActivityIndicator size={21} color={"#fff"} />
                                    ) : (
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Complete order</Text>
                                    )}
                                </TouchableOpacity>
                            )
                        )
                    }
                    return null
                })}
                {i.status === 2 && candecode.userRole === 3 ? (
                    <>
                        {i.paymentmethod?.type === "Vnpay" ? (
                            <>
                                <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => setCancelAprove(true)}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel order</Text>
                                </TouchableOpacity>
                                {cancelAprove ? (
                                    <CancelByMag setCancelAprove={setCancelAprove} i={i} fulltotal={fulltotal2} setReset={setReset} />
                                ) : null}
                            </>
                        ) : i.paymentmethod?.type === "COD" ? (
                            <>
                                <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => setNormalCancel(true)}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel order</Text>
                                </TouchableOpacity>
                                {normalCancel ? (
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                        <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => cancelNormal()}>
                                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "gray", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setNormalCancel(false)}>
                                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </>
                        ) : null}
                    </>
                ) : null}
                {loadReject ? (
                    <ActivityIndicator size={25} color={"#FEA116"} />
                ) : null}
            </View>
        </ScrollView>
    )
}
export default DetailCartEmp