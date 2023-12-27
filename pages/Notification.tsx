import { SafeAreaView, StyleSheet, View, ScrollView, Text, ImageBackground, Dimensions, TouchableOpacity, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useEffect } from "react"
import axios from "axios"
import { useIsFocused } from "@react-navigation/native"
import RenderHtml from 'react-native-render-html';

function Notification({ navigation }: { navigation: any }) {
    const isfocused = useIsFocused()
    const [refresh, setFresh] = useState(false);
    const [news, setNews] = useState([])

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            called()
            setFresh(false)
        }, 1000)
    }

    const called = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetNewsActive"
        }
        axios(configuration)
            .then((res) => {
                setNews(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (isfocused) {
            called()
        }
    }, [isfocused])
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const keyword = "/"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={NotiStyle.bgimage} />
                    <View style={NotiStyle.overlay}>
                        <View style={{ top: 60, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={NotiStyle.notiText}>Notification</Text>
                            <View style={NotiStyle.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>Home</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{keyword}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Notification</Text>
                            </View>
                        </View>
                    </View >
                    <View style={NotiStyle.notifi}>
                        <Text style={NotiStyle.mainText}>Announcement</Text>
                        {news.length > 0 ? (
                            news.map((i: any, index: any) => {
                                return (
                                    <View key={i._id} style={{ flexDirection: "column", gap: 5, marginVertical: 15, flexWrap: "wrap" }}>
                                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{index} . {i.title}</Text>
                                        <RenderHtml source={{ html: i.message }} tagsStyles={tagsStyles} />
                                    </View>
                                )
                            })
                        ) : (
                            <Text>There's no notification yet !</Text>
                        )}
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView >
    )
}

const tagsStyles: any = {
    div: {
        fontSize: 15
    },
}

const NotiStyle = StyleSheet.create({
    notifi: {
        backgroundColor: "#fff",
        padding: 15,
        alignItems: "center"
    },

    mainText: {
        textAlign: "center",
        color: "#0F172B",
        fontSize: 18,
        fontWeight: "bold"
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
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
    }
})
export default Notification