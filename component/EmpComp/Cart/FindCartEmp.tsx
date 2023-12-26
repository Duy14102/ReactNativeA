import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, StyleSheet } from "react-native";
import { useState, useEffect, Fragment, useRef } from "react";
import DrawerHeader from "../../AdminComp/DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

function FindCartEmp({ route }: { route: any }) {
    const { date } = route.params
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [pageCount, setPageCount] = useState(6);
    const [candecode, setCandecode] = useState<any>()
    const [order, setOrder] = useState([])
    const currentPage = useRef<any>();
    const limit = 8
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            dataSynb()
            findOrder()
            setFresh(false)
        }, 1000)
    }

    const dataSynb = async () => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            setCandecode(jwtDecode(token))
        }
    }

    useEffect(() => {
        currentPage.current = 1;
        dataSynb()
        findOrder()
    }, [])

    function handlePageClick(e: any) {
        currentPage.current = e + 1
        findOrder();
    }

    const findOrder = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/SearchAllOrder",
            params: {
                date: new Date(date),
                page: currentPage.current,
                limit: limit
            },
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
        findOrder()
    }
    function pageNext() {
        if (currentPage.current >= pageCount) {
            return false
        }
        currentPage.current = currentPage.current + 1
        findOrder()
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

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Find cart"} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    {order.length > 0 ? (
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Display all {order.length} results</Text>
                    ) : null}
                </View>
                <View style={{ flex: 1 }}>
                    {order.length > 0 ? (
                        <>
                            {order.map((i: any) => {
                                return (
                                    <Fragment key={i._id}>
                                        {i.employee?.map((a: any) => {
                                            if (candecode?.userRole === 2 && a.id === candecode?.userId) {
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
                                                            {i.status === 1 ? (
                                                                <Text style={{ fontSize: 15, color: "#fca103" }}>🕒 Pending</Text>
                                                            ) : i.status === 2 ? (
                                                                <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Approve</Text>
                                                            ) : i.status === 4 ? (
                                                                <Text style={{ fontSize: 15 }}>🕒 Pending cancel</Text>
                                                            ) : i.status === 3 ? (
                                                                <Text style={{ fontSize: 15, color: "tomato" }}>Denied</Text>
                                                            ) : i.status === 5 ? (
                                                                <Text style={{ fontSize: 15, color: "#03ba5f" }}>Succeeded</Text>
                                                            ) : i.status === 6 ? (
                                                                <Text style={{ fontSize: 15, color: "tomato" }}>Canceled</Text>
                                                            ) : null}
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
                                        {candecode?.userRole === 3 ? (
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
                                                    {i.status === 1 ? (
                                                        <Text style={{ fontSize: 15, color: "#fca103" }}>🕒 Pending</Text>
                                                    ) : i.status === 2 ? (
                                                        <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Approve</Text>
                                                    ) : i.status === 4 ? (
                                                        <Text style={{ fontSize: 15 }}>🕒 Pending cancel</Text>
                                                    ) : i.status === 3 ? (
                                                        <Text style={{ fontSize: 15, color: "tomato" }}>Denied</Text>
                                                    ) : i.status === 5 ? (
                                                        <Text style={{ fontSize: 15, color: "#03ba5f" }}>Succeeded</Text>
                                                    ) : i.status === 6 ? (
                                                        <Text style={{ fontSize: 15, color: "tomato" }}>Canceled</Text>
                                                    ) : null}
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
                        <Text style={{ fontSize: 18, textAlign: "center", padding: 15 }}>There's no cart exists!</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default FindCartEmp