import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Dimensions, RefreshControl, ActivityIndicator, Image } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import axios from "axios"

function Search() {
    const navigation = useNavigation<any>()
    const [searchItem, setSearchItem] = useState(false)
    const [searchOrder, setSearchOrder] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [checkBlank, setCheckBlank] = useState(false)
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState("")
    const [order, setOrder] = useState("")
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setCheckBlank(false)
            setLoad(false)
            setSearch("")
            setOrder("")
            setSearchItem(false)
            setSearchOrder(false)
            setFresh(false)
        }, 1000)
    }

    const SearchType = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetSearch",
            params: {
                foodSearch: search
            }
        };
        if (search === "") {
            setCheckBlank(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.navigate("SearchMenu", { search: search })
                })
                .catch((error) => {
                    setLoad(false)
                    console.log(error);
                });
        }, 1000);
    }

    const searchorder = () => {
        const configuration = {
            method: 'get',
            url: 'http://localhost:3000/GetThisOrder',
            params: {
                id: order
            }
        }
        axios(configuration)
            .then((res) => {
                navigation.navigate("SearchOrder", { i: res.data.data[0] })
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={null} />
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <Image source={{ uri: "https://media.istockphoto.com/id/1193994845/vector/man-looking-on-golden-coins-lying-on-ground-through-magnifier-glass.jpg?s=612x612&w=0&k=20&c=rpKprqrVScJwHMDmdk3mah_U8m6ldQDpuHxwS4ORgvE=" }} height={150} resizeMode="contain" />
                    <Text style={{ textAlign: "center", fontSize: 18, paddingBottom: 15, fontWeight: "bold" }}>Pick your search type</Text>
                    <View style={{ marginBottom: 20 }}>
                        {searchItem ? (
                            <>
                                <TouchableOpacity style={searchStyle.shadow} onPress={() => setSearchItem(false)}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Search item</Text>
                                    <Text style={{ fontSize: 17 }}>▲</Text>
                                </TouchableOpacity>
                                <View style={searchStyle.notifi}>
                                    <View style={{ width: "100%" }}>
                                        <Text style={{ paddingLeft: 10, paddingBottom: 5, color: "#0F172B", fontSize: 15 }}>Item name : </Text>
                                        <View style={{ backgroundColor: "#E9E9E9", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <TextInput style={{ width: "90%", padding: 10 }} onChange={(e) => setSearch(e.nativeEvent.text)} />
                                            <TouchableOpacity style={{ width: "10%" }} onPress={() => SearchType()}>
                                                <Icon name="search" style={{ width: "100%", fontSize: 18 }} />
                                            </TouchableOpacity>
                                        </View>
                                        {load ? (
                                            <ActivityIndicator style={{ paddingTop: 5 }} color={"#FEA116"} size={21} />
                                        ) : null}
                                        {checkBlank ? (
                                            <Text style={{ color: "red", paddingTop: 3 }}>This field cant be blank!</Text>
                                        ) : null}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <TouchableOpacity style={searchStyle.shadow} onPress={() => setSearchItem(true)}>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Search item</Text>
                                <Text style={{ fontSize: 17 }}>▼</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        {searchOrder ? (
                            <>
                                <TouchableOpacity style={searchStyle.shadow} onPress={() => setSearchOrder(false)}>
                                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Search order</Text>
                                    <Text style={{ fontSize: 17 }}>▲</Text>
                                </TouchableOpacity>
                                <View style={searchStyle.notifi}>
                                    <View style={{ width: "100%" }}>
                                        <Text style={{ paddingLeft: 10, paddingBottom: 5, color: "#0F172B", fontSize: 15 }}>Order id : </Text>
                                        <View style={{ backgroundColor: "#E9E9E9", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <TextInput style={{ width: "90%", padding: 10 }} onChange={(e) => setOrder(e.nativeEvent.text)} />
                                            <TouchableOpacity style={{ width: "10%" }} onPress={() => searchorder()}>
                                                <Icon name="search" style={{ width: "100%", fontSize: 18 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <TouchableOpacity style={searchStyle.shadow} onPress={() => setSearchOrder(true)}>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Search order</Text>
                                <Text style={{ fontSize: 17 }}>▼</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const searchStyle = StyleSheet.create({
    buttonNo1: {
        backgroundColor: "#FEA116",
        borderRadius: 8,
        padding: 10
    },
    buttonNo1Text: {
        color: "#fff",
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#e3e3e3",
        borderRadius: 8,
        width: "100%"
    },
    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: "cover",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 43, .9)',
    },

    notiText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25
    },

    flexible: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15
    },

    notifi: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    mainText: {
        textAlign: "center",
        color: "#0F172B",
        fontSize: 18,
        fontWeight: "bold"
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        zIndex: 5
    }
})
export default Search