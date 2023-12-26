import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, ImageBackground, StyleSheet, ActivityIndicator, Dimensions, TextInput, Pressable } from "react-native";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState, useEffect } from "react";
import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5"

function Booking({ route, navigation }: { route: any, navigation: any }) {
    const datenow = Date.now()
    const [refresh, setFresh] = useState(false);
    const [checkDate, setCheckDate] = useState(false)
    const [alertCheck, setAlertCheck] = useState(false)
    const [checkPeople, setCheckPeople] = useState(false)
    const [wantCancel, setWantCancel] = useState(false)
    const [checkBlank, setCheckBlank] = useState(false)
    const [success, setSuccess] = useState(false)
    const [success2, setSuccess2] = useState(false)
    const [success3, setSuccess3] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [open, setOpen] = useState(false)
    const [candecode, setCandecode] = useState<any>(null)
    const [getUser, setGetUser] = useState([])
    const [bookingBook, setBookingBook] = useState<any>(null)
    const [date, setDate] = useState<any>(new Date(datenow))
    const [name, setName] = useState("")
    const [tokeId, setTokeId] = useState("None")
    const [people, setPeople] = useState<any>(null)
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [cancelReason, setCancelReason] = useState("")
    const datetime = new Date().getTime()
    const date2 = new Date(date).getTime()
    const checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setSuccess(true)
            setFresh(false)
        }, 1000)
    }


    useEffect(() => {
        setDate(new Date(datenow))
        setName("")
        setTokeId("None")
        setPeople(null)
        setPhone("")
        setMessage("")
        setCheckPeople(false)
        setCancelReason("")
        setCheckBlank(false)
        setCheckDate(false)
        setAlertCheck(false)
        setWantCancel(false)
        setOpen(false)
        if (candecode) {
            getUserX(candecode)
            getBookingX(candecode)
        }
        setSuccess(false)
    }, [success])

    useEffect(() => {
        if (route.params.candecode) {
            const decode = route.params.candecode
            setCandecode(decode)
            getUserX(decode)
            getBookingX(decode)
        }
    }, [route.params.candecode])

    function getUserX(decode: any) {
        if (decode.userRole !== 1.5) {
            const configuration = {
                method: "get",
                url: "http://192.168.1.216:3000/GetDetailUser",
                params: {
                    userid: decode.userId
                }
            }
            axios(configuration)
                .then((res) => {
                    setGetUser(res.data)
                }).catch((er) => {
                    console.log(er);
                })
        }

    }

    function getBookingX(decode: any) {
        const configuration2 = {
            method: "get",
            url: "http://192.168.1.216:3000/GetTokenBooking",
            params: {
                id: decode.userId
            }
        }
        axios(configuration2)
            .then((res) => {
                setBookingBook(res.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    useEffect(() => {
        if (candecode) {
            if (candecode?.userRole !== 1.5) {
                Object.values(getUser).map((i: any) => {
                    setName(i.fullname)
                    setPhone(i.phonenumber)
                    setTokeId(i._id)
                    return null
                })
            } else if (candecode?.userRole === 1.5) {
                setName(candecode?.userName)
                setTokeId(candecode?.userId)
            }
        }
    }, [date2, datetime, candecode?.userRole, getUser, candecode?.userName, candecode?.userId])

    useEffect(() => {
        if (phone !== "") {
            if (!checkPhone.test(phone)) {
                setAlertCheck(true)
            } else {
                setAlertCheck(false)
            }
        }
    }, [phone])

    const AddNewTable = () => {
        const customer = { id: tokeId, fullname: name, phonenumber: phone }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/AddNewBooking",
            data: {
                customer,
                date,
                people,
                message
            }
        }
        if (date2 < datetime) {
            setCheckDate(true)
            return false
        }
        if (!people) {
            setCheckPeople(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setSuccess2(true)
                    setTimeout(() => {
                        setSuccess2(false)
                    }, 3000);
                    setSuccess(true)
                }).catch((error) => {
                    setLoad(false)
                    console.log(error);
                })
        }, 1000);
    }

    const CancelBooking = (id: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/CancelBooking",
            data: {
                id: id,
                reason: cancelReason
            }
        }
        if (cancelReason === "") {
            setCheckBlank(true)
            return false
        }
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    setSuccess3(true)
                    setTimeout(() => {
                        setSuccess3(false)
                    }, 3000);
                    setSuccess(true)
                }).catch((er) => {
                    console.log(er);
                    setLoad2(false)
                })
        }, 1000);
    }

    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={PnT.bgimage} />
                    <View style={PnT.overlay}>
                        <View style={{ top: 180, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={PnT.notiText}>Booking</Text>
                            <View style={PnT.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>Home</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{"/"}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Booking</Text>
                            </View>
                        </View>
                    </View >
                    <View style={PnT.notifi}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#FEA116" }}>Booking information !</Text>
                        {bookingBook?.data ? (
                            <View style={{ flexDirection: "column", gap: 15, paddingVertical: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", gap: 3 }}>
                                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Name</Text>
                                        <Text>:</Text>
                                        <Text style={{ fontSize: 17 }}>{bookingBook.data.customer.fullname}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", gap: 5 }}>
                                        <Icon name="user-alt" size={20} />
                                        <Text style={{ fontSize: 17 }}>{bookingBook.data.people.toString()}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 0.3,
                                        left: 5,
                                        right: 5,
                                        paddingVertical: 3
                                    }}
                                />
                                <View style={{ flexDirection: "row", gap: 3 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Phone number</Text>
                                    <Text>:</Text>
                                    <Text style={{ fontSize: 17 }}>{bookingBook.data.customer.phonenumber}</Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 3 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Date & time</Text>
                                    <Text>:</Text>
                                    <Text style={{ fontSize: 17 }}>{new Date(bookingBook.data.date).toLocaleString()}</Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: 3 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Note</Text>
                                    <Text>:</Text>
                                    <Text style={{ fontSize: 17 }}>{bookingBook.data.message}</Text>
                                </View>
                                <View
                                    style={{
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 0.3,
                                        left: 5,
                                        right: 5,
                                        paddingVertical: 3
                                    }}
                                />
                                {bookingBook.data.status === 1 ? (
                                    <>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 15, color: "orange" }}>🕒 Pending</Text>
                                            <TouchableOpacity style={{ backgroundColor: "tomato", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => setWantCancel(true)}>
                                                <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel booking</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {wantCancel ? (
                                            <>
                                                <View
                                                    style={{
                                                        borderBottomColor: 'gray',
                                                        borderBottomWidth: 0.3,
                                                        left: 5,
                                                        right: 5,
                                                        paddingVertical: 3
                                                    }}
                                                />
                                                <Text style={{ fontSize: 15 }}>Please tell us why you want to cancel?</Text>
                                                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10, height: 100, verticalAlign: "top" }} value={cancelReason} onChange={(e) => setCancelReason(e.nativeEvent.text)} />
                                                {checkBlank ? (
                                                    <Text style={{ color: "red" }}>This field cant be blank!</Text>
                                                ) : null}
                                                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => CancelBooking(bookingBook.data._id)}>
                                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => setWantCancel(false)}>
                                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {load2 ? (
                                                    <ActivityIndicator size={21} color={"#FEA116"} />
                                                ) : null}
                                            </>
                                        ) : null}
                                    </>
                                ) : bookingBook.data.status === 2 ? (
                                    <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Accepted, enjoy your meal!</Text>
                                ) : null}
                            </View>
                        ) : (
                            <View style={{ flexDirection: "column", gap: 15, paddingVertical: 15 }}>
                                {candecode ? null : (
                                    <>
                                        <View style={{ flexDirection: "column", gap: 3 }}>
                                            <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Name</Text>
                                            <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={name} onChange={(e) => setName(e.nativeEvent.text)} />
                                        </View>
                                        <View style={{ flexDirection: "column", gap: 3 }}>
                                            <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Phone number</Text>
                                            <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)} />
                                            {alertCheck ? (
                                                <Text style={{ color: "red" }}>Phone number invalid!</Text>
                                            ) : null}
                                        </View>
                                    </>
                                )}
                                {candecode ? (
                                    <>
                                        {candecode.userRole === 1.5 ? (
                                            <View style={{ flexDirection: "column", gap: 3 }}>
                                                <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Phone number</Text>
                                                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={phone} onChange={(e) => setPhone(e.nativeEvent.text)} />
                                                {alertCheck ? (
                                                    <Text style={{ color: "red" }}>Phone number invalid!</Text>
                                                ) : null}
                                            </View>
                                        ) : null}
                                    </>
                                ) : null}
                                <View style={{ flexDirection: "column", gap: 3 }}>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Date & time</Text>
                                    <View>
                                        <TouchableOpacity onPress={() => setOpen(true)} style={{ borderWidth: 1, borderRadius: 6, borderColor: "gray", paddingVertical: 8, paddingHorizontal: 10, height: 50, justifyContent: "center" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <Text style={{ fontSize: 15, color: "#0F172B" }}>{new Date(date).toLocaleString()}</Text>
                                                <Text style={{ fontSize: 15 }}>▼</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {checkDate ? (
                                            <Text style={{ color: "red", paddingLeft: 5 }}>Date & time cant smaller than present</Text>
                                        ) : null}
                                        <DatePicker
                                            modal
                                            open={open}
                                            date={date}
                                            onConfirm={(date) => {
                                                setOpen(false)
                                                setDate(date)
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "column", gap: 3 }}>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>People</Text>
                                    <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 6 }}>
                                        <Picker
                                            selectedValue={people}
                                            onValueChange={(itemValue) =>
                                                setPeople(itemValue)
                                            }
                                            style={{ color: "#0F172B", height: 50 }}>
                                            <Picker.Item label="Choose number of people" value={null} />
                                            <Picker.Item label="1 people" value={1} />
                                            <Picker.Item label="2 people" value={2} />
                                            <Picker.Item label="3 people" value={3} />
                                            <Picker.Item label="4 people" value={4} />
                                            <Picker.Item label="5 people" value={5} />
                                        </Picker>
                                    </View>
                                    {checkPeople ? (
                                        <Text style={{ color: "red", paddingLeft: 5 }}>Number of people invalid!</Text>
                                    ) : null}
                                </View>
                                <View style={{ flexDirection: "column", gap: 3 }}>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5 }}>Note</Text>
                                    <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10, height: 100, verticalAlign: "top" }} value={message} onChange={(e) => setMessage(e.nativeEvent.text)} />
                                </View>
                                <TouchableOpacity style={{ backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 10, marginTop: 10 }} onPress={() => AddNewTable()}>
                                    {load ? (
                                        <ActivityIndicator size={21} color={"#fff"} />
                                    ) : (
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Submit</Text>
                                    )}
                                </TouchableOpacity>
                                {success2 ? (
                                    <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Booking table succeeded!</Text>
                                ) : null}
                                {success3 ? (
                                    <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Cancel table succeeded!</Text>
                                ) : null}
                            </View>
                        )}
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const PnT = StyleSheet.create({
    notifi: {
        backgroundColor: "#fff",
        padding: 15,
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: "cover",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 43, .9)',
    },

    notiText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25
    },

    flexible: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15
    }
})
export default Booking