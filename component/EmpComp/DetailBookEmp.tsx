import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, TextInput, Image, ActivityIndicator } from "react-native";
import { useState, Fragment, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import DrawerHeader from "../AdminComp/DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Clipboard from '@react-native-clipboard/clipboard';
import axios from "axios";

function DetailBookEmp({ route }: { route: any }) {
    const { i, candecode } = route.params
    const deliverEmployee = { id: candecode.userId, email: candecode.userEmail }
    const takeEmployee: any = []
    takeEmployee.push(deliverEmployee)
    const navigation = useNavigation<any>()
    const [table, setTable] = useState<any>([])
    const [GetTable, setGetTable] = useState([])
    // const [cancelReq, setCancelReq] = useState(false)
    // const [checkBlank, setCheckBlank] = useState(false)
    const [acceptTable, setAcceptTable] = useState(false)
    const [CheckTableId, setCheckTableId] = useState(false)
    // const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [tableHis, setTableHis] = useState<any>([])
    // const [cancelReason, setCancelReason] = useState("")
    const [TableId, setTableId] = useState<any>()
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const date = new Date(i.createdAt).toLocaleDateString()
    const time = new Date(i.createdAt).toLocaleTimeString()
    const datetime = date + " - " + time
    const date3 = new Date(i.date).toLocaleDateString()
    const time3 = new Date(i.date).toLocaleTimeString()
    const datetime3 = date3 + " - " + time3
    var datetime2 = null

    var fulltotal2 = 0
    var total2 = 0

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };

    useEffect(() => {
        if (i.status === 3) {
            getTableHis()
        }
        if (i.status === 2) {
            getTableServ()
        }
        if (i.status === 1) {
            getTableActive()
        }
    }, [i.status])

    function getTableActive() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetAllTableActive",
        }
        axios(configuration)
            .then((res) => {
                setGetTable(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    function getTableServ() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTableNativeBooking",
            params: {
                id: i._id
            }
        }
        axios(configuration)
            .then((res) => {
                setTable(res.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    function getTableHis() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetHistoryTableNativeBooking",
            params: {
                id: i._id
            }
        }
        axios(configuration)
            .then((res) => {
                setTableHis(res.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    // const denybooking = () => {
    //     const configuration = {
    //         method: "post",
    //         url: "http://localhost:3000/DenyBookingCustomer",
    //         data: {
    //             id: i._id,
    //             status: 4,
    //             denyreason: cancelReason,
    //             employee: takeEmployee
    //         }
    //     }
    //     if (cancelReason === "") {
    //         setCheckBlank(true)
    //         return false
    //     }
    //     setLoad(true)
    //     setTimeout(() => {
    //         axios(configuration)
    //             .then(() => {
    //                 setLoad(false)
    //                 setCancelReason("")
    //                 setCheckBlank(false)
    //                 setCancelReq(false)
    //                 navigation.goBack()
    //             }).catch((err) => {
    //                 setLoad(false)
    //                 console.log(err);
    //             })
    //     }, 1000);
    // }

    const addTableBooking = () => {
        if (TableId) {
            const configuration = {
                method: "post",
                url: "http://localhost:3000/AddTableCustomer",
                data: {
                    tableid: TableId._id,
                    tablename: TableId.tablename,
                    cusid: i._id
                }
            }
            setLoad2(true)
            setTimeout(() => {
                axios(configuration)
                    .then(() => {
                        setLoad2(false)
                        setTableId(null)
                        setCheckTableId(false)
                        setAcceptTable(false)
                        navigation.goBack()
                    }).catch((er) => {
                        console.log(er);
                        setLoad2(false)
                    })
            }, 1000);
        } else {
            setCheckTableId(true)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Detail Booking"} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: i.status === 1 ? "#FEA116" : i.status === 2 ? "#03ba5f" : i.status === 4 ? "tomato" : i.status === 3 ? "#03ba5f" : i.status === 5 ? "orange" : "", padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                        {i.status === 1 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Booking is pending to approve</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Please wait a few minutes...</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>🕒</Text>
                            </>
                        ) : i.status === 2 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Booking is being served</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Take your time and come to us!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                            </>
                        ) : i.status === 5 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Booking have been cancel</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35, fontWeight: "bold" }}>X</Text>
                            </>
                        ) : i.status === 4 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Booking have been denied</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35, fontWeight: "bold" }}>X</Text>
                            </>
                        ) : i.status === 3 ? (
                            <>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Booking have been completed</Text>
                                    <Text style={{ fontSize: 17, color: "#fff", }}>Thank you for using our services!</Text>
                                </View>
                                <Text style={{ color: "#fff", fontSize: 35 }}>👌</Text>
                            </>
                        ) : null}
                    </View>
                    <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Customer</Text> : {i.customer.fullname}</Text>
                            {i.status === 1 || i.status === 4 || i.status === 5 ? (
                                <Text style={{ fontSize: 15 }}><Icon name="user" solid size={18} /> {i.people} </Text>
                            ) : null}
                        </View>
                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Message</Text> : {i.message}</Text>
                        {i.status === 4 || i.status === 5 ? (
                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Reason</Text> : {i.denyreason}</Text>
                        ) : null}
                    </View>
                    {i.status === 2 || i.status === 3 ? (
                        <View style={{ backgroundColor: "#FFFFFF", padding: 10, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Table</Text> : {i.table}</Text>
                                <Text style={{ fontSize: 15 }}><Icon name="user" solid size={18} /> {i.people} </Text>
                            </View>
                            {i.status === 3 ? (
                                Object.values(tableHis).map((i: any) => {
                                    const date2 = new Date(i.datefinish).toLocaleDateString()
                                    const time2 = new Date(i.datefinish).toLocaleTimeString()
                                    datetime2 = date2 + " - " + time2
                                    return (
                                        <Fragment key={i._id}>
                                            {i.tableitems?.map((r: any) => {
                                                return (
                                                    <View key={r.item._id} style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                                        <Image source={{ uri: r.item.foodimage }} height={70} width={70} />
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{r.item.foodname}</Text>
                                                        <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {r.quantity}</Text>
                                                        <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(r.item.foodprice)}</Text>
                                                    </View>
                                                )
                                            })}
                                        </Fragment>
                                    )
                                })
                            ) : i.status === 2 ? (
                                Object.values(table).map((i: any) => {
                                    return (
                                        <Fragment key={i._id}>
                                            {i.tableitems?.map((r: any) => {
                                                var total = r.quantity * r.item.foodprice
                                                total2 += total
                                                fulltotal2 = total2
                                                return (
                                                    <View key={r.item._id} style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                                        <Image source={{ uri: r.item.foodimage }} height={70} width={70} />
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{r.item.foodname}</Text>
                                                        <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {r.quantity}</Text>
                                                        <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(r.item.foodprice)}</Text>
                                                    </View>
                                                )
                                            })}
                                        </Fragment>
                                    )
                                })
                            ) : null}
                            <View
                                style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.5,
                                    left: 5,
                                    right: 5,
                                    paddingVertical: 3
                                }}
                            />
                            {i.status === 3 ? (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fulltotal</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{VND.format(i.fulltotal)}</Text>
                                </View>
                            ) : i.status === 2 ? (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fulltotal</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{VND.format(fulltotal2)}</Text>
                                </View>
                            ) : null}
                        </View>
                    ) : null}
                    <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 10, paddingVertical: 15, marginBottom: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Booking id</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Text style={{ fontSize: 15 }}>{i._id}</Text>
                                <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                    <Text style={{ color: "#FEA116", fontSize: 17 }}>Copy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date booking</Text>
                            <Text style={{ fontSize: 15 }}>{datetime}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date arrived</Text>
                            <Text style={{ fontSize: 15 }}>{datetime3}</Text>
                        </View>
                        {i.status === 3 ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date complete</Text>
                                <Text style={{ fontSize: 15 }}>{datetime2}</Text>
                            </View>
                        ) : null}
                        {i.employee.length > 0 ? (
                            i.employee.map((q: any) => {
                                return (
                                    <View key={q.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Employee</Text>
                                        <Text style={{ fontSize: 15 }}>{q.email}</Text>
                                    </View>
                                )
                            })
                        ) : null}
                    </View>
                    {i.status === 1 ? (
                        <>
                            <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#03ba5f", alignItems: "center", paddingVertical: 10 }} onPress={() => setAcceptTable(true)}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Accept booking</Text>
                            </TouchableOpacity>
                            {acceptTable ? (
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ borderWidth: 1, borderColor: "gray", width: "100%" }}>
                                        <Picker
                                            style={{ backgroundColor: "#fff" }}
                                            selectedValue={TableId}
                                            onValueChange={(itemValue) =>
                                                setTableId(itemValue)
                                            }>
                                            <Picker.Item label="Choose table" value="" />
                                            {GetTable.map((a: any) => {
                                                return (
                                                    <Picker.Item key={a._id} label={a.tablename} value={a} />
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                    {CheckTableId ? (
                                        <Text style={{ color: "red", padding: 5 }}>Table is needed!</Text>
                                    ) : null}
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 10 }}>
                                        <TouchableOpacity style={{ backgroundColor: "#FEA116", padding: 8 }} onPress={() => addTableBooking()}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: "gray", padding: 8 }} onPress={() => setAcceptTable(false)}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {load2 ? (
                                        <ActivityIndicator size={22} color={"#FEA116"} />
                                    ) : null}
                                </View>
                            ) : null}
                            {/* <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "tomato", alignItems: "center", paddingVertical: 10 }} onPress={() => { setCancelReq(true); setAcceptTable(false) }}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Deny booking</Text>
                            </TouchableOpacity>
                            {cancelReq ? (
                                <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
                                    <Text style={{ paddingLeft: 15, fontSize: 15 }}>What's your deny reason ?</Text>
                                    <TextInput style={{ borderWidth: 1, borderColor: "gray", height: 100, verticalAlign: "top", padding: 10, marginHorizontal: 10, backgroundColor: "#fff" }} onChange={(e) => setCancelReason(e.nativeEvent.text)} />
                                    {checkBlank ? (
                                        <Text style={{ color: "red" }}>This field cant be blank!</Text>
                                    ) : null}
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 10 }}>
                                        <TouchableOpacity style={{ backgroundColor: "#FEA116", padding: 8 }} onPress={() => denybooking()}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: "gray", padding: 8 }} onPress={() => setCancelReq(false)}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : null}
                            {load ? (
                                <ActivityIndicator size={21} color={"#FEA116"} />
                            ) : null} */}
                        </>
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailBookEmp