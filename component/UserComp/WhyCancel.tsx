import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../Header"
import Footer from "../Footer"
import axios from "axios"
import { useState } from "react"

function WhyCancel({ route, navigation }: { route: any, navigation: any }) {
    const { id, userid } = route.params
    const [DenyReason, setDenyReason] = useState("")
    const [check, setCheck] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [load, setLoad] = useState(false)

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setDenyReason("")
            setCheck(false)
            setLoad(false)
            setFresh(false)
        }, 1000)
    }

    const denyOrder = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DenyOrder",
            params: {
                id: id,
                reason: DenyReason,
                status: 4
            }
        }
        if (DenyReason === "") {
            setCheck(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.navigate("ActiveCart", { userid: userid })
                }).catch((e) => {
                    setLoad(false)
                    console.log(e);
                })
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#0F172B" }}>Cancel Order</Text>
                    <Text style={{ paddingVertical: 10 }}>Please tell us why you cancel :</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "gray", padding: 10, height: 100, verticalAlign: "top" }} onChange={(e) => setDenyReason(e.nativeEvent.text)} />
                    {check ? (
                        <Text style={{ color: "red" }}>This field cant be blank!</Text>
                    ) : null}
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, justifyContent: "space-evenly" }}>
                        <TouchableOpacity style={{ width: 80, backgroundColor: "#FEA116", paddingVertical: 5, alignItems: "center", paddingHorizontal: 10 }} onPress={() => denyOrder()}>
                            {load ? (
                                <ActivityIndicator color={"#fff"} size={21} />
                            ) : (
                                <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 80, backgroundColor: "gray", paddingVertical: 5, alignItems: "center", paddingHorizontal: 10 }} onPress={() => navigation.goBack()}>
                            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}
export default WhyCancel