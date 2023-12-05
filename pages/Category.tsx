import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState } from "react";

function Category() {
    const [category, setCategory] = useState("")
    const [filter, setFilter] = useState("")
    const image = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700311264/Menu/6558b0e0f09a9e28ebb5b475.jpg" }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 15 }}>
                    <Text style={{ paddingVertical: 15, color: "#0F172B", fontSize: 23, fontWeight: "bold", textAlign: "center" }}>Pick your favorites</Text>
                    <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ borderWidth: 1, borderColor: "gray", width: "45%" }}>
                            <RNPickerSelect
                                placeholder={{ label: category !== "" ? category : "Category", value: null }}
                                onValueChange={(e) => setCategory(e)}
                                items={[
                                    { label: "Meat", value: "Meat" },
                                    { label: "Vegetables", value: "Vegetables" },
                                    { label: "Drink", value: "Drink" }
                                ]}
                            />
                        </View>
                        <View style={{ borderWidth: 1, borderColor: "gray", width: "45%" }}>
                            <RNPickerSelect
                                placeholder={{ label: filter !== "" ? filter : "Filter", value: null }}
                                onValueChange={(e) => setFilter(e)}
                                items={[
                                    { label: "New to old", value: "nto" },
                                    { label: "Old to new", value: "otn" },
                                    { label: "High price first", value: "hpf" },
                                    { label: "Low price first", value: "lpf" },
                                    { label: "A to Z", value: "atz" }
                                ]}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,
                            left: 5,
                            right: 5,
                            paddingVertical: 10
                        }}
                    />
                    <View style={{ paddingVertical: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
                        <View style={cateStyle.card}>
                            <Image source={image} style={{ width: "100%", height: 120 }} />
                            <View style={{ alignItems: "center", paddingVertical: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                                <Text style={{ color: "#0F172B", fontSize: 15 }}>Meat</Text>
                                <Text style={{ fontWeight: "bold", color: "#0F172B", fontSize: 15 }}>Omelet</Text>
                                <Text style={{ color: "#0F172B", fontSize: 18 }}>10.000d</Text>
                            </View>
                            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FEA116", paddingVertical: 5 }}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={cateStyle.card}>
                            <Image source={image} style={{ width: "100%", height: 120 }} />
                            <View style={{ alignItems: "center", paddingVertical: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                                <Text style={{ color: "#0F172B", fontSize: 15 }}>Meat</Text>
                                <Text style={{ fontWeight: "bold", color: "#0F172B", fontSize: 15 }}>Omelet</Text>
                                <Text style={{ color: "#0F172B", fontSize: 18 }}>10.000d</Text>
                            </View>
                            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FEA116", paddingVertical: 5 }}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={cateStyle.card}>
                            <Image source={image} style={{ width: "100%", height: 120 }} />
                            <View style={{ alignItems: "center", paddingVertical: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                                <Text style={{ color: "#0F172B", fontSize: 15 }}>Meat</Text>
                                <Text style={{ fontWeight: "bold", color: "#0F172B", fontSize: 15 }}>Omelet</Text>
                                <Text style={{ color: "#0F172B", fontSize: 18 }}>10.000d</Text>
                            </View>
                            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FEA116", paddingVertical: 5 }}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const cateStyle = StyleSheet.create({
    card: {
        width: "47%",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#F9F9F9"
    },
})
export default Category