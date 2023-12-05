import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'

function Search() {
    const [itemState, setItemState] = useState(false)
    const [orderState, setOrderState] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#0F172B", fontWeight: "bold" }}>What do you want to search?</Text>
                    <View style={{ paddingVertical: 15, display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        <TouchableOpacity style={searchStyle.buttonNo1} onPress={() => { setItemState(true); setOrderState(false) }}>
                            <Text style={searchStyle.buttonNo1Text}>Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={searchStyle.buttonNo1} onPress={() => { setItemState(false); setOrderState(true) }}>
                            <Text style={searchStyle.buttonNo1Text}>Order</Text>
                        </TouchableOpacity>
                    </View>
                    {itemState ? (
                        <View style={{ width: "100%" }}>
                            <Text style={{ paddingLeft: 10, paddingBottom: 5, color: "#0F172B", fontSize: 15 }}>Item name : </Text>
                            <View style={{ backgroundColor: "#e3e3e3", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TextInput style={{ width: "90%" }} />
                                <TouchableOpacity style={{ width: "10%" }}>
                                    <Icon name="search" style={{ width: "100%", fontSize: 18 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                    {orderState ? (
                        <View style={{ width: "100%" }}>
                            <Text style={{ paddingLeft: 10, paddingBottom: 5, color: "#0F172B", fontSize: 15 }}>Order id : </Text>
                            <View style={{ backgroundColor: "#e3e3e3", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TextInput style={{ width: "90%" }} />
                                <TouchableOpacity style={{ width: "10%" }}>
                                    <Icon name="search" style={{ width: "100%", fontSize: 18 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const searchStyle = StyleSheet.create({
    buttonNo1: {
        backgroundColor: "#FEA116",
        borderRadius: 8,
        padding: 10
    },
    buttonNo1Text: {
        color: "#fff",
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#e3e3e3",
        borderRadius: 8,
        width: "100%"
    }
})
export default Search