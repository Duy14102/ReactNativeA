import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

function TableItemIndex({ cate, itemss }: { cate: any, itemss: any }) {
    const [refresh, setFresh] = useState(false);
    const [add, setAdd] = useState(null)
    const [pageCount2, setPageCount2] = useState(6);
    const [QuantityAdd, setQuantityAdd] = useState<any>()
    const [checkQuan, setCheckQuan] = useState(false)
    const currentPage = useRef<any>();
    const [load, setLoad] = useState(false)
    const [menu, setMenu] = useState([])
    const limit = 8
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getAdminMenu()
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        currentPage.current = 1;
        getAdminMenu()
    }, [])

    function handlePageClick2(e: any) {
        currentPage.current = e + 1
        getAdminMenu();
    }

    function getAdminMenu() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetItemCanTable",
            params: {
                page: currentPage.current,
                limit: limit,
                cate: cate
            }
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then((result) => {
                    setLoad(false)
                    setMenu(result.data.results.result);
                    setPageCount2(result.data.results.pageCount)
                })
                .catch((error) => {
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
        getAdminMenu()
    }
    function pageNext() {
        if (currentPage.current >= pageCount2) {
            return false
        }
        currentPage.current = currentPage.current + 1
        getAdminMenu()
    }

    const pageButton = (count: any) => {
        return Array.from(Array(count), (e, i) => {
            return (
                <TouchableOpacity key={i} style={i + 1 === currentPage.current ? cateStyle.buttonPaginate : cateStyle.buttonPaginate2} onPress={() => handlePageClick2(i)}>
                    <Text style={i + 1 === currentPage.current ? cateStyle.textButtonPaginate : cateStyle.textButtonPaginate2}>{i + 1}</Text>
                </TouchableOpacity>
            )
        })
    }

    const takeitNow = (k: any) => {
        var count = parseInt(QuantityAdd)
        if (!count) {
            setCheckQuan(true)
            return false
        }
        const item = { item: k, quantity: count, status: 2 }
        var foodname = ""
        if (k) {
            foodname = k.foodname
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/AddItemToTable",
            data: {
                tableid: itemss._id,
                statusCheck: itemss.tablestatus,
                item: item,
                quantity: count,
                foodname: foodname
            }
        };
        axios(configuration)
            .then(() => {
                setAdd(k._id)
                setCheckQuan(false)
                setTimeout(() => {
                    setAdd(null)
                }, 1500);
            })
            .catch((err) => {
                setCheckQuan(false)
                console.log(err);
            });
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <View style={{ flex: 1, paddingVertical: 15 }}>
                    {load ? (
                        <ActivityIndicator size={25} color={"#FEA116"} />
                    ) : (
                        <>
                            {checkQuan ? (
                                <Text style={{ color: "red", textAlign: "center" }}>Quantity is needed</Text>
                            ) : null}
                            {menu.map((i: any) => {
                                return (
                                    <View key={i._id} style={cateStyle.shadow}>
                                        <Image source={{ uri: i.foodimage }} height={75} width={75} />
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <View style={{ flexDirection: "column", gap: 10 }}>
                                                <Text numberOfLines={1} style={{ fontSize: 16, color: "#0F172B" }}>{i.foodname}</Text>
                                                <Text style={{ fontSize: 15 }}>{i.foodcategory}</Text>
                                                <Text style={{ fontSize: 16, color: "#FEA116", fontWeight: "bold" }}>{VND.format(i.foodprice)}</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 25 }}>
                                                    <TextInput onChange={(e) => setQuantityAdd(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", width: 70, textAlign: "center", padding: 0, height: "100%" }} />
                                                    <Text style={{ verticalAlign: "bottom", fontSize: 15, color: "#FEA116" }}>{i.foodquantity} items left</Text>
                                                </View>
                                            </View>
                                        </View>
                                        {add === i._id ? (
                                            <TouchableOpacity style={{ position: "absolute", right: 5, top: 5, alignItems: "center", paddingVertical: 7, paddingHorizontal: 12 }} >
                                                <Icon name="check-circle" size={27} style={{ color: "#03ba5f" }} solid />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={{ position: "absolute", right: 5, top: 5, alignItems: "center", paddingVertical: 7, paddingHorizontal: 12 }} onPress={() => takeitNow(i)}>
                                                <Icon name="check-circle" size={27} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )
                            })}
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                                <TouchableOpacity style={currentPage.current === 1 ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pagePrev()}>
                                    <Text style={currentPage.current === 1 ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"< Prev"}</Text>
                                </TouchableOpacity>
                                {pageButton(pageCount2)}
                                <TouchableOpacity style={currentPage.current >= pageCount2 ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pageNext()}>
                                    <Text style={currentPage.current >= pageCount2 ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"Next >"}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const cateStyle = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 15,
        gap: 20,
        marginVertical: 10,
        position: "relative",
        height: 170
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
})
export default TableItemIndex