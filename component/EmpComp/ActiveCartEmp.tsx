import { ScrollView, View, Text, StyleSheet, RefreshControl, TouchableOpacity, Image } from "react-native"
import { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

function ActiveCartEmp({ index }: { index: any }) {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [candecode, setCandecode] = useState<any>()
    const [order, setOrder] = useState([])
    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 9

    const dataSynb = async () => {
        try {
            const token = await AsyncStorage.getItem("TOKEN")
            if (token) {
                setCandecode(jwtDecode(token))
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (index === 1 || isfocused) {
            currentPage.current = 1;
            dataSynb()
            getPagination()
        }
    }, [index, isfocused])

    function handlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetAllOrderActive",
            params: {
                page: currentPage.current,
                limit: limit
            }
        };
        axios(configuration)
            .then((result) => {
                setOrder(result.data.results.result);
                setPageCount(result.data.results.pageCount)
            })
            .catch((error) => {
                console.log(error);
            });
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
                <TouchableOpacity key={i} style={i + 1 === currentPage.current ? cateStyle.buttonPaginate : cateStyle.buttonPaginate2} onPress={() => handlePageClick(i)}>
                    <Text style={i + 1 === currentPage.current ? cateStyle.textButtonPaginate : cateStyle.textButtonPaginate2}>{i + 1}</Text>
                </TouchableOpacity>
            )
        })
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    function getTotal(i: any) {
        var fulltotal = 0
        var totalX = 0
        i.orderitems.map((a: any) => {
            var total = a.quantity * a.data.foodprice
            totalX += total
            fulltotal = totalX + i.shippingfee
            return null
        })
        return (
            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Fulltotal : {VND.format(fulltotal)}</Text></Text>
        )
    }

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getPagination()
            setFresh(false)
        }, 1000)
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                {order.length > 0 ? (
                    <>
                        {order.map((i: any) => {
                            return (
                                <Fragment key={i._id}>
                                    {i.employee?.map((a: any) => {
                                        if (candecode.userRole === 2 && a.id === candecode.userId && i.status === 2) {
                                            return (
                                                <TouchableOpacity key={a.id} style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailCartEmp", { i: i, candecode: candecode })}>
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                                            {i.user?.map((t: any) => {
                                                                return (
                                                                    <Text key={t.id} style={{ fontSize: 15 }}>{t.fullname}</Text>
                                                                )
                                                            })}
                                                        </View>
                                                        <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Approve</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                                        <Image source={{ uri: i.orderitems[0].data.foodimage }} height={70} width={70} />
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{i.orderitems[0].data.foodname}</Text>
                                                        <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {i.orderitems[0].quantity}</Text>
                                                        <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(i.orderitems[0].data.foodprice)}</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            borderBottomColor: 'gray',
                                                            borderBottomWidth: 0.5,
                                                            left: 5,
                                                            right: 5,
                                                            paddingVertical: 3
                                                        }}
                                                    />
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                                        <Text style={{ fontSize: 15 }}>{i.orderitems.length} items</Text>
                                                        {getTotal(i)}
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                        return null
                                    })}
                                    {candecode.userRole === 2 && i.status === 1 ? (
                                        <TouchableOpacity style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailCartEmp", { i: i, candecode: candecode })}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                                    {i.user?.map((w: any) => {
                                                        return (
                                                            <Text key={w.id} style={{ fontSize: 15 }}>{w.fullname}</Text>
                                                        )
                                                    })}
                                                </View>
                                                <Text style={{ fontSize: 15, color: "#fca103" }}>🕒 Pending</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", gap: 10, position: "relative", paddingTop: 4 }}>
                                                <Image source={{ uri: i.orderitems[0].data.foodimage }} height={70} width={70} />
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{i.orderitems[0].data.foodname}</Text>
                                                <Text style={{ fontSize: 15, bottom: "30%", position: "absolute", right: 10 }}>x {i.orderitems[0].quantity}</Text>
                                                <Text style={{ fontSize: 15, bottom: 0, position: "absolute", right: 10, color: "#FEA116" }}>{VND.format(i.orderitems[0].data.foodprice)}</Text>
                                            </View>
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 3
                                                }}
                                            />
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                                <Text style={{ fontSize: 15 }}>{i.orderitems.length} items</Text>
                                                {getTotal(i)}
                                            </View>
                                        </TouchableOpacity>
                                    ) : null}
                                </Fragment>
                            )
                        })}
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10 }}>
                            <TouchableOpacity style={currentPage.current === 1 ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pagePrev()}>
                                <Text style={currentPage.current === 1 ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"< Prev"}</Text>
                            </TouchableOpacity>
                            {pageButton(pageCount)}
                            <TouchableOpacity style={currentPage.current >= pageCount ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pageNext()}>
                                <Text style={currentPage.current >= pageCount ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"Next >"}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={{ fontSize: 18, textAlign: "center" }}>There's no order!</Text>
                )}
            </View>
        </ScrollView>
    )
}

const cateStyle = StyleSheet.create({
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
    cardStyle: {
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        gap: 10,
        padding: 10,
        shadowColor: "#000",
        marginVertical: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default ActiveCartEmp