import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native"
import { Picker } from '@react-native-picker/picker';
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useRef, useEffect } from "react";
import axios from 'axios';

function Category({ navigation }: { navigation: any }) {
    const [category, setCategory] = useState([])
    const [cate, setCate] = useState("Meat")
    const [fil, setFil] = useState("nto")
    const [Count, setCount] = useState([]);
    const [load, setLoad] = useState(false)
    const [refresh, setFresh] = useState(false)
    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 8

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getPagination()
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        currentPage.current = 1;
        getPagination()
    }, [cate, fil])

    /*      Pagination     */
    function HandlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetCategoryMenu",
            params: {
                category: cate,
                page: currentPage.current,
                limit: limit,
                filter: fil
            }
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then((result: any) => {
                    setLoad(false)
                    setCategory(result.data.results.result);
                    setCount(result.data.results.total)
                    setPageCount(result.data.results.pageCount)
                })
                .catch((error: any) => {
                    setLoad(false)
                    console.log(error);
                });
        }, 1000);
    }

    function pagePrev() {
        if (currentPage.current <= 1) {
            return false
        }
        currentPage.current = currentPage.current - 1
        getPagination()
    }
    function pageNext() {
        if (currentPage.current >= pageCount) {
            return false
        }
        currentPage.current = currentPage.current + 1
        getPagination()
    }

    const pageButton = (count: any) => {
        return Array.from(Array(count), (e, i) => {
            return (
                <TouchableOpacity key={i} style={i + 1 === currentPage.current ? cateStyle.buttonPaginate : cateStyle.buttonPaginate2} onPress={() => HandlePageClick(i)}>
                    <Text style={i + 1 === currentPage.current ? cateStyle.textButtonPaginate : cateStyle.textButtonPaginate2}>{i + 1}</Text>
                </TouchableOpacity>
            )
        })
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={null} />
                <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 15 }}>
                    <Text style={{ paddingVertical: 15, color: "#0F172B", fontSize: 23, fontWeight: "bold", textAlign: "center" }}>Pick your favorites</Text>
                    <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <View style={{ borderWidth: 1, borderColor: "gray", width: "45%" }}>
                            <Picker

                                selectedValue={cate}
                                onValueChange={(itemValue) =>
                                    setCate(itemValue)
                                }>
                                <Picker.Item label="Meat" value="Meat" />
                                <Picker.Item label="Vegetables" value="Vegetables" />
                                <Picker.Item label="Drink" value="Drink" />
                            </Picker>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: "gray", width: "45%" }}>
                            <Picker
                                selectedValue={fil}
                                onValueChange={(itemValue) =>
                                    setFil(itemValue)
                                }>
                                <Picker.Item label="New to old" value="nto" />
                                <Picker.Item label="Old to new" value="otn" />
                                <Picker.Item label="High price first" value="hpf" />
                                <Picker.Item label="Low price first" value="lpf" />
                                <Picker.Item label="A to Z" value="atz" />
                            </Picker>
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
                    <Text style={{ textAlign: "center", paddingTop: 12, fontSize: 16, color: "#0F172B" }}>Display all {Count} results</Text>
                    {load ? (
                        <ActivityIndicator size="large" color={"#FEA116"} />
                    ) : null}
                    <View style={{ paddingVertical: 20, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
                        {category.map((i: any) => {
                            return (
                                <View key={i._id} style={cateStyle.card}>
                                    <TouchableOpacity onPress={() => navigation.navigate('DetailPage', { name: i.foodname, category: i.foodcategory })}>
                                        <Image source={{ uri: i.foodimage }} style={{ width: "100%", height: 120 }} />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: "center", paddingVertical: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                                        <TouchableOpacity>
                                            <Text style={{ color: "#0F172B", fontSize: 15 }}>{i.foodcategory}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('DetailPage', { name: i.foodname, category: i.foodcategory })}>
                                            <Text style={{ fontWeight: "bold", color: "#0F172B", fontSize: 15 }}>{i.foodname}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: "#0F172B", fontSize: 18 }}>{VND.format(i.foodprice)}</Text>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#FEA116", paddingVertical: 5 }}>
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Add to cart</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        <TouchableOpacity style={currentPage.current === 1 ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pagePrev()}>
                            <Text style={currentPage.current === 1 ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"< Prev"}</Text>
                        </TouchableOpacity>
                        {pageButton(pageCount)}
                        <TouchableOpacity style={currentPage.current >= pageCount ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pageNext()}>
                            <Text style={currentPage.current >= pageCount ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"Next >"}</Text>
                        </TouchableOpacity>
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
        backgroundColor: "#FFFFFF",
    },

    buttonPaginate: {
        backgroundColor: "#FEA116",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#FEA116"
    },

    prevNotActive: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "gray",
    },

    textPrevNotActive: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 15
    },

    textPrevActive: {
        color: "#FEA116",
        fontWeight: "bold",
        fontSize: 15
    },

    textButtonPaginate: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },

    buttonPaginate2: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "gray"
    },

    textButtonPaginate2: {
        color: "#0F172B",
        fontWeight: "bold",
        fontSize: 15
    },

    buttonPaginate3: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    makeBlur: {
        opacity: 0.5,
        backgroundColor: "black"
    }
})
export default Category