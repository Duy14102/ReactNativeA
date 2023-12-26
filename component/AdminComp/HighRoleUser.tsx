import { ScrollView, View, Text, TouchableOpacity, RefreshControl, StyleSheet, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

function HighRoleUser({ index }: { index: any }) {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [data, setData] = useState([]);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 8

    useEffect(() => {
        if (index === 1 || isfocused) {
            currentPage.current = 1;
            getPagination()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, isfocused])

    function handlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetAllUser",
            params: {
                type: 2,
                pipe: 3,
                hype: 4,
                status: 1,
                page: currentPage.current,
                limit: limit
            }
        };
        axios(configuration)
            .then((result) => {
                setData(result.data.results.result);
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
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            {data.length > 0 ? (
                <View style={{ flex: 1, paddingVertical: 15 }}>
                    {data.map((i: any) => {
                        return (
                            <TouchableOpacity key={i._id} style={{ backgroundColor: "#fff", marginVertical: 15 }} onPress={() => navigation.navigate("DetailUser", { i: i })}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
                                    <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Id</Text> : {i._id}</Text>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Status</Text> : <Text style={{ color: "#fff" }}>🟢</Text></Text>
                                </View>
                                <View style={{ paddingHorizontal: 10, paddingVertical: 15, flexDirection: "row", gap: 10 }}>
                                    {i.userimage ? (
                                        <Image source={{ uri: i.userimage }} style={{ width: 65, height: 65, borderRadius: 50, resizeMode: "cover" }} />
                                    ) : (
                                        <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 65, height: 65, borderRadius: 50, resizeMode: "cover" }} />
                                    )}

                                    <View style={{ flexDirection: "column", gap: 13 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 40 }}>
                                            <View style={{ flexDirection: "column", gap: 3 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Email</Text>
                                                <Text style={{ fontSize: 15 }}>{i.email}</Text>
                                            </View>
                                            <View style={{ flexDirection: "column", gap: 3 }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone number</Text>
                                                <Text style={{ fontSize: 15 }}>{i.phonenumber}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "column", gap: 3 }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>
                                            <Text style={{ fontSize: 15 }}>{i.fullname}</Text>
                                        </View>
                                    </View>
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
                </View>
            ) : (
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>There's no banned account!</Text>
                </View>
            )}
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
})

export default HighRoleUser