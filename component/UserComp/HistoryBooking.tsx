import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native"
import Header from "../Header"
import Footer from "../Footer"
import { useState, useEffect, useRef } from "react"
import Icon from "react-native-vector-icons/FontAwesome5"
import axios from "axios"

function HistoryBooking({ route, navigation }: { route: any, navigation: any }) {
    const { userid } = route.params
    const [BookingHistory, setBookingHistory] = useState([])
    const [refresh, setFresh] = useState(false);
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
        currentPage.current = 1
        getPagination()
    }, [route])

    function HandlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTokenBookingHistory",
            params: {
                page: currentPage.current,
                limit: limit,
                id: userid
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
                <TouchableOpacity key={i} style={i + 1 === currentPage.current ? cateStyle.buttonPaginate : cateStyle.buttonPaginate2} onPress={() => HandlePageClick(i)}>
                    <Text style={i + 1 === currentPage.current ? cateStyle.textButtonPaginate : cateStyle.textButtonPaginate2}>{i + 1}</Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, paddingVertical: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#0F172B" }}>History Booking</Text>
                    {BookingHistory.length > 0 ? (
                        <>
                            {BookingHistory.map((i: any) => {
                                const date = new Date(i.date).toLocaleDateString()
                                const time = new Date(i.date).toLocaleTimeString()
                                const datetime = date + " - " + time
                                return (
                                    <TouchableOpacity style={cateStyle.cardStyle} key={i._id} onPress={() => navigation.navigate("DetailBooking", { i: i })}>
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
                <Footer />
            </ScrollView>
        </SafeAreaView >
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
export default HistoryBooking