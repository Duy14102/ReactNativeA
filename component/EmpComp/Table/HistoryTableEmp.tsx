import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect, useRef } from "react"
import { ScrollView, View, Text, RefreshControl, TouchableOpacity, StyleSheet } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard';


function HistoryTableEmp({ index }: { index: any }) {
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const [table, setTable] = useState([])
    const [refresh, setFresh] = useState(false);
    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 8
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (index === 1 || isfocused) {
            currentPage.current = 1;
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
            url: "http://192.168.1.216:3000/GetHistoryTable",
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

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                {table.length > 0 ? (
                    <>
                        {table.map((i: any) => {
                            const date = new Date(i.tabledate).toLocaleDateString()
                            const time = new Date(i.tabledate).toLocaleTimeString()
                            const datetime = date + " - " + time
                            return (
                                <TouchableOpacity key={i._id} style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailHistoryTable", { item: i })}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Id</Text> : {i._id}</Text>
                                        <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                            <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ backgroundColor: "gray", padding: 0.2, marginVertical: 5 }} />
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table :</Text>
                                        <Text style={{ fontSize: 15 }}>{i.tablename}</Text>
                                    </View>
                                    {i.customerid ? (
                                        <Text style={{ fontSize: 15, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Type</Text> : Account guests</Text>
                                    ) : (
                                        <Text style={{ fontSize: 15, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Type</Text> : Visiting guests</Text>
                                    )}
                                    <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Date arrvived</Text> : {datetime}</Text>
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
                ) : (
                    <Text style={{ fontSize: 18, paddingVertical: 15, textAlign: "center" }}>Table history is empty!</Text>
                )}
            </View>
        </ScrollView>
    )
}

const cateStyle = StyleSheet.create({
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
export default HistoryTableEmp