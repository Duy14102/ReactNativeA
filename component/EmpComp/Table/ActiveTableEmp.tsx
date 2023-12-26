import axios from "axios";
import { useState, useEffect, useRef } from "react"
import { ScrollView, View, Text, RefreshControl, TouchableOpacity, StyleSheet, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useIsFocused, useNavigation } from "@react-navigation/native";

function ActiveTableEmp({ index, success }: { index: any, success: any }) {
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const [table, setTable] = useState([])
    const [candecode, setCandecode] = useState<any>()
    const [refresh, setFresh] = useState(false);
    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 9
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            datasynb()
            getPagination()
            setFresh(false)
        }, 1000)
    }

    const datasynb = async () => {
        try {
            const token = await AsyncStorage.getItem("TOKEN")
            if (token) {
                setCandecode(jwtDecode(token))
            } else {
                setCandecode(null)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isfocused || index === 0 || success) {
            currentPage.current = 1;
            datasynb()
            getPagination()
        }
    }, [isfocused, index, success])

    function handlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTableUse",
            params: {
                page: currentPage.current,
                limit: limit
            }
        };
        axios(configuration)
            .then((result) => {
                setTable(result.data.results.result);
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
            <View style={{ flex: 1 }}>
                {table.length > 0 ? (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", padding: 15 }}>
                            {table.map((i: any) => {
                                return (
                                    <TouchableOpacity key={i._id} style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailTableEmp", { i: i, candecode: candecode })}>
                                        {i.tablestatus === 1 ? (
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/638/638523.png" }} style={{ width: "100%", height: 70, resizeMode: "contain" }} />
                                        ) : (
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6937/6937721.png" }} style={{ width: "100%", height: 70, resizeMode: "contain" }} />
                                        )}
                                        <Text style={{ fontSize: 16 }}>{i.tablename}</Text>
                                        <View style={{ position: "absolute", top: 3, right: 5 }}>
                                            {i.tablestatus === 1 ? (
                                                <Text style={{ color: "black", fontSize: 18 }}>🔵</Text>
                                            ) : i.tablestatus === 2 ? (
                                                <Text style={{ color: "black", fontSize: 18 }}>🟢</Text>
                                            ) : i.tablestatus === 3 ? (
                                                <Text style={{ color: "black", fontSize: 18 }}>🟡</Text>
                                            ) : null}
                                        </View>
                                        {i.tablestatus === 1 ? (
                                            <Text style={{ fontSize: 16 }}>Status : <Text style={{ fontWeight: "bold" }}>Pending</Text></Text>
                                        ) : i.tablestatus === 2 ? (
                                            <Text style={{ fontSize: 16 }}>Status : <Text style={{ fontWeight: "bold" }}>Serving</Text></Text>
                                        ) : i.tablestatus === 3 ? (
                                            <Text style={{ fontSize: 16 }}>Status : <Text style={{ fontWeight: "bold" }}>Payment ready</Text></Text>
                                        ) : null}
                                    </TouchableOpacity>
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
                    </>
                ) : (
                    <Text style={{ fontSize: 18, paddingVertical: 15, textAlign: "center" }}>Active table is empty!</Text>
                )}
            </View>
        </ScrollView>
    )
}

const cateStyle = StyleSheet.create({
    cardStyle: {
        backgroundColor: "#FFFFFF",
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
        width: "47.5%",
        alignItems: "center",
        position: "relative",
        borderRadius: 6
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
export default ActiveTableEmp