import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../Footer";
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import StateComplete from "./StateComplete";

function CompletePage({ index, jumpTo, vnpayParamsMain, paypalParamsMain, setVnpayParamsMain, setPaypalParamsMain }: { index: any, jumpTo: any, vnpayParamsMain: any, paypalParamsMain: any, setVnpayParamsMain: any, setPaypalParamsMain: any }) {
    const navigation = useNavigation<any>()
    const [candecode, setCandecode] = useState<any>(null)
    const [haveD, setHaveD] = useState(false)
    const [paypalCant, setPayPalCant] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [checkCunt, setCheckCunt] = useState(false)
    const [responseCode, setResponseCode] = useState<any>()
    const [date, setDate] = useState<any>()
    const [amount, setAmount] = useState<any>()
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const getDataExists = async () => {
        try {
            const token = await AsyncStorage.getItem('complete');
            if (token) {
                setCheckCunt(true)
                setCandecode(token)
            } else {
                jumpTo("first")
                setCandecode(null)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (checkCunt) {
            const funcX = async () => {
                const wait = await AsyncStorage.getItem("complete")
                if (wait) {
                    setTimeout(async () => {
                        await AsyncStorage.removeItem("complete")
                        setVnpayParamsMain(null)
                        setPaypalParamsMain(null)
                    }, 60000);
                }
            }
            funcX()
        }
    }, [checkCunt])

    const fetchItNow = async () => {
        try {
            const token = await AsyncStorage.getItem('complete');
            if (token) {
                const configuration = {
                    method: "post",
                    url: "http://localhost:3000/PaidCodPayment",
                    params: {
                        id: token
                    }
                }
                axios(configuration).then(() => { }).catch((err) => { console.log(err); })
            }
        } catch (er) {
            console.log(er);
        }
    }

    const callingPayP = async () => {
        try {
            const token = await AsyncStorage.getItem('complete');
            if (token) {
                const configuration = {
                    method: "post",
                    url: "http://localhost:3000/PaidPaypalPayment",
                    params: {
                        id: token
                    }
                }
                axios(configuration).then(() => { }).catch((err) => { console.log(err); })
            }
        } catch (er) {
            console.log(er);
        }
    }

    const cancelPayP = async () => {
        try {
            const token = await AsyncStorage.getItem('complete');
            if (token) {
                const configuration = {
                    method: "post",
                    url: "http://localhost:3000/CancelPaypalPayment",
                    params: {
                        id: token
                    }
                }
                axios(configuration).then(() => { }).catch((err) => { console.log(err); })
            }
        } catch (er) {
            console.log(er);
        }
    }

    useEffect(() => {
        if (index === 2) {
            getDataExists()
            if (paypalParamsMain) {
                setHaveD(false)
                if (paypalParamsMain === "Success") {
                    callingPayP()
                    setPayPalCant(false)
                } else {
                    cancelPayP()
                    setPayPalCant(true)
                }
            }
            if (vnpayParamsMain) {
                setHaveD(true)
                const type = vnpayParamsMain.searchParams.get("vnp_ResponseCode")
                const type2 = vnpayParamsMain.searchParams.get("vnp_Amount")
                const type3 = vnpayParamsMain.searchParams.get("vnp_PayDate")
                const type4 = vnpayParamsMain.searchParams.get("vnp_TxnRef")
                var year = type3.substring(0, 4);
                var month = type3.substring(4, 6);
                var day = type3.substring(6, 8);
                var hour = type3.substring(8, 10)
                var minute = type3.substring(10, 12)
                var second = type3.substring(12, 14)
                var sendDate = new Date(year, month - 1, day, hour, minute, second)
                var dow = new Date(year, month - 1, day, hour, minute, second).toLocaleDateString()
                var tim = new Date(year, month - 1, day, hour, minute, second).toLocaleTimeString()
                setDate(dow + " - " + tim)
                setAmount(type2)
                setResponseCode(type)

                var kakao = null
                if (type === '24') {
                    kakao = "Customer cancels transaction"
                }
                if (type === '15') {
                    kakao = "Customer did not make the transaction"
                }
                if (type === '09') {
                    kakao = "Customer's card/account has not registered for InternetBanking service at the bank."
                }
                if (type === '10') {
                    kakao = "Customers verify incorrect card/account information more than 3 times"
                }
                if (type === '11') {
                    kakao = "Payment deadline has expired."
                }
                if (type === '12') {
                    kakao = "Customer's card/account is locked."
                }
                if (type === '13') {
                    kakao = "You entered the wrong transaction authentication password (OTP)."
                }
                if (type === '51') {
                    kakao = "Your account does not have enough balance to make a transaction."
                }
                if (type === '65') {
                    kakao = "Your account has exceeded the daily transaction limit."
                }
                if (type === '75') {
                    kakao = "The payment bank is under maintenance."
                }
                if (type === '79') {
                    kakao = "The customer enters the wrong payment password more than the specified number of times."
                }
                if (type === '99') {
                    kakao = "Other errors."
                }

                if (type4) {
                    const configuration = {
                        method: "post",
                        url: "http://localhost:3000/ChangeVnpayDate",
                        data: {
                            id: type4,
                            date: sendDate
                        }
                    }
                    axios(configuration).then(() => { }).catch((err) => { console.log(err); })
                }

                if (type === "24" || type === "09" || type === "10" || type === "11" || type === "12" || type === "13" || type === "51" || type === "65" || type === "75" || type === "79" || type === "99" || type === "15") {
                    const configuration = {
                        method: "post",
                        url: "http://localhost:3000/CancelVnpayPayment",
                        params: {
                            reason: kakao,
                            id: type4
                        }
                    }
                    axios(configuration).then(() => { }).catch((err) => { console.log(err); })
                } else {
                    const configuration = {
                        method: "post",
                        url: "http://localhost:3000/PaidVnpayPayment",
                        params: {
                            id: type4
                        }
                    }
                    axios(configuration).then(() => { }).catch((err) => { console.log(err); })
                }
            }
            if (vnpayParamsMain === null && paypalParamsMain === null) {
                setHaveD(false)
                fetchItNow()
            }
        }
    }, [index, vnpayParamsMain])

    const copyToClipboard = (e: any) => {
        Clipboard.setString(e);
    };

    return (
        <>
            {haveD ? (
                <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                    <StateComplete responseCode={responseCode} candecode={candecode} amount={amount} date={date} />
                    <Footer />
                </ScrollView >
            ) : (
                <>
                    {paypalCant ? (
                        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", height: 400 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center", color: "#FEA116" }}>Transaction Failed!</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Order id</Text> : {candecode}</Text>
                                    <TouchableOpacity onPress={() => copyToClipboard(candecode)}>
                                        <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Reason</Text> : Customer cancel transaction</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 20 }}>
                                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Searchs")}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🔍</Text> Search detail</Text>
                                    </TouchableOpacity>
                                    <Text>Or</Text>
                                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Categorys")}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🛍️</Text> Go shopping</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={{ uri: "https://cdn.icon-icons.com/icons2/881/PNG/512/Rice_Bowl_icon-icons.com_68695.png" }} width={150} height={150} />
                                </View>
                            </View>
                            <Footer />
                        </ScrollView >
                    ) : (
                        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", height: 350 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center", color: "#FEA116" }}>Thank You!</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Order id</Text> : {candecode}</Text>
                                    <TouchableOpacity onPress={() => copyToClipboard(candecode)}>
                                        <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 20 }}>
                                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Searchs")}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🔍</Text> Search detail</Text>
                                    </TouchableOpacity>
                                    <Text>Or</Text>
                                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Categorys")}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🛍️</Text> Go shopping</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={{ uri: "https://cdn.icon-icons.com/icons2/881/PNG/512/Rice_Bowl_icon-icons.com_68695.png" }} width={150} height={150} />
                                </View>
                            </View>
                            <Footer />
                        </ScrollView >
                    )}
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: "#f9f9f9", paddingVertical: 8, paddingHorizontal: 10
    }
})

export default CompletePage