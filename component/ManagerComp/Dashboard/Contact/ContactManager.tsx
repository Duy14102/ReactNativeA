import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function ContactManager() {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const [GetContact, setGetContact] = useState([])
    const [pageCount, setPageCount] = useState(100);
    const currentPage = useRef<any>();
    const limit = 3

    useEffect(() => {
        if (isfocused) {
            currentPage.current = 1;
            getPagination()
        }
    }, [isfocused])

    function handlePageClick(e: any) {
        currentPage.current = e + 1
        getPagination();
    }

    function getPagination() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetContact",
            params: {
                page: currentPage.current,
                limit: limit
            }
        };
        axios(configuration)
            .then((result) => {
                setGetContact(result.data.results.result);
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
        <View style={{ flex: 1 }}>
            {GetContact.length > 0 ? (
                <>
                    {GetContact.map((i: any) => {
                        const date = new Date(i.createdAt).toLocaleDateString()
                        const time = new Date(i.createdAt).toLocaleTimeString()
                        const datetime = date + " - " + time
                        return (
                            <TouchableOpacity key={i._id} style={cateStyle.shadow} onPress={() => navigation.navigate("DetailContact", { i: i })}>
                                <View style={{ backgroundColor: "#fff", padding: 15 }}>
                                    <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>User</Text> : {i.email}</Text>
                                    <View style={{ padding: 0.2, backgroundColor: "gray", marginVertical: 10 }} />
                                    <View style={{ flexDirection: "column", gap: 10 }}>
                                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Title</Text> : {i.title}</Text>
                                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {datetime}</Text>
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
                <Text style={{ textAlign: "center", fontSize: 17 }}>There's no contact!</Text>
            )}
        </View>
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
        elevation: 5,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: "transparent"
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

export default ContactManager