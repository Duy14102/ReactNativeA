import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"
import { TextInput } from "react-native"

function DetailPage({ route, navigation }: { route: any, navigation: any }) {
    const [detail, setDetail] = useState([])
    const [quantity, setQuantity] = useState("1")
    const { name, category } = route.params;

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.217:3000/GetDetailMenu",
            params: {
                foodid: name
            }
        }
        axios(configuration)
            .then((res) => {
                setDetail(res.data)
            })
    }, [])

    const plus = (e: any) => {
        var number = parseInt(quantity)
        number += 1
        if (number > e) {
            return false
        }
        const change = number.toString()
        setQuantity(change)
    }

    const minus = () => {
        var number = parseInt(quantity)
        number -= 1
        if (number < 1) {
            return false
        }
        const change = number.toString()
        setQuantity(change)
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ flex: 1, padding: 15 }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 17, color: "#0F172B" }} onPress={() => navigation.navigate('Category')}>{"< Back"}</Text>
                    </TouchableOpacity>
                    {Object.values(detail).map((i: any) => {
                        return (
                            <View key={i._id} style={{ paddingVertical: 15 }}>
                                <Image source={{ uri: i.foodimage }} style={{ width: "100%", height: 200 }} />
                                <View style={{ display: "flex", flexDirection: "column", gap: 10, paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 18, color: "#0F172B", fontWeight: "bold" }}>{i.foodname}</Text>
                                    <Text style={{ fontSize: 15, color: "#0F172B" }}>{i.foodcategory}</Text>
                                    <Text style={{ fontSize: 15, color: "#0F172B" }}>{VND.format(i.foodprice)}</Text>
                                    <Text style={{ fontSize: 15, color: "#0F172B" }}>Quantity : {i.foodquantity}</Text>
                                    <Text style={{ fontSize: 15, color: "#0F172B" }}>{i.review.length} review from customer</Text>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 50, gap: 5 }}>
                                        <TouchableOpacity style={detailStyle.buttonPlus} onPress={() => minus()}>
                                            <Icon name="minus" />
                                        </TouchableOpacity>
                                        <TextInput keyboardType="numeric" value={quantity} style={detailStyle.input}></TextInput>
                                        <TouchableOpacity style={detailStyle.buttonPlus} onPress={() => plus(i.foodquantity)}>
                                            <Icon name="plus" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const detailStyle = StyleSheet.create({
    buttonPlus: {
        backgroundColor: "lightgray",
        padding: 11
    },

    input: {
        borderWidth: 1,
        height: "70%",
        width: 50,
    }
})
export default DetailPage