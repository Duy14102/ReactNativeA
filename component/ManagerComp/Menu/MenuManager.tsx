import { ScrollView, View, Text, TouchableOpacity, RefreshControl, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

function MenuManager({ cate, index }: { cate: any, index: any }) {
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const [menu, setMenu] = useState([]);
    const [load, setLoad] = useState(false)
    const [refresh, setFresh] = useState(false);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getPagination()
            setFresh(false)
        }, 1000)
    }

    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 8

    useEffect(() => {
        if (isfocused) {
            currentPage.current = 1;
            getPagination()
        }
    }, [isfocused])

    /*      Pagination     */
    function handlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetAdminMenu",
            params: {
                cate: cate,
                page: currentPage.current,
                limit: limit
            }
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then((result) => {
                    setLoad(false)
                    setMenu(result.data.results.result);
                    setPageCount(result.data.results.pageCount)
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
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1, paddingVertical: 15 }}>
                {load ? (
                    <ActivityIndicator size={25} color={"#FEA116"} />
                ) : (
                    <>
                        {menu.map((i: any) => {
                            return (
                                <TouchableOpacity key={i._id} style={cateStyle.shadow} onPress={() => navigation.navigate("DetailMenuManager", { i: i })}>
                                    <Image source={{ uri: i.foodimage }} height={75} width={75} />
                                    <View style={{ flexDirection: "row", gap: 10 }}>
                                        <View style={{ flexDirection: "column", gap: 10 }}>
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: "#0F172B" }}>{i.foodname}</Text>
                                            <Text style={{ fontSize: 15 }}>{i.foodcategory}</Text>
                                            <Text style={{ fontSize: 16, color: "#FEA116", fontWeight: "bold" }}>{VND.format(i.foodprice)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ position: "absolute", bottom: 5, right: 10 }}>
                                        <Text style={{ fontSize: 15, color: "#FEA116" }}>{`${i.foodquantity} items left`}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                            <TouchableOpacity style={currentPage.current === 1 ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pagePrev()}>
                                <Text style={currentPage.current === 1 ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"< Prev"}</Text>
                            </TouchableOpacity>
                            {pageButton(pageCount)}
                            <TouchableOpacity style={currentPage.current >= pageCount ? cateStyle.prevNotActive : cateStyle.buttonPaginate3} onPress={() => pageNext()}>
                                <Text style={currentPage.current >= pageCount ? cateStyle.textPrevNotActive : cateStyle.textPrevActive}>{"Next >"}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
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
        position: "relative"
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

export default MenuManager