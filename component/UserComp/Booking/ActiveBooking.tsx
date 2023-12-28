import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../../Header"
import Footer from "../../Footer"
import { useState, useEffect } from "react"
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome5"
import SplashScreen from 'react-native-splash-screen';

function ActiveBooking({ route, navigation }: { route: any, navigation: any }) {
    useEffect(() => {
        SplashScreen.show()
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000);
    }, [])
    const { userid } = route.params
    const [Booking, setBooking] = useState<any>([])
    const [cancelReq, setCancelReq] = useState(false)
    const [checkBlank, setCheckBlank] = useState(false)
    const [success, setSuccess] = useState(false)
    const [load, setLoad] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [cancelReason, setCancelReason] = useState("")

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getBooking()
            setCancelReq(false)
            setCheckBlank(false)
            setSuccess(false)
            setCancelReason("")
            setSuccess(false)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        getBooking()
    }, [userid])

    useEffect(() => {
        if (success) {
            getBooking()
            setCancelReq(false)
            setCheckBlank(false)
            setSuccess(false)
            setCancelReason("")
        }
    }, [success])

    function getBooking() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTokenBooking",
            params: {
                id: userid
            }
        }
        axios(configuration)
            .then((res) => {
                setBooking(res.data.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    const CancelBooking = (id: any) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/CancelBooking",
            data: {
                id: id,
                reason: cancelReason
            }
        }
        if (cancelReason === "") {
            setCheckBlank(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setSuccess(true)
                }).catch((er) => {
                    setLoad(false)
                    console.log(er);
                })
        }, 1000);
    }

    const date = new Date(Booking?.date).toLocaleDateString()
    const time = new Date(Booking?.date).toLocaleTimeString()
    const datetime = date + " - " + time
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, paddingVertical: 15, backgroundColor: "#fff" }}>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#0F172B" }}>Active Booking</Text>
                    {Booking ? (
                        <TouchableOpacity style={bookingStyle.cardStyle} onPress={() => navigation.navigate("DetailBooking", { i: Booking })}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                    <Text style={{ fontSize: 15 }}>{Booking.customer?.fullname}</Text>
                                </View>
                                {Booking.status === 1 ? (
                                    <Text style={{ fontSize: 15, color: "#fca103" }}>🕒 Pending</Text>
                                ) : Booking.status === 2 ? (
                                    <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Serving</Text>
                                ) : null}
                            </View>
                            <Text style={{ fontSize: 15, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Date arrvived</Text> : {datetime}</Text>
                            {Booking.status === 1 ? (
                                <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>People</Text> : {Booking.people}</Text>
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
                            <View style={{ marginVertical: 5 }}>
                                {Booking.status === 1 ? (
                                    <>
                                        <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: "tomato", alignItems: "center" }} onPress={() => setCancelReq(true)}>
                                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel booking</Text>
                                        </TouchableOpacity>
                                        {cancelReq ? (
                                            <View style={{ flexDirection: "column", gap: 10, marginTop: 10 }}>
                                                <Text style={{ paddingLeft: 5, fontSize: 15 }}>Please tell us why you cancel?</Text>
                                                <TextInput style={{ borderWidth: 1, borderColor: "gray", height: 100, verticalAlign: "top", padding: 10 }} onChange={(e) => setCancelReason(e.nativeEvent.text)} />
                                                {checkBlank ? (
                                                    <Text style={{ color: "red" }}>This field cant be blank!</Text>
                                                ) : null}
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 10 }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", padding: 8 }} onPress={() => CancelBooking(Booking._id)}>
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
                                        ) : null}
                                    </>
                                ) : Booking.status === 2 ? (
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Table : </Text>{Booking.table}</Text>
                                        <Text style={{ fontSize: 15 }}><Icon name="user" solid size={18} /> {Booking.people}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ fontSize: 15, paddingVertical: 15, textAlign: "center" }}>There's no active booking!</Text>
                    )}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const bookingStyle = StyleSheet.create({
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
export default ActiveBooking