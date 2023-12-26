import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, useRef, Fragment } from "react";
import { ScrollView, View, Text, RefreshControl, StyleSheet, TouchableOpacity } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "react-native-vector-icons/FontAwesome5"

function HistoryBookEmp({ index }: { index: any }) {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [candecode, setCandecode] = useState<any>()
    const [refresh, setFresh] = useState(false);
    const [BookingHistory, setBookingHistory] = useState([])
    const [pageCount, setPageCount] = useState(6);
    const currentPage = useRef<any>();
    const limit = 8
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

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
            url: "http://localhost:3000/GetBookingHistory",
            params: {
                page: currentPage.current,
                limit: limit
            }
        };
        axios(configuration)
            .then((result) => {
                setBookingHistory(result.data.results.result);
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
                {BookingHistory.length > 0 ? (
                    <>
                        {BookingHistory.map((i: any) => {
                            const date = new Date(i.date).toLocaleDateString()
                            const time = new Date(i.date).toLocaleTimeString()
                            const datetime = date + " - " + time
                            return (
                                <Fragment key={i._id} >
                                    {i.employee?.length > 0 ? (
                                        i.employee?.map((a: any) => {
                                            if (a.id === candecode.userId && candecode.userRole === 2) {
                                                return (
                                                    <TouchableOpacity key={a.id} style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailBookEmp", { i: i, candecode: candecode })}>
                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Id</Text> : {i._id}</Text>
                                                            <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                                                <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{ backgroundColor: "gray", padding: 0.2, marginVertical: 5 }} />
                                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                                                <Text style={{ fontSize: 15 }}>{i.customer?.fullname}</Text>
                                                            </View>
                                                            {i.status === 3 ? (
                                                                <Text style={{ fontSize: 15, color: "#03ba5f" }}>Completed</Text>
                                                            ) : i.status === 4 ? (
                                                                <Text style={{ fontSize: 15, color: "tomato" }}>Denied</Text>
                                                            ) : i.status === 5 ? (
                                                                <Text style={{ fontSize: 15, color: "orange" }}>Cancel</Text>
                                                            ) : null}
                                                        </View>
                                                        <Text style={{ fontSize: 15, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Date arrvived</Text> : {datetime}</Text>
                                                        {i.status === 4 ? (
                                                            <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Deny reason</Text> : {i.denyreason}</Text>
                                                        ) : i.status === 5 ? (
                                                            <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Cancel reason</Text> : {i.denyreason}</Text>
                                                        ) : null}
                                                        <View
                                                            style={{
                                                                borderBottomColor: 'gray',
                                                                borderBottomWidth: 0.5,
                                                                left: 5,
                                                                right: 5,
                                                                paddingVertical: 3
                                                            }}
                                                        />
                                                        <View style={{ marginVertical: 5 }}>
                                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                                                <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Table : </Text>{i.table}</Text>
                                                                <Text style={{ fontSize: 15 }}><Icon name="user" solid size={18} /> {i.people}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })
                                    ) : null}
                                    {candecode.userRole === 3 ? (
                                        <TouchableOpacity style={cateStyle.cardStyle} onPress={() => navigation.navigate("DetailBookEmp", { i: i, candecode: candecode })}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Id</Text> : {i._id}</Text>
                                                <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                                    <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ backgroundColor: "gray", padding: 0.2, marginVertical: 5 }} />
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 5 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer :</Text>
                                                    <Text style={{ fontSize: 15 }}>{i.customer?.fullname}</Text>
                                                </View>
                                                {i.status === 3 ? (
                                                    <Text style={{ fontSize: 15, color: "#03ba5f" }}>Completed</Text>
                                                ) : i.status === 4 ? (
                                                    <Text style={{ fontSize: 15, color: "tomato" }}>Denied</Text>
                                                ) : i.status === 5 ? (
                                                    <Text style={{ fontSize: 15, color: "orange" }}>Cancel</Text>
                                                ) : null}
                                            </View>
                                            <Text style={{ fontSize: 15, paddingVertical: 5 }}><Text style={{ fontWeight: "bold" }}>Date arrvived</Text> : {datetime}</Text>
                                            {i.status === 4 ? (
                                                <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Deny reason</Text> : {i.denyreason}</Text>
                                            ) : i.status === 5 ? (
                                                <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Cancel reason</Text> : {i.denyreason}</Text>
                                            ) : null}
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 3
                                                }}
                                            />
                                            <View style={{ marginVertical: 5 }}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                                    <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Table : </Text>{i.table}</Text>
                                                    <Text style={{ fontSize: 15 }}><Icon name="user" solid size={18} /> {i.people}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ) : null}
                                </Fragment>
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
                    <Text style={{ fontSize: 15, paddingVertical: 15, textAlign: "center" }}>There's no active booking!</Text>
                )}
            </View>
        </ScrollView >
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
export default HistoryBookEmp