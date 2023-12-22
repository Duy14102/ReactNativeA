import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { WebView } from 'react-native-webview';
import 'react-native-url-polyfill/auto';
import config from "../../config";
global.Buffer = require('buffer').Buffer;

function CheckoutPage({ jumpTo, index, shippingFee, setVnpayParamsMain, setPaypalParamsMain }: { jumpTo: any, index: any, shippingFee: any, setVnpayParamsMain: any, setPaypalParamsMain: any }) {
    var orderitems: any = []
    const [candecode, setCandecode] = useState<any>(null)
    const [checkVal, setCheckVal] = useState(false)
    const [Card, setCard] = useState("Not choose")
    const [datas, setDatas] = useState<any>()
    const scrollViewRef = useRef<any>(null);
    const [paymentMethodChoose, setPaymentMethodChoose] = useState(false)
    const [SaveAddress, setSaveAddress] = useState(false)
    const [accountAddress, setAccountAddress] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [vnpay, setVnpay] = useState(false)
    const [checkInfo, setCheckInfo] = useState(false)
    const [load, setLoad] = useState(false)
    const [success, setSuccess] = useState(false)
    const [checkP, setCheckP] = useState(false)
    const [checkedPh, setCheckedPh] = useState(false)
    const [checkCardChoose, setCheckCardChoose] = useState(false)
    const [loadWebV, setLoadWebV] = useState(false)
    const [webV, setWebV] = useState<any>()
    const [bankCode, setBankCode] = useState("")
    const [paypalState, setPaypalState] = useState(false)
    const [loadAddress, setLoadAddress] = useState<any>()
    const [address, setAddress] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [fullname, setFullname] = useState("")
    const [vnpayParams, setVnpayParams] = useState("")
    const [accessToke, setAccessToke] = useState("")

    var checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setSuccess(true)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (success) {
            getUserExists()
            dataHandler()
            setCard("Not choose")
            setPaymentMethodChoose(false)
            setSaveAddress(false)
            setVnpay(false)
            setPaypalState(false)
            setCheckCardChoose(false)
            setCheckInfo(false)
            setCheckP(false)
            setAddress("")
            setPhonenumber("")
            setFullname("")
            setBankCode("")
            setSuccess(false)
        }
    }, [success])

    useEffect(() => {
        if (vnpayParams.includes("vnp_ResponseCode")) {
            setLoadWebV(true)
            const queryParameters = new URL(vnpayParams)
            setVnpayParamsMain(queryParameters)
            setVnpayParams("")
            setWebV(null)
            jumpTo("third")
            setLoadWebV(false)
        }
        if (vnpayParams.includes("paymentId=PAYID")) {
            setLoadWebV(true)
            setWebV(null)
            const queryX = new URL(vnpayParams)
            const PayerID = queryX.searchParams.get("PayerID")
            const paymentId = queryX.searchParams.get("paymentId")
            fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
                method: "POST",
                body: JSON.stringify({ "payer_id": PayerID }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToke}`
                }
            }).then((res) => res.json()).then(() => {
                setPaypalParamsMain("Success")
                setVnpayParams("")
                jumpTo("third")
            }).then(() => { setLoadWebV(false) }).catch((err) => { console.log(err) })
        }
        if (vnpayParams.includes("?token=EC")) {
            setLoadWebV(true)
            jumpTo("third")
            setPaypalParamsMain("Cancel")
            setVnpayParams("")
            setWebV(null)
            setLoadWebV(false)
        }
    }, [vnpayParams])

    const dataHandler = async () => {
        const called = await AsyncStorage.getItem("cart")
        if (called) {
            var val = JSON.parse(called)
            let overCount = []
            for (const arrist of val) {
                const res = await fetch(`http://localhost:3000/GetCartItem?name=${arrist.name}&quantity=${arrist.quantity}`)
                const resD = await res.json()
                overCount.push(resD)
            }
            setCheckVal(false)
            setDatas(overCount)
        } else {
            await AsyncStorage.removeItem("cart")
            setCheckVal(true)
        }
    }

    const getUserExists = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            if (token) {
                setCandecode(jwtDecode(token))
            } else {
                setCandecode(null)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (index === 1) {
            dataHandler()
            getUserExists()
        }
    }, [index])

    useEffect(() => {
        if (phonenumber !== "") {
            if (!checkPhone.test(phonenumber)) {
                setCheckedPh(true)
            } else {
                setCheckedPh(false)
            }
        }
    }, [phonenumber])

    useEffect(() => {
        if (candecode) {
            if (candecode.userRole !== 1.5) {
                setFullname(candecode.userName)
                const configuration7 = {
                    method: "get",
                    url: "http://localhost:3000/GetDetailUser",
                    params: {
                        userid: candecode.userId
                    }
                };
                axios(configuration7)
                    .then((result) => {
                        setPhonenumber(result.data.data.phonenumber)
                        setLoadAddress(result.data.data.address)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [candecode])

    const VnpayCheckout = (data: any) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/VnpayCheckout",
            data: {
                amount: fulltotal,
                bankCode: bankCode,
                orderId: data
            }
        }
        axios(configuration)
            .then(async (res) => {
                await AsyncStorage.setItem("complete", data)
                setWebV(res.data)
            })
            .catch((err) => console.log(err + " errr"))
    }

    function callPaypal(fullT: any, data: any) {
        const money = fullT / 25000
        const dataDetail = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": `${money}`,
                    "currency": "USD",
                    "details": {
                        "subtotal": `${money}`,
                        "tax": "0",
                        "shipping": "0",
                        "handling_fee": "0",
                        "shipping_discount": "0",
                        "insurance": "0"
                    }
                }
            }],
            "redirect_urls": {
                "return_url": "http://localhost:8081",
                "cancel_url": "http://localhost:8081"
            }
        }
        var toketoke = null
        const clientid: any = config.REACT_APP_paypal_clientid
        const key: any = config.REACT_APP_paypal_secretKey

        fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: "Basic " + Buffer.from(clientid + ":" + key).toString("base64")
            }
        }).then((res) => res.json()).then((responseR) => {
            toketoke = responseR.access_token
            setAccessToke(responseR.access_token)
            fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${toketoke}`
                },
                body: JSON.stringify(dataDetail)
            }).then((res) => res.json()).then(async (response2) => {
                const { id, links } = response2
                const approveUrl = links.find((data: any) => data.rel == "approval_url")
                await AsyncStorage.setItem("complete", data)
                setWebV(approveUrl.href)
            }).catch((er) => { console.log(er) })
        })
    }

    const SubmitOrder = (fullTT: any) => {
        var paymentmethod = null
        if (Card === "Pay with card (ATM)") {
            paymentmethod = 1
        } else if (Card === "Cash on delivery (COD)") {
            paymentmethod = 2
        }
        const userx = []
        if (candecode) {
            if (candecode.userRole === 1.5) {
                const nit = { id: candecode.userId, fullname: candecode.userName }
                userx.push(nit)
            } else {
                const nit = { id: candecode.userId, fullname: fullname }
                userx.push(nit)
            }
        } else {
            const nat = { id: "none", fullname: fullname }
            userx.push(nat)
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/UploadOrder",
            data: {
                user: userx,
                phonenumber: phonenumber,
                address: address,
                paymentmethod: paymentmethod,
                shippingfee: shippingFee,
                orderitems: orderitems
            }
        }
        if (candecode) {
            if (address === "") {
                setCheckInfo(true)
                return false
            }
        } else {
            if (fullname === "" || phonenumber === "" || address === "") {
                setCheckInfo(true)
                return false
            }
        }
        if (Card === "Not choose") {
            setCheckP(true)
            return false
        }
        if (checkedPh) {
            return false
        }
        if (Card === "Pay with card (ATM)" && vnpay === false && paypalState === false) {
            setCheckCardChoose(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(async (res) => {
                    if (SaveAddress) {
                        const configuration2 = {
                            method: "post",
                            url: "http://localhost:3000/AddAddressUser",
                            data: {
                                id: candecode.userId,
                                address: address
                            }
                        }
                        axios(configuration2)
                            .then(() => { }).catch((e) => { console.log(e); })
                    }
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ y: 0, animated: true })
                    }
                    setLoad(false)
                    setSuccess(true)
                    const data = res.data.message
                    await AsyncStorage.removeItem("cart")
                    if (Card === "Pay with card (ATM)" && vnpay) {
                        setLoadWebV(true)
                        VnpayCheckout(data)
                    } if (Card === "Pay with card (ATM)" && paypalState) {
                        setLoadWebV(true)
                        callPaypal(fullTT, data)
                    } if (Card === "Cash on delivery (COD)") {
                        await AsyncStorage.setItem("complete", data).then(() => { jumpTo("third") })
                    }
                }).catch((err) => {
                    setLoad(false)
                    console.log(err + " kakaka");
                })
        }, 1000);
    }

    function hideSpinner() {
        setLoadWebV(false)
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    var total2 = 0
    var fulltotal = 0

    return (
        <>
            {webV ? (
                <View style={{ flex: 1 }}>
                    <WebView onLoad={() => hideSpinner()} source={{ uri: webV }} onNavigationStateChange={(e) => setVnpayParams(e.url)} />
                    <View style={{ backgroundColor: "#fff", height: 100 }} />
                </View>
            ) : (
                <ScrollView ref={scrollViewRef} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                    <View style={{ flex: 1 }}>
                        {checkVal ? (
                            loadWebV ? (
                                <View style={{ backgroundColor: "#fff", alignItems: "center", justifyContent: "center", width: "100%", height: 300 }}>
                                    <ActivityIndicator size={45} color={"#FEA116"} />
                                </View>
                            ) : (
                                <View style={{ flexDirection: "column", alignItems: "center", gap: 10, padding: 15, height: 300 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>You haven't checkout anything!</Text>
                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => jumpTo("first")}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Return to cart</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        ) : (
                            <>
                                <View style={{ backgroundColor: "#fff", flexDirection: "column", padding: 15, marginBottom: 25 }}>
                                    <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Let us know about you!</Text>
                                    {candecode ? null : (
                                        <>
                                            <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>Name</Text>
                                                <TextInput value={fullname} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setFullname(e.nativeEvent.text)} />
                                            </View>
                                            <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>Phone number</Text>
                                                <TextInput value={phonenumber} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setPhonenumber(e.nativeEvent.text)} />
                                                {checkedPh ? (
                                                    <Text style={{ color: "red", paddingLeft: 5 }}>Phone number invalid!</Text>
                                                ) : null}
                                            </View>
                                            <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>Address</Text>
                                                <TextInput value={address} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setAddress(e.nativeEvent.text)} />
                                            </View>
                                        </>
                                    )}
                                    {candecode ? (
                                        candecode.userRole === 1.5 ? (
                                            <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>Phone number</Text>
                                                <TextInput value={phonenumber} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setPhonenumber(e.nativeEvent.text)} />
                                                {checkedPh ? (
                                                    <Text style={{ color: "red", paddingLeft: 5 }}>Phone number invalid!</Text>
                                                ) : null}
                                                <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 20 }}>Address</Text>
                                                <TextInput value={address} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setAddress(e.nativeEvent.text)} />
                                            </View>
                                        ) : (
                                            <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                                <Text style={{ fontSize: 15, paddingLeft: 5 }}>Address</Text>
                                                {accountAddress ? (
                                                    <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6 }}>
                                                        <Picker
                                                            selectedValue={address}
                                                            onValueChange={(itemValue) =>
                                                                setAddress(itemValue)
                                                            }>
                                                            <Picker.Item label="Choose address" value="" />
                                                            {loadAddress?.map((t: any) => {
                                                                return (
                                                                    <Picker.Item key={t} label={t} value={t} />
                                                                )
                                                            })}
                                                        </Picker>
                                                    </View>
                                                ) : (
                                                    <TextInput value={address} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} onChange={(e) => setAddress(e.nativeEvent.text)} />
                                                )}
                                                {accountAddress ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, opacity: 0.5 }}>
                                                        <View style={{ borderWidth: 1, borderColor: "gray", backgroundColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5 }} />
                                                        <Text style={{ fontSize: 15 }}>Save this address</Text>
                                                    </View>
                                                ) : (
                                                    SaveAddress ? (
                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => setSaveAddress(false)}>
                                                            <View style={{ alignItems: "center", borderWidth: 1, borderColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5, backgroundColor: "#03ba5f" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>✓</Text>
                                                            </View>
                                                            <Text style={{ fontSize: 15 }}>Save this address</Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => setSaveAddress(true)}>
                                                            <View style={{ borderWidth: 1, borderColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5 }} />
                                                            <Text style={{ fontSize: 15 }}>Save this address</Text>
                                                        </TouchableOpacity>
                                                    )
                                                )}
                                                {SaveAddress ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, opacity: 0.5 }}>
                                                        <View style={{ borderWidth: 1, backgroundColor: "gray", borderColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5 }} />
                                                        <Text style={{ fontSize: 15 }}>Use the account address </Text>
                                                    </View>
                                                ) : (
                                                    accountAddress ? (
                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => setAccountAddress(false)}>
                                                            <View style={{ alignItems: "center", borderWidth: 1, borderColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5, backgroundColor: "#03ba5f" }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>✓</Text>
                                                            </View>
                                                            <Text style={{ fontSize: 15 }}>Use the account address</Text>
                                                        </TouchableOpacity>
                                                    ) : (
                                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => setAccountAddress(true)}>
                                                            <View style={{ borderWidth: 1, borderColor: "gray", width: 20, height: 20, marginLeft: 3, marginVertical: 5 }} />
                                                            <Text style={{ fontSize: 15 }}>Use the account address</Text>
                                                        </TouchableOpacity>
                                                    )
                                                )}
                                            </View>
                                        )
                                    ) : null}
                                    {checkInfo ? (
                                        <Text style={{ color: "red" }}>These field are required!</Text>
                                    ) : null}
                                </View>
                                <View style={{ backgroundColor: "#fff", flexDirection: "column", padding: 15 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 5 }}>
                                        <Text style={{ width: "70%", fontWeight: "bold", fontSize: 17 }}>Items</Text>
                                        <Text style={{ width: "30%", fontWeight: "bold", fontSize: 17, textAlign: "right" }}>Total</Text>
                                    </View>
                                    {datas?.map((i: any) => {
                                        return (
                                            i.data.map((a: any) => {
                                                var total = a.foodprice * i.quantity
                                                total2 += total
                                                fulltotal = total2 + shippingFee
                                                var kindOf = { data: a, quantity: i.quantity }
                                                orderitems.push(kindOf)
                                                return (
                                                    <View key={a._id} style={{ flexDirection: "row", marginVertical: 15 }}>
                                                        <View style={{ flexDirection: "row", gap: 15, width: "70%" }}>
                                                            <Image source={{ uri: a.foodimage }} width={60} height={60} />
                                                            <View style={{ flexDirection: "column", gap: 10 }}>
                                                                <Text numberOfLines={1} style={{ fontSize: 16, color: "#0F172B" }}>{a.foodname}</Text>
                                                                <Text style={{ fontSize: 15 }}>{i.quantity} x {VND.format(a.foodprice)}</Text>
                                                            </View>
                                                        </View>
                                                        <Text style={{ fontSize: 15, fontWeight: "bold", width: "30%", textAlign: "right" }}>{VND.format(total)}</Text>
                                                    </View>
                                                )
                                            })
                                        )
                                    })}
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 0.2,
                                            left: 0,
                                            right: 5,
                                            paddingVertical: 3
                                        }}
                                    />
                                    <View style={{ paddingVertical: 15, flexDirection: "column", gap: 15 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total</Text>
                                            <Text style={{ fontSize: 16 }}>{VND.format(total2)}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Shipping fee</Text>
                                            <Text style={{ fontSize: 16 }}>{VND.format(shippingFee)}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Fulltotal</Text>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{VND.format(fulltotal)}</Text>
                                        </View>
                                    </View>
                                    {paymentMethodChoose ? (
                                        <>
                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => setPaymentMethodChoose(false)}>
                                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Payment method</Text>
                                                <Text style={{ fontSize: 15 }}>▲</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: "column", gap: 20, marginVertical: 10 }}>
                                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} onPress={() => setCard("Pay with card (ATM)")}>
                                                    {Card === "Pay with card (ATM)" ? (
                                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: "gray", alignItems: "center", backgroundColor: "#03ba5f" }}>
                                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>✓</Text>
                                                        </View>
                                                    ) : (
                                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: "gray" }} />
                                                    )}
                                                    <Text style={{ fontSize: 15 }}>Pay with card{" (ATM)"}</Text>
                                                </TouchableOpacity>
                                                {Card === "Pay with card (ATM)" ? (
                                                    <>
                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                            <TouchableOpacity style={style.shadow} onPress={() => { setVnpay(true); setPaypalState(false); setCheckCardChoose(false) }}>
                                                                <Image source={{ uri: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                                                                {vnpay ? (
                                                                    <Text style={{ color: "black", right: -10, bottom: -10, position: "absolute", fontSize: 18 }}>✅</Text>
                                                                ) : null}
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={style.shadow} onPress={() => { setPaypalState(true); setVnpay(false); setCheckCardChoose(false) }}>
                                                                <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                                                                {paypalState ? (
                                                                    <Text style={{ color: "black", right: -10, bottom: -10, position: "absolute", fontSize: 18 }}>✅</Text>
                                                                ) : null}
                                                            </TouchableOpacity>
                                                        </View>
                                                        {checkCardChoose ? (
                                                            <Text style={{ color: "red", textAlign: "center" }}>Choose atleast one payment gateway</Text>
                                                        ) : null}
                                                        {vnpay ? (
                                                            <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6 }}>
                                                                <Picker
                                                                    selectedValue={bankCode}
                                                                    onValueChange={(itemValue) =>
                                                                        setBankCode(itemValue)
                                                                    }>
                                                                    <Picker.Item label="Choose bank" value="" />
                                                                    <Picker.Item label="Ung dung MobileBanking" value="MBAPP" />
                                                                    <Picker.Item label="VNPAYQR" value="VNPAYQR" />
                                                                    <Picker.Item label="LOCAL BANK" value="VNBANK" />
                                                                    <Picker.Item label="INTERNET BANKING" value="IB" />
                                                                    <Picker.Item label="ATM CARD" value="ATM" />
                                                                    <Picker.Item label="INTERNATIONAL CARD" value="INTCARD" />
                                                                    <Picker.Item label="VISA" value="VISA" />
                                                                    <Picker.Item label="MASTERCARD" value="MASTERCARD" />
                                                                    <Picker.Item label="JCB" value="JCB" />
                                                                    <Picker.Item label="UPI" value="UPI" />
                                                                    <Picker.Item label="VIB" value="VIB" />
                                                                    <Picker.Item label="VIETCAPITALBANK" value="VIETCAPITALBANK" />
                                                                    <Picker.Item label="Ngan hang SCB" value="SCB" />
                                                                    <Picker.Item label="Ngan hang NCB" value="NCB" />
                                                                    <Picker.Item label="Ngan hang SacomBank" value="SACOMBANK" />
                                                                    <Picker.Item label="Ngan hang EximBank" value="EXIMBANK" />
                                                                    <Picker.Item label="Ngan hang MSBANK" value="MSBANK" />
                                                                    <Picker.Item label="Ngan hang NamABank" value="NAMABANK" />
                                                                    <Picker.Item label="Vi dien tu VnMart" value="VNMART" />
                                                                    <Picker.Item label="Ngan hang Vietinbank" value="VIETINBANK" />
                                                                    <Picker.Item label="Ngan hang VCB" value="VIETCOMBANK" />
                                                                    <Picker.Item label="Ngan hang HDBank" value="HDBANK" />
                                                                    <Picker.Item label="Ngan hang Dong A" value="DONGABANK" />
                                                                    <Picker.Item label="Ngan hang TPBank" value="TPBANK" />
                                                                    <Picker.Item label="Ngan hang OceanBank" value="OJB" />
                                                                    <Picker.Item label="Ngan hang BIDV" value="BIDV" />
                                                                    <Picker.Item label="Ngan hang Techcombank" value="TECHCOMBANK" />
                                                                    <Picker.Item label="Ngan hang VPBank" value="VPBANK" />
                                                                    <Picker.Item label="Ngan hang Agribank" value="AGRIBANK" />
                                                                    <Picker.Item label="Ngan hang MBBank" value="MBBANK" />
                                                                    <Picker.Item label="Ngan hang ACB" value="ACB" />
                                                                    <Picker.Item label="Ngan hang OCB" value="OCB" />
                                                                    <Picker.Item label="Ngan hang IVB" value="IVB" />
                                                                    <Picker.Item label="Ngan hang SHB" value="SHB" />
                                                                    <Picker.Item label="Apple Pay" value="APPLEPAY" />
                                                                </Picker>
                                                            </View>
                                                        ) : null}
                                                    </>
                                                ) : null}
                                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} onPress={() => { setCard("Cash on delivery (COD)"); setVnpay(false) }}>
                                                    {Card === "Cash on delivery (COD)" ? (
                                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: "gray", alignItems: "center", backgroundColor: "#03ba5f" }}>
                                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>✓</Text>
                                                        </View>
                                                    ) : (
                                                        <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: "gray" }} />
                                                    )}
                                                    <Text style={{ fontSize: 15 }}>Cash on delivery{" (COD)"}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => setPaymentMethodChoose(true)}>
                                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Payment method</Text>
                                                <Text style={{ fontSize: 15 }}>{Card} ▼</Text>
                                            </TouchableOpacity>
                                            {checkCardChoose ? (
                                                <Text style={{ color: "red" }}>Choose atleast one payment gateway</Text>
                                            ) : null}
                                        </>
                                    )}
                                    {checkP ? (
                                        <Text style={{ color: "red" }}>Payment method is needed!</Text>
                                    ) : null}
                                    <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FEA116", paddingVertical: 8, marginTop: 20, marginBottom: 5 }} onPress={() => SubmitOrder(fulltotal)}>
                                        {load ? (
                                            <ActivityIndicator size={21} color={"#fff"} />
                                        ) : (
                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Confirm</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                        <Footer />
                    </View>
                </ScrollView >
            )}
        </>
    )
}

const style = StyleSheet.create({
    shadow: {
        width: 110,
        height: 45,
        borderWidth: 1,
        padding: 8,
        backgroundColor: "#fff",
        borderColor: "transparent",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: "relative",
        elevation: 3.5,
    }
})

export default CheckoutPage