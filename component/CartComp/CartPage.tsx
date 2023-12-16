import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Footer from "../Footer";

function CartPage({ jumpTo, setShippingFee, shippingFee, index }: { jumpTo: any, setShippingFee: any, shippingFee: any, index: any }) {
    const [Cart, setCart] = useState<any>([])
    const [checkVal, setCheckVal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [haveCoupon, setHaveCoupon] = useState(false)
    const [refresh, setFresh] = useState(false)
    const isFocused = useIsFocused();
    const navigation = useNavigation<any>()
    const [coupon, setCoupon] = useState("")
    var fulltotal = 0
    var total2 = 0

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            dataHandler()
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (isFocused || index === 0) {
            dataHandler()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused, index])

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
            setCart(overCount)
        } else {
            await AsyncStorage.removeItem("cart")
            setCheckVal(true)
        }
    }

    async function removeItem(e: any) {
        const called = await AsyncStorage.getItem("cart")
        if (called) {
            var stored = JSON.parse(called)
            for (var j = 0; j < stored.length; j++) {
                if (stored[j].name === e) {
                    stored.splice(j, 1);
                    await AsyncStorage.setItem("cart", JSON.stringify(stored))
                    dataHandler()
                }
            }
        }
    }

    async function minusInput(name: any) {
        const called = await AsyncStorage.getItem("cart")
        if (called) {
            var stored2 = JSON.parse(called)
            for (var k = 0; k < stored2.length; k++) {
                if (name === stored2[k].name) {
                    stored2[k].quantity = stored2[k].quantity - 1
                    if (stored2[k].quantity < 1) {
                        stored2[k].quantity = 1
                    }
                    await AsyncStorage.setItem("cart", JSON.stringify(stored2))
                    dataHandler()
                }
            }
        }
    }

    async function plusInput(name: any, realquan: any) {
        const called = await AsyncStorage.getItem("cart")
        if (called) {
            var stored2 = JSON.parse(called)
            for (var k = 0; k < stored2.length; k++) {
                if (name === stored2[k].name) {
                    stored2[k].quantity += 1
                    if (stored2[k].quantity > realquan) {
                        stored2[k].quantity = realquan
                    }
                    await AsyncStorage.setItem("cart", JSON.stringify(stored2))
                    dataHandler()
                }
            }
        }
    }

    function applyCoupon() {
        if (coupon === "duydeptrai") {
            setShippingFee(0)
            setCoupon("")
        }
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                {checkVal ? (
                    <View style={{ flexDirection: "column", alignItems: "center", gap: 10, padding: 15, height: 300 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>There's no items in cart</Text>
                        <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => navigation.navigate("Homes")}>
                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Return to homepage</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View style={{ backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart {`(${Cart.length})`}</Text>
                            {edit ? (
                                <TouchableOpacity onPress={() => setEdit(false)}>
                                    <Text style={{ fontSize: 16.5 }}>Done</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Text style={{ fontSize: 16.5 }}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {Cart.map((i: any) => {
                            return (
                                i.data.map((a: any) => {
                                    var total = a.foodprice * i.quantity
                                    total2 += total
                                    fulltotal = total2 + shippingFee
                                    return (
                                        <View key={a} style={{ backgroundColor: "#fff", flexDirection: "row", padding: 15, gap: 20, height: 160, marginVertical: 10, position: "relative" }}>
                                            <Image source={{ uri: a.foodimage }} height={75} width={75} />
                                            <View style={{ flexDirection: "row", gap: 10 }}>
                                                <View style={{ flexDirection: "column", gap: 10 }}>
                                                    <Text numberOfLines={1} style={{ fontSize: 16, color: "#0F172B" }}>{a.foodname}</Text>
                                                    <Text style={{ fontSize: 15 }}>{a.foodcategory}</Text>
                                                    <Text style={{ fontSize: 16, color: "#FEA116", fontWeight: "bold" }}>{VND.format(a.foodprice)}</Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 25 }}>
                                                        <View style={{ flexDirection: "row", alignItems: "center", height: 30 }}>
                                                            <TouchableOpacity style={{ borderWidth: 1, height: "100%", borderColor: "gray", paddingVertical: 5, width: 30, alignItems: "center" }} onPress={() => minusInput(a.foodname)}>
                                                                <Icon name="minus" size={16} style={{ marginHorizontal: 3 }} />
                                                            </TouchableOpacity>
                                                            <TextInput style={{ borderTopWidth: 1, borderColor: "gray", borderBottomWidth: 1, width: 50, textAlign: "center", padding: 0, height: "100%" }} defaultValue={i.quantity} />
                                                            <TouchableOpacity style={{ borderWidth: 1, height: "100%", borderColor: "gray", paddingVertical: 5, width: 30, alignItems: "center" }} onPress={() => plusInput(a.foodname, a.foodquantity)}>
                                                                <Icon name="plus" size={16} style={{ marginHorizontal: 3 }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <Text style={{ verticalAlign: "bottom", fontSize: 15, color: "#FEA116" }}>{a.foodquantity} items left</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {edit ? (
                                                <TouchableOpacity style={{ position: "absolute", right: 5, top: 5, alignItems: "center", paddingVertical: 7, paddingHorizontal: 12 }} onPress={() => removeItem(a.foodname)}>
                                                    <Icon name="trash" size={20} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    )
                                })
                            )
                        })}
                        <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "column", gap: 10 }}>
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
                            <TouchableOpacity style={{ alignItems: "center", paddingVertical: 10, backgroundColor: "#FEA116", marginTop: 10 }} onPress={() => jumpTo("second")}>
                                <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Checkout</Text>
                            </TouchableOpacity>
                            {haveCoupon ? (
                                <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setHaveCoupon(false)}>
                                    <Text style={{ fontSize: 15 }}>Don't have coupon!</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setHaveCoupon(true)}>
                                    <Text style={{ fontSize: 15 }}>You have coupon?</Text>
                                </TouchableOpacity>
                            )}
                            {haveCoupon ? (
                                <>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 0.5,
                                            left: 5,
                                            right: 5,
                                            paddingVertical: 5
                                        }}
                                    />
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Icon name="tags" size={16} />
                                        <Text style={{ fontSize: 16 }}>Coupon {"(optional)"}</Text>
                                    </View>
                                    <TextInput style={{ borderWidth: 1, borderColor: "#ddd", padding: 10 }} value={coupon} onChange={(e) => setCoupon(e.nativeEvent.text)} />
                                    <TouchableOpacity style={{ alignItems: "center", paddingVertical: 7, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#F0F0F0" }} onPress={() => applyCoupon()}>
                                        <Text style={{ fontSize: 15, color: "#666" }}>Submit coupon</Text>
                                    </TouchableOpacity>
                                </>
                            ) : null}
                        </View>
                    </>
                )}
            </View>
            <Footer />
        </ScrollView>
    )
}

export default CartPage